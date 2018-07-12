var express = require('express');
var router = express.Router();
var UserController = require('../controller/UserController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addusers',UserController.register);

router.post('/addposition',UserController.addposition);
router.post('/login',UserController.login);
router.get('/check',UserController.checkSession);
router.get('/loginOut',UserController.loginOut);

module.exports = router;
