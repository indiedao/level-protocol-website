module.exports = {
  stories: [
    '../__stories__/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
}
