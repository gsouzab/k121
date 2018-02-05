const express = require('express');
const mongoose = require('mongoose');
const Person = require('../models/person');
const _ = require('lodash');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_URL);

let router = express.Router();

/**
 * GET list all people
 */
router.get('/people', async (req, res, next) => {
  const people = await Person.find().sort({name: -1});
  res.send(people);
});

/**
 * POST a new person
 * @param person - 
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

router.delete('/people/:id', async (req, res, next) => {
  try {
    let deletedPerson = await Person.findByIdAndRemove(req.params.id);
    res.send(deletedPerson);
  } catch (error) {
    next(error)
  }
});

/**
 * POST a new person
 * @param person - 
 */
router.put('/people/:id', async (req, res, next) => {
  try {
    let updatedPerson = await Person.findOneAndUpdate(req.params.id, req.body, {new: true});
    res.send(updatedPerson)
  } catch (error) {
    next(error)
  }
});

/**
 * POST a new person
 * @param person - 
 */
router.get('/sort', async (req, res, next) => {
  const fromList = await Person.find().sort({name: -1});
  const toList = _.cloneDeep(fromList);
  let nPerson = fromList.length;
  
  _.shuffle(fromList);
  for (let i = 0; i < nPerson; i++) {
    _.shuffle(toList);
    let target = 0;
    if(toList.get(target).equals(fromList.get(i))){              
        target++;
    }           

    console.log(`${fromList.get(i)} => ${toList.get(i)}`);
    toList.splice(target,1);
    // toList.remove(receiver.get(target));
  }
  res.send("oi");
  next()
});

module.exports = router;
