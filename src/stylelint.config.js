module.exports = {
	extends: 'stylelint-config-standard',
	rules: {
		'indentation': 'tab',
		'string-quotes': 'single',
		'no-duplicate-selectors': true,
		'selector-no-qualifying-type': true,
		'selector-max-id': 0,
		'selector-max-universal': 0,
		'selector-attribute-quotes': 'always',
		'selector-no-vendor-prefix': true,
		'selector-pseudo-class-blacklist': [
			'not',
			'matches'
		],
		'selector-class-pattern': '^[a-z\\-]+$',
		'selector-max-compound-selectors': 7,
		'declaration-no-important': true,
		'declaration-block-no-redundant-longhand-properties': null,
		'property-no-vendor-prefix': null,
		'value-no-vendor-prefix': true,
		'value-keyword-case': 'lower',
		'function-url-quotes': 'never',
		'function-url-scheme-blacklist': [
			'ftp',
			'/^data/'
		],
		'font-family-name-quotes': 'always-where-recommended',
		'comment-whitespace-inside': 'always',
		'comment-empty-line-before': null,
		'at-rule-no-vendor-prefix': true,
		'media-feature-name-no-vendor-prefix': true,
		'no-missing-end-of-source-newline': null,
		'no-descending-specificity': true,
		'custom-property-empty-line-before': null,
		'max-nesting-depth': 2,
		'unit-blacklist': [
			'pt',
			'cm',
			'mm',
			'pc',
			'dpcm'
		]
	}
};