'use strict';

const controllers = require('./lib/controllers');

const plugin = module.exports;

plugin.init = async (params) => {
	const { router, middleware/* , controllers */ } = params;
	const routeHelpers = require.main.require('./src/routes/helpers');

	// routeHelpers.setupPageRoute(router, '/quickstart', middleware, [], (req, res) => {
	// 	res.sendStatus(200);
	// });
	routeHelpers.setupAdminPageRoute(router, '/admin/plugins/quickstart', middleware, [], controllers.renderAdminPage);
};

plugin.addRoutes = async ({ router, middleware, helpers }) => {
	const middlewares = [
		middleware.authenticateRequest,
		middleware.ensureLoggedIn,
	]
	router.get('/quickstart/:param1', middlewares, (req, res) => {
		helpers.formatApiResponse(200, res, {
			foobar: req.params.param1,
		});
	});
};

plugin.addAdminNavigation = (header) => {
	header.plugins.push({
		route: '/plugins/quickstart',
		icon: 'fa-tint',
		name: 'Quickstart',
	});

	return header;
};
