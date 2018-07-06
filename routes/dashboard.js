var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	if (!req.session.user) {
		res.render('error', {
			layout: false,
			message: '<i class="fa fa-times-circle"></i> Error 401',
			status: 'Unauthorized Access',
			stack: 'Access Denied'
		})
	}

	res.render('dashboard', {
		title_bar: 'CMS | Dashboard'
	});
});

module.exports = router;
