const express = require('express');
const Essay = require('../models/essay');
const router = express.Router();

router.get('/', function(req, res) {
  Essay.find({}).exec(function(err, lists) {
    if(err) throw err;
    lists.forEach(function(list) {
      list.content = list.content.slice(0,40);
      list.editURL = `<a href='/api/edit/${list._id}'>编辑</a>`;
      list.delURL = `<a href='/api/del/${list._id}'>删除</a>`;
    });
    res.render('admin', {
      lists: lists
    });
  }); 
});

router.get('/edit/:id', function(req, res) {
  
  let id = req.params.id;
  Essay.find({"_id" : id}).exec(function(err, essay) {
    if(err) throw err;
    essay[0].title = `value=${essay[0].title}`;
    essay[0].content = essay[0].content;
    res.render('edit', {
      title: essay[0].title,
      content : essay[0].content,
      id: id
    });
  });
});

router.post('/edit/:id', function(req, res) {
  let id = req.params.id;
  let essay = {};
  essay.title = req.body.title;
  essay.content = req.body.content;
  essay.update_time = new Date();
  console.log()
  Essay.findByIdAndUpdate(id, essay, function(err) {
    if(err) throw err;
    res.redirect('/api');
  });
});


router.get('/add', function(req, res) {
  res.render('add');
});

router.post('/add', function(req, res) {
  var title = req.body.title;
  var tags = req.body.tags;
  var content = req.body.content;
  var essay = new Essay();
  essay.title = title;
  essay.tags = tags.split(' ');
  essay.content = content;
  essay.create_time = new Date();
  essay.update_time = new Date();
  essay.save(function(err) {
    if(err) throw err;
    console.log('meow');
  });
  res.redirect('../home/essay'); 
});

router.get('/del/:id', function(req, res) {
  let id = req.params.id;
  Essay.remove({"_id": id}, function(err) {
    if(err) throw err;
    res.redirect('/api');
  })
})
module.exports = router;