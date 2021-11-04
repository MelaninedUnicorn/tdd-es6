import {
	getDatabaseData,
	resetDatabase,
	setDatabaseData,
} from "./test-helpers";

import { expect } from "chai";
import { getUserByUsername } from "./db";

describe("getUserByUsername ", () => {
	afterEach("reset the database ", async () => {
		await resetDatabase();
	});
	it("get the correct user from the database given a username", async () => {
		const fakeData = [
			{
				id: "123",
				username: "abc",
				email: "abc@gmail.com",
			},
			{
				id: "124",
				username: "wrong",
				email: "wrong@gmail.com",
			},
		];
		await setDatabaseData("users", fakeData);

		const actual = await getUserByUsername("abc");
		const finalDBState = await getDatabaseData("users");

		const expected = {
			id: "123",
			username: "abc",
			email: "abc@gmail.com",
		};

		expect(actual).excludingEvery("_id").to.deep.equal(expected);
		expect(finalDBState).excludingEvery("_id").to.deep.equal(fakeData);
	});

	it("returns null when the user is not found ", async () => {
		await setDatabaseData("users", [
			{ id: "999", username: "xyz", email: "nobody@gmail.com" },
		]);

		const actual = await getUserByUsername("def");
		expect(actual).to.be.null;
	});
});
