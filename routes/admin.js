const express = require('express');
const Essay = require('../models/essay');
const router = express.Router();

router.get('/', function(req, res) {
  Essay.find({}).sort({update_time: -1}).exec(function(err, lists) {
    if(err) throw err;
    lists.forEach(function(list) {
      list.content = list.content.slice(0,40);
      list.editURL = `<div class="ui primary button in edit" href='${list._id}'>编辑</div>`;
      list.delURL = `<div class="ui secondary button in del" href='/api/del/${list._id}'>删除</div>`;
    });
    res.render('admin', {
      lists: lists
    });
  }); 
});

router.get('/article/:id',(req, res) => {
  let id = req.params.id
  Essay.find({ "_id" : id}).exec((err, essay) => {
    if(err) throw err
    res.json({
      essay: essay[0]
    })
  })
})

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
  console.log(req.body)
  essay.title = req.body.title;
  essay.content = req.body.content;
  essay.update_time = new Date();
  console.log()
  Essay.findByIdAndUpdate(id, essay, function(err) {
    if(err) throw err;
    res.json({
      success: 1
    })
  })
})


router.get('/add', function(req, res) {
  res.render('add');
});

router.post('/add', function(req, res) {
  var title = req.body.title;
  var content = req.body.content;
  var essay = new Essay();
  essay.title = title;
  essay.content = content;
  essay.create_time = new Date();
  essay.update_time = new Date();
  essay.save(function(err,product) {
    if(err) throw err;
    res.json({
      id: product._id
    })
  });
  
});

router.get('/del/:id', function(req, res) {
  let id = req.params.id;
  Essay.remove({"_id": id}, function(err) {
    if(err) throw err;
    res.json({
      success: 1
    })
  })
})
module.exports = router;