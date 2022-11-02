const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      { test: /.html$/, use: ["html-loader"] },
      {
        test: /.s[ac]ss|css$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /.ttf$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "[name].[hash].[ext]",
              outputPath: "styles",
            },
          },
        ],
        type: "javascript/auto",
      },
      {
        test: /.svg|png|jpg|gif$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "[name].[hash].[ext]",
              outputPath: "imgs",
            },
          },
        ],
        type: "javascript/auto",
      },
      {
        test: /.pdf|md$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "[name].[hash].[ext]",
              outputPath: "files",
            },
          },
        ],
        type: "javascript/auto",
      },
    ],
  },
};
