var express = require('express');
var router = express.Router();
var connection = require('../common/mysqlconfig');

// Load ALL Customer Data
router.get('/customers', function (req, res) {
    if (!req.session.user) {
        res.render('error', {
            layout: false,
            message: '<i class="fa fa-times-circle"></i> Error 401',
            status: 'Unauthorized Access',
            stack: 'Access Denied'
        })
    }

    connection.query("SELECT * FROM customers", function (err, customerList) {
        res.render('customers', {
            title_bar: 'CMS | Data Maintenance',
            customerList: customerList
        });
    });
});

// Load Customer Details Via ID
router.post('/search_customer', function (req, res) {
    var customer_id = req.body.customer_id;

    connection.query("SELECT * FROM customers WHERE id = ?", [customer_id], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                customer: result
            })
        }
    });
});

// ADD or UPDATE Customer
router.post('/add_customer', function (req, res) {

    var customer_id = req.body.customer_id;

    var data = {
        name: req.body.customer_name,
        address: req.body.customer_address
    }

    if (customer_id == '') {
        connection.query("INSERT INTO customers SET ?", [data], function (err, result) {
            if (err) {
                console.log(err);
            } else {

                var log_data = {
                    email: req.session.user.email,
                    level: 'ADD',
                    message: 'Customer Added! Customer Name: ' + data.name
                }

                connection.query("INSERT INTO logs SET ?", [log_data], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({
                            status: 'customer_added'
                        });
                    }
                });
            }
        });
    } else {
        connection.query("UPDATE customers SET ? WHERE id = ?", [data, customer_id], function (err, result) {
            if (err) {
                console.log(err);
            } else {

                var log_data = {
                    email: req.session.user.email,
                    level: 'UPDATED',
                    message: 'Customer Updated! Customer Name: ' + data.name
                }

                connection.query("INSERT INTO logs SET ?", [log_data], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({
                            status: 'customer_updated'
                        });
                    }
                });

            }
        });
    }
});

// DELETE Customer
router.post('/delete_customer', function (req, res) {

    var customer_id = req.body.customer_id;

    connection.query("DELETE FROM customers WHERE id = ?", [customer_id], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                status: 'customer_deleted'
            })
        }
    });
});

// Load All AM Data
router.get('/account_managers', function (req, res) {

    if (!req.session.user) {
        res.render('error', {
            layout: false,
            message: '<i class="fa fa-times-circle"></i> Error 401',
            status: 'Unauthorized Access',
            stack: 'Access Denied'
        })
    }

    connection.query("SELECT am.id, am.first_name, am.last_name, am.email, bg.group_name \
    FROM account_managers as am \
    LEFT JOIN business_groups as bg ON am.business_group_id = bg.id", function (err, amList) {
            connection.query("SELECT * FROM business_groups", function (err, bgList) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('account_managers', {
                        title_bar: 'CMS | Data Maintenance',
                        amList: amList,
                        bgList: bgList
                    });
                }
            });
        });
});

// Load AM Details Via ID
router.post('/search_am', function (req, res) {
    var am_id = req.body.am_id;

    connection.query("SELECT * FROM account_managers WHERE id = ?", [am_id], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                am: result
            })
        }
    });
});

// ADD or UPDATE Account Manager
router.post('/add_am', function (req, res) {
    var am_id = req.body.am_id;

    var data = {
        business_group_id: req.body.business_group_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.am_email,
    }

    if (am_id == '') {
        connection.query("INSERT INTO account_managers SET ?", [data], function (err, result) {
            if (err) {
                console.log(err);
            } else {

                var log_data = {
                    email: req.session.user.email,
                    level: 'ADD',
                    message: 'AM Added! AM Name: ' + data.first_name + ' ' + data.last_name
                }

                connection.query("INSERT INTO logs SET ?", [log_data], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({
                            status: 'customer_added'
                        });
                    }
                });
            }
        });
    } else {
        connection.query("UPDATE account_managers SET ? WHERE id = ?", [data, am_id], function (err, result) {
            if (err) {
                console.log(err);
            } else {

                var log_data = {
                    email: req.session.user.email,
                    level: 'UPDATED',
                    message: 'AM Updated! AM Name: ' + data.first_name + ' ' + data.last_name
                }

                connection.query("INSERT INTO logs SET ?", [log_data], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({
                            status: 'customer_updated'
                        })
                    }
                });
            }
        });
    }
});

// DELETE AM
router.post('/delete_am', function (req, res) {
    var am_id = req.body.am_id;

    connection.query("DELETE FROM account_managers WHERE id = ?", [am_id], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                status: 'customer_deleted'
            })
        }
    });
});

module.exports = router;
