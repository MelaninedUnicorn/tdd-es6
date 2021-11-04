import { app } from "./server";
import db from "./db";
import { expect } from "chai";
import request from "supertest";
import sinon from "sinon";

describe("GET /users/:username", () => {
	it("sends the correct response when a user with the username is valid", async () => {
		const fakeData = {
			id: "123",
			username: "abc",
			email: "abc@gmail.com",
		};

		const stub = sinon.stub(db, "getUserByUsername").resolves(fakeData);

		// testing what our server (app) behaves when it receives a get request on the endpoint /users/abc
		await request(app)
			.get("/users/abc")
			.expect(200)
			.expect("Content-Type", /json/)
			.expect(fakeData);

		expect(stub.getCall(0).args[0]).to.equal("abc");

		stub.restore();
	});

	it("sends the correct response when there is an error ", async () => {
		const fakeError = { message: "Ya done goof sis! " };

		const stub = sinon.stub(db, "getUserByUsername").throws(fakeError);

		await request(app)
			.get("/users/abc")
			.expect(500)
			.expect("Content-Type", /json/)
			.expect(fakeError);

		stub.restore();
	});
	it("returns the appropriate response when the user is not found ", async () => {
		const stub = sinon.stub(db, "getUserByUsername").resolves(null);

		await request(app).get("/users/def").expect(404);

		stub.restore();
	});
});
