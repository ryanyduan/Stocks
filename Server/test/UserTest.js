const chai = require("chai");
const expect = require("chai").expect;
const chaiHTTP = require("chai-http");
const mongoose = require("mongoose");

const app = require("../index");
const User = require("../db/models/User");

chai.use(chaiHTTP);

const agent = chai.request.agent(app);

describe("testing the /register route", function() {
    this.timeout(0);
    User.collection.drop();

    it("should return 404 when missing fields", (done) => {
        agent
            .post("/users/register")
            .send({ email: "ryanyduan@gmail.com", username: "ryan" })
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it("should return 200 on good request", (done) => {
        agent
            .post("/users/register")
            .send({ email: "ryan@gmail.com", username: "ryan", password: "Hello123" })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe("testing the /login route", function() {
    this.timeout(0);

    it("should return 403 if user doesn't exist", (done) => {
        agent
            .post("/users/login")
            .send({ user: "ryan1", password: "Hello123" })
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body).to.haveOwnProperty("errorType");
                done();
            });
    });

    it("should return 403 if request has bad password", (done) => {
        agent
            .post("/users/login")
            .send({ user: "ryan", password: "Hello12" })
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body).to.haveOwnProperty("errorType");
                expect(res.body.errorType).to.equal("password");
                done();
            });
    });

    it("should return 200 if good request", (done) => {
        agent
            .post("/users/login")
            .send({ user: "ryan", password: "Hello123" })
            .end((err, res) => {
                token = res.body.token;
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe("testing the logout endpoint", function() {
    this.timeout(0);

    it("should return 401 if no token is provided", (done) => {
        agent.post("/users/logout").end((err, res) => {
            expect(res).to.have.status(401);
            done();
        });
    });
});
