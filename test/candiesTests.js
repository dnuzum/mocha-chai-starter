var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var request = require("supertest");
var app = require("../index");

describe("We're trying to GET /candies", function() {
	it("should return a 200 response", function(done) {
		request(app)
		.get("/candies")
		.expect(200, done);
	});
	it("should return a 404 when we GET /asldifjsdlfjs", function(done) {
		request(app)
		.get("/asdlkfjsdlfjhasldhjf")
		.expect(404, done);
	});
});

describe("We're testing the data at /candies", function() {
	before(function(done) {
		request(app)
		.post("/candies")
		.type("form")
		.send({
			id: 5,
			name: "Pocky",
			color: "Chocolate"
		})
		.end(function(error, response) {
			done();
		});
	});

	beforeEach(function(done) {
		console.log("called");
		done();
	});

	it("should return an array when we hit /candies", function(done) {
		request(app)
		.get("/candies")
		.end(function(error, response) {
			expect(response.body).to.be.an("array");
			expect(response.body[0].name).to.equal("Chewing Gum");
			done();
		});
	});

	it("should have a length of 5", function(done) {
		request(app)
		.get("/candies")
		.end(function(error, response) {
			expect(response.body.length).to.equal(5);
			done();
		});
	});
	after(function(done) {
		request(app)
		.delete("/candies/5")
		.end(function(error, response) {
			done();
		});
	});
});

describe("This should be at its base state", function() {
	it("s body should be length 4", function(done) {
		request(app)
		.get("/candies")
		.end(function(error, response) {
			expect(response.body.length).to.equal(4);
			done();
		})
	})
});