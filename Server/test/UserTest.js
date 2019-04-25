const chai = require("chai");
const expect = require("chai").expect;
const chaiHTTP = require("chai-http");
const mongoose = require("mongoose");

const app = require("../index");
const User = require("../db/models/User");

chai.use(chaiHTTP);

describe("testing the /register route", function() {
    const agent = chai.request.agent(app);
    this.timeout(0);
    User.collection.drop();

    // afterEach((done) => {
    //     User.collection.drop();
    //     done();
    // });

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
