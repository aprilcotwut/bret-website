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
	//	console.log('view init');

		var query = keystone.list('Project').paginate({
      page: req.query.page || 1,
      perPage: 10,
      maxPages: 10,
      filters: {
        state: 'published',
      },
    }).sort('-publishedDate');

    query.exec(function(err, results) {
      console.log('query exec');
      locals.data.projects = results;
      console.log('next');
      // next(err);
    });
    next();
  });

  // Render the view
  view.render('myresearch');
};
