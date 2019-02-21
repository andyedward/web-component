/* eslint-disable import/no-extraneous-dependencies */
const defaultSettings = require('@open-wc/testing-karma/default-settings.js');
const merge = require('webpack-merge');

module.exports = config => {
  config.set(

    merge(defaultSettings(config), {
      files: [
        // allows running single tests with the --grep flag
        { pattern: config.grep ? config.grep : 'test/*.test.js', watched: false, included: true, served: true }
      ],
      // your custom config
    }),
  );
  return config;
};
