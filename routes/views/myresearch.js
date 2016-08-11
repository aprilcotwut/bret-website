var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'myresearch';
	locals.filters = {
	};

	locals.data = {
		projects: [],
	};

	// Load the current post
	view.on('init', function (next) {
		console.log('view init');
		var Project = keystone.list('Project').model;

			console.log('view query');
		Project.find()
		    .where('state', 'published')
		    .sort('-publishedAt')
		    .exec(function(err, projects) {
					if(err) {
						console.log(err);
					}
					locals.data.projects = projects;
		    });
			});
				console.log('query done');
	// Render the view
	view.render('myresearch');
};
