var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'myresearch';

	locals.data = {
		projects: [],
	};

	// Load the current post
	view.on('init', function (next) {
		console.log('view init');
		var Project = keystone.list('Project').model;
    console.log(Project);

    console.log('view query');
    Project.find()
      .where('state', 'published')
      .sort('-publishedAt')
      .limit(5)
      .exec(function(err, results) {
        locals.data.projects = results;
     });
    console.log('query done');
  });

  // Render the view
  view.render('myresearch');
};
