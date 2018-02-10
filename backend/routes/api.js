const express = require('express');
const mongoose = require('mongoose');
const Person = require('../models/person');
const _ = require('lodash');
const nodemailer = require('nodemailer');
const ObjectID = require("mongodb").ObjectID;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL);

let router = express.Router();

/**
 * GET List all people
 */
router.get('/people', async (req, res, next) => {
  const people = await Person.find().sort({name: -1});
  res.send(people);
});

/**
 * POST Creates a new person
 * @param body - - the person params
 */
router.post('/people', async (req, res, next) => {  
  const newPerson = new Person(req.body)

  try {
    person = await newPerson.save(newPerson);
    res.send(person);
  } catch (error) {
    next(error);
  }
  
});

/**
 * DELETE Remove an existing person
 * @param id - the id of the updated person
 */
router.delete('/people/:id', async (req, res, next) => {
  try {
    let deletedPerson = await Person.findByIdAndRemove(req.params.id);
    res.send(deletedPerson);
  } catch (error) {
    next(error)
  }
});

/**
 * PUT Update an existing person
 * @param id - the id of the updated person
 * @param body - the person params to be updated
 */
router.put('/people/:id', async (req, res, next) => {
  try {
    let updatedPerson = await Person.findOneAndUpdate({_id: new ObjectID(req.params.id)}, _.omit(req.body, '_id'), {new: true});
    res.send(updatedPerson)
  } catch (error) {
    next(error)
  }
});

/**
 * Generates the friends list and call the email sender
 * returns error when less than 3 people
 */
router.get('/people/raffle', async (req, res, next) => {
  try {
    var peopleList = await Person.find().sort({name: -1});      
  } catch (error) {
    next(err);
  }

  if (peopleList.length < 3) {
    let err = new Error('NOT_ENOUGHT_PEOPLE');
    err.status = 400;
    err.message = {ERR_CODE: '001', Description: 'NEEDED AT LEAST 3 PEOPLE'};

    next(err);
    return;
  } 
  
  let pairsList = generateFriends(peopleList);

  let updateFriendPromises = _.map(pairsList, (person) => {
    return person.save();
  })

  try {
    await Promise.all(updateFriendPromises);
  } catch (error) {
    let err = new Error('SAVE_FRIEND_ERROR');
    err.status = 400;
    err.message = {ERR_CODE: '002', Description: 'ERROR ON SAVING FRIENDS'};

    next(err);
    return;
  }
  
  try {
    sendEmails(pairsList)
  } catch (error) {
    let err = new Error('EMAIL_ERROR');
    err.status = 500;
    err.message = {ERR_CODE: '003', Description: 'ERROR ON SENDING EMAILS'};

    next(err);
    return;
  }

  res.send({Description: "SUCCESS"});
});

/**
 * Generates a random friends list
 * @param {Person[]} peopleList 
 */
const generateFriends = (peopleList) => {
  const fromList = _.shuffle(peopleList);
  const toList = rotate(fromList, 1)
  
  for (let i = 0; i < fromList.length; i++) {
    fromList[i].friend = {
      name: toList[i].name,
      email: toList[i].email
    }
  }

  return fromList;
}

/**
 * Send email to the list of people
 * @param {Person[]} list 
 */
const sendEmails = async (list) => {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  promises = [];
  for (let i = 0; i < list.length; i++) {
    let sender = list[i];
    let receiver = list[i].friend;

    let mailOptions = {
      from: '"Gabriel" <foo@example.com>',
      to: sender.email,
      subject: 'Secret Santa',
      html: `Hello ${sender.name},<br/><br/> Your Secret Santa is: <b>${receiver.name}</b>.`
    };

    promises.push(transporter.sendMail(mailOptions));
  }

  return await Promise.all(promises);
};

const rotate = function (arr, n) {
  var L = arr.length;
  return arr.slice(L - n).concat(arr.slice(0, L - n));
};

module.exports = router;
