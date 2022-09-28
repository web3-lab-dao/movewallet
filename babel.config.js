module.exports = {
  'plugins': [
    ['styled-jsx/babel', { 'optimizeForSpeed': true }],
  ],
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['chrome >= 90', 'firefox >= 89'],
        },
      },
    ],
    // Because babel is used by Webpack to load the Webpack config, which is
    // TS.
    '@babel/typescript',
  ],
  babelrcRoots: [
    '.',
    'packages/ui/*',
    'packages/background/*',
  ],
};
