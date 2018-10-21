let path = require('path');

let deepmerge = require('deepmerge');

let stylelintMiddleware = require('./middlewares/middleware-stylelint');
let stylelintConfig = require('./stylelint.config.json');

module.exports = function (neutrino, settings = {}) {
	const NODE_MODULES = path.resolve(__dirname, 'node_modules');
	let { config } = neutrino;

	config
		.resolve.modules
			.add(NODE_MODULES)
			.end().end()
		.resolveLoader.modules
			.add(NODE_MODULES)
			.end().end();

	neutrino.use(stylelintMiddleware, {
		// configFile: options.configFile,
		// configOverrides
		// formatter - Options: "json"|"string"|"verbose", or a function. Default is "json".
		// configBasedir
		ignoreDisables: false,
		reportNeedlessDisables: false,
		cache: false,
		fix: false,
		config: deepmerge(stylelintConfig, settings)
	});

	// var len = config.toConfig().module.rules.length
	// console.log(config.toConfig().module.rules[len-2].use[0])
};