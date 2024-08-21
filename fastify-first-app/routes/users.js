"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/users", async function (request, reply) {
    return {
      users: [
        { name: "Alice", age: 30 },
        { name: "Bob", age: 46 },
      ],
    };
  });
};
