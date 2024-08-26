"use strict";

const { test } = require("node:test");
const assert = require("node:assert");
const { build } = require("../helper");

test.test("users route", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/users",
  });
  assert.deepStrictEqual(JSON.parse(res.payload), {
    users: [
      {
        name: "Alice",
        age: 30,
      },
      {
        name: "Bob",
        age: 46,
      },
    ],
  });
});
