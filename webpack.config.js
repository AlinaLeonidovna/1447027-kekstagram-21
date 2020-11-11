const path = require(`path`);

module.exports = {
  entry: [
    `./js/utils.js`,
    `./js/debounce.js`,
    `./js/backend.js`,
    `./js/gallery.js`,
    `./js/editor.js`,
    `./js/validation.js`,
    `./js/form.js`,
    `./js/slider.js`,
    `./js/filters.js`,
    `./js/uploadFile.js`,
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
