const express = require("express");

const Posts = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.find()
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the posts",
        });
      });
  });

  router.post("/", (req, res) => {
    console.log(req.body)
    const { title, contents } = req.body;
    !title || !contents ? res.status(400).json({ message: "Title or contents missing"}) : 
    Posts.insert(req.body).then(() => {
      res.status(201).json(req.body);
    })
    .catch(() =>{
        res.status(500).json({message: "Server error, cannot post"})
    })
});



  module.exports = router;