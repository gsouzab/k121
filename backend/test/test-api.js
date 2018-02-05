const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

const Person = require('../models/person');
const baseURL = '/people';

chai.use(chaiHttp);

describe('Secret Santa API', () => {
  Person.collection.drop();
  let person;

  beforeEach(function(done){
    let newPerson = new Person({
      name: 'Gabriel',
      email: 'gabriel.souza1@gmail.com'
    });
    newPerson.save(function(err, res) {
      person = res;
      done();
    });
  });
  
  afterEach(function(done){
    Person.collection.drop();
    done();
  });

  it('GET /people should list people', function(done) {
    chai.request(server)
      .get(baseURL)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
  });

  it('POST /people should create a new person', function(done) {
    chai.request(server)
      .post(baseURL)
      .type('form')
      .send({
        'name': 'Foo',
        'email': 'foo@gmail.com'
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.name.should.equal('Foo');
        res.body.should.have.property('email');
        res.body.email.should.equal('foo@gmail.com');
        done();
      });
  });

  it('PUT /people/:id should update an existing person', function(done) {
    chai.request(server)
      .put(`${baseURL}/${person._id}`)
      .type('form')
      .send({
        'name': 'Gabriel EDITADO',
        'email': 'gabriel2@gmail.com'
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.name.should.equal('Gabriel EDITADO');
        res.body.should.have.property('email');
        res.body.email.should.equal('gabriel2@gmail.com');
        done();
      });
  });

  it('DELETE /people/:id should delete an existing person', function(done) {
    chai.request(server)
      .delete(`${baseURL}/${person._id}`)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body._id.should.equal(person._id.toString());
        done();
      });
  });
});