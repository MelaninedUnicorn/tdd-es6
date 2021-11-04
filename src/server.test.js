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
        stub.restore();
	});
});
