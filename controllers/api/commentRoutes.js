const router = require('express').Router();
const { Comment } = require('../../models');
//const withAuth = require('../../utils/auth');

// Add a new user to database

router.post('/', async (req, res) => {
  console.log("req.body create comment")
  console.log(req.body)
  try {
    const commentData = await Comment.create(req.body);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;