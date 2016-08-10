var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'group';
	locals.data = {
		groupMembers: [],
	};

	// Load the posts
	view.on('init', function (next) {
		var q = keystone.list('GroupMember').model.find().sort('-active');

		q.exec(function (err, results) {
			locals.data.groupMembers = results;
			next(err);
		});
	});

	// Render the view
	view.render('group');
};
