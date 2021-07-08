const router = require('express').Router();
const { Article } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newArticle = await Article.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newArticle);
  } catch (err) {
    res.status(400).json(err);
  }
});

// When user clicks Update Article call this to give 
// https://sequelizedocs.fullstackacademy.com/inserting-updating-destroying/
// Updates all instances that match a query. 
// Takes two parameters: 
// the first parameter contains the info you want to update. 
// The second parameter contains the query for which instances to update.
router.put('/', withAuth, async (req, res) => {
  try {
    const updatedArticle = await Article.update({
      ...req.body
    }, {
      where: {id: req.body.id},
    });

    res.status(200).json(updatedArticle);
  } catch (err) {
    console.log("articleRoutes.js .put('/' err\n", err)
    res.status(400).json(err);
  }

});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const articleData = await Article.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!articleData) {
      res.status(404).json({ message: 'No article found with this id!' });
      return;
    }

    res.status(200).json(articleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
