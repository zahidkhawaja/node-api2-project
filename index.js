const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h2>Testing API</h>
    <p>This is a test.</p>
  `);
});

server.listen(4000, () => {
  console.log("\n Server Running on http://localhost:4000 \n");
});
