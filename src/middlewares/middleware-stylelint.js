let path = require('path');

let deepmerge = require('deepmerge');
let stylelint = require('stylelint');
let postcssReporter = require('postcss-reporter');

let postCssPreloaderMiddleware = require('./middleware-postcss-preloader');

module.exports = function (neutrino, settings = {}) {
	// let prodRun = (process.env.NODE_ENV === 'production');

	neutrino.use(postCssPreloaderMiddleware, {
		include: settings.include,
		exclude: settings.exclude,
		sourceMap: true, /* 'inline' */
		plugins: [
			// require("postcss-import")({
			// 	plugins: [
			// 	require("stylelint")({ /* your options */ })
			// 	]
			// }),
			stylelint(settings),
			postcssReporter({
				plugins: ['stylelint'],
				noPlugin: false,

				// throwError : Boolean(prodRun),
				// clearReportedMessages: true,
				clearAllMessages: true
			})
		]
	});

	neutrino.register('stylelintrc', function () {
		return settings.config;
	});
	neutrino.register('stylelint', function () {
		let { fix = false } = neutrino.options.args;
		let defaultPattern = path.join(
			path.basename(neutrino.options.source),
			'**/*.css'
		);
		let includePattern = (settings.include || [])
			.map(function (include) {
				return path.join(
					path.basename(neutrino.options.source),
					path.basename(include),
					'**/*'
				);
			});
		let excludePattern = (settings.exclude || [])
			.map(function (exclude) {
				return path.join(
					path.basename(neutrino.options.source),
					path.basename(exclude),
					'**/*'
				);
			});
		let stylelintSettings = deepmerge(settings, {
			files: includePattern.length ? includePattern : defaultPattern,
			ignoreFiles: excludePattern,
			disableDefaultIgnores: true,
			formatter: 'verbose',
			fix
		});

		return stylelint.lint(stylelintSettings)
			.then(function ({ errored, output }) {
				if (errored) {
					throw output;
				}
				else {
					return output;
				}
			});
	});
};