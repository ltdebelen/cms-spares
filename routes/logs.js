var express = require('express');
var router = express.Router();
var connection = require('../common/mysqlconfig');

router.get('/logs', function (req, res) {
	if (!req.session.user) {
		res.render('error', {
			layout: false,
			message: '<i class="fa fa-times-circle"></i> Error 401',
			status: 'Unauthorized Access',
			stack: 'Access Denied'
		})
	}

	connection.query("SELECT *, date_format(date_time, '%M %d, %Y %h:%i:%s %p') as str_date_time  FROM logs ORDER BY date_time DESC", function (err, logList) {
		if (err) {
			console.log(err);
		} else {
			res.render('logs', {
				title_bar: 'CMS | Logs',
				logList: logList
			});
		}
	});
});

module.exports = router;
