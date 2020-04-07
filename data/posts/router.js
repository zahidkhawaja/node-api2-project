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

  router.get("/:id/comments", (req, res) => {
    const { id } = req.params;
    Posts.findPostComments(id)
    .then(value => {
      value ? res.status(200).json(value) : res.status(404).json({ message: "Cannot find post ID"})})
      .catch(err => {
        res.status(500).json({ message: "Cannot find comments"})
      })
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

  router.post("/:id/comments", (req, res) => {
    const { text } = req.body;
    const postID = req.params.id;

    !text ? res.status(400).json({ errorMessage: "No text given"}) : Posts.findById(postID)
    .then(post => {
      !post ? res.status(404).json({ error: "No post found"}): Posts.insertComment({ text: text, postId: postId})
    })
    .then(({ id }) => {
      Posts.findCommentById(id).then(comment => {
        res.status(201).json(comment)
      })
      .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "There was an error saving this comment"})
      })
    })
  });

  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const { title, contents } = req.body;

    !title || !contents ? res.status(400).json({ errorMessage: "No title/content provided"}) : posts.update(changes, id)
    .then(updated => {
      updated ? res.status(200).json({ message: "Successfully updated"}) : res.status(404).json({ message: "No ID found"})
      .catch(err => {
        res.status(500).json({ error: "Post information not updated"})
      })
    })
  })
  
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    Posts.remove(id)
    .then(deleted => {
      deleted ? res.status(200).json({message: "Post deleted", deleted}) : res.status(404).json({message:`Post ID not found`})
    .catch(err => {
        res.status(500).json({ message: "Error deleting"}, err)
    })
})
  });
    
  
  module.exports = router;