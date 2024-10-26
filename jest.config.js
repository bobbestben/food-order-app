module.exports = {
  transform: {
    '\\.js$': ['babel-jest', { configFile: './babel.config.testing.js' }]
  },
  // other Jest config options  
  reporters: ['default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Test Report'
      }
    ]],
};
