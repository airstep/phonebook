//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Contact = require('../app/models/contact');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

// our parent block
describe('Contacts', () => {
	beforeEach((done) => {
		// before each test we empty the database
		Contact.remove({}, (err) => {
		   done();
		});
	});
 /*
  * Test the /GET route
  */
  describe('/GET contact', () => {
	  it('it should GET all the contacts', (done) => {
			chai.request(server)
		    .get('/contact')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });
 /*
  * Test the /POST route
  */
  describe('/POST contact', () => {
	  it('it should not POST a contact without phone field', (done) => {
	  	let contact = {
	  		name: "Test",
	  		address: "Test",
	  		picture: "Test"
	  	}
			chai.request(server)
		    .post('/contact')
		    .send(contact)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('errors');
			  	res.body.errors.should.have.property('phone');
		      done();
		    });
	  });
	  it('it should POST a contact ', (done) => {
	  	let contact = {
	  		name: "Test",
	  		address: "Test",
				picture: "Test",
				phone: "+555555"
	  	}
			chai.request(server)
		    .post('/contact')
		    .send(contact)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('Contact successfully added!');
			  	res.body.contact.should.have.property('name');
			  	res.body.contact.should.have.property('address');
			  	res.body.contact.should.have.property('picture');
			  	res.body.contact.should.have.property('phone');
		      done();
		    });
	  });
	  it('it should search a contact ', (done) => {
	  	let contact = new Contact({
	  		name: "Test",
	  		address: "Test",
				picture: "Test",
				phone: "+555555"
			})
	  	contact.save((err, contact) => {
			chai.request(server)
		    .get('/contact/search?q=T')
		    .end((err, res) => {
			  	res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
		      done();
		    });
        });
      });
  });
 /*
  * Test the /GET/:id route
  */
  describe('/GET/:id contact', () => {
	  it('it should GET a contact by the given id', (done) => {
	  	let contact = new Contact({
	  		name: "Test",
	  		address: "Test",
				picture: "Test",
				phone: "+555555"
 		  });
	  	contact.save((err, contact) => {
	  		chai.request(server)
		    .get('/contact/' + contact.id)
		    .send(contact)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('name');
			  	res.body.should.have.property('address');
			  	res.body.should.have.property('picture');
			  	res.body.should.have.property('phone');
			  	res.body.should.have.property('_id').eql(contact.id);
		      done();
		    });
	  	});

	  });
  });
 /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id contact', () => {
	  it('it should UPDATE a contact given the id', (done) => {
	  	let contact = new Contact({
	  		name: "Test",
	  		address: "Test",
				picture: "Test",
				phone: "+555555"
			})
	  	contact.save((err, contact) => {
				chai.request(server)
			    .put('/contact/' + contact.id)
			    .send({
						name: "Test",
						address: "Test",
						picture: "Test",
						phone: "+7777777"
					})
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Contact updated!');
				  	res.body.contact.should.have.property('phone').eql('+7777777');
			      done();
			    });
		  });
	  });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id contact', () => {
	  it('it should DELETE a contact given the id', (done) => {
	  	let contact = new Contact({
	  		name: "Test",
	  		address: "Test",
				picture: "Test",
				phone: "+555555"
			})
	  	contact.save((err, contact) => {
				chai.request(server)
			    .delete('/contact/' + contact.id)
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Contact successfully deleted!');
				  	res.body.result.should.have.property('ok').eql(1);
				  	res.body.result.should.have.property('n').eql(1);
			      done();
			    });
		  });
	  });
  });
});
