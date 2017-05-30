const express = require('express');
const marked = require('marked');
const Essay = require('../models/essay');

const router = express.Router();

/* GET users listing. */
router.get('/essay', function(req, res) {
  Essay.find({}).exec(function(err, essays) {
    if(err) throw err;
    essays.forEach(function(essay) {
      essay.content = marked(essay.content);
      if(essay.content.length > 250) {
      essay.content = essay.content.slice(0,140) 
      + `<br/><a href="http://localhost:3000/home/essay/${essay._id}">......查看全文</a>`;
      };
      essay.address = `<a href="http://localhost:3000/home/essay/${essay._id}">`;
    });

    res.render('homepage', {
      essays: essays
    });
  });
  
});

router.get('/essay/:id', function(req, res) {
  id = req.params.id;
  Essay.find({"_id" : id}).exec(function(err, essays) {
    if(err) throw err;
    essays.forEach(function(essay) {
      essay.content = marked(essay.content);
    });
  res.render('homepage', {
    essays: essays
  });
  });
});
module.exports = router;
