const path = require('path')
module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
	addons: [
		{
			name: '@storybook/addon-storysource',
			options: {
			  rule: {
					test: [/\.js?$/],
					include: [path.resolve(__dirname, '../stories')],
			  },
			  loaderOptions: {
					prettierConfig: {
							printWidth: 80,
							singleQuote: false },
			  },
			},
		},
		// '@storybook/addon-actions/register',
		// '@storybook/addon-notes/register',
		// '@storybook/addon-backgrounds',
		{
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
           modules: true,
        }
      }
    },
	],
};