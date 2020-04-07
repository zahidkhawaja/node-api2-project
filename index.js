const express = require("express");

const postsRouter = require("./data/posts/router");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter); 

server.get("/", (req, res) => {
  res.send(`
    <h2>Testing API</h>
    <p>This is a test.</p>
  `);
});

server.listen(4000, () => {
  console.log("\n Server Running on http://localhost:4000 \n");
});
