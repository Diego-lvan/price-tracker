const supertest = require("supertest");
const app = require("../src/app");

const request = supertest(app);

describe("GET test", () => {
  test("should respond with 404 status code", async () => {
    const res = await request.get("/").send();
    expect(res.status).toBe(404);
  });
});
