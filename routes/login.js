var express = require('express');
var router = express.Router();
var connection = require('../common/mysqlconfig');

router.get('/login', function (req, res) {
    res.render('login', {
        layout: false
    });
});

router.post('/login', function (req, res) {

    var data = {
        email: req.body.email,
        password: req.body.password
    }

    connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [data.email, data.password], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result[0] != null) {
                req.session.user = result[0];
                res.redirect('/');
            } else {
                res.render('login', {
                    layout: false,
                    message: 'Invalid Credentials'
                })
            }
        }
    });
});

router.get('/logout', function(req, res){
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
