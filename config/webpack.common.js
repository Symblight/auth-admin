const { resolve } = require('path');
const {
  HotModuleReplacementPlugin,
  HashedModuleIdsPlugin,
  IgnorePlugin,
  DefinePlugin,
} = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getClientEnvironment = require('./env');

const paths = require('./paths');

const DIST = resolve(__dirname, '..', 'dist');
const ENTRY_PATH = resolve(__dirname, '..', 'src/index.tsx');
const ENTRY_HTML_FILE = resolve(__dirname, '..', 'public/index.html');

const env = getClientEnvironment('');
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = {
  entry: ENTRY_PATH,
  output: {
    path: DIST,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      src: paths.src,
      components: paths.components,
      containers: paths.containers,
      features: paths.features,
      mocks: paths.mocks,
      libs: paths.libs,
      pages: paths.pages,
      stores: paths.stores,
    },
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          'css-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HashedModuleIdsPlugin({
      hashFunction: 'md4',
      hashDigest: 'base64',
      hashDigestLength: 4,
    }),
    new IgnorePlugin(/^\.\/locale$/, /moment$/),
    new DefinePlugin(env.stringified),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Административная панель',
      inject: 'body',
      template: ENTRY_HTML_FILE,
      favicon: resolve(__dirname, '..', 'public/favicon.ico'),
    }),
    new InterpolateHtmlPlugin(env.raw),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: shouldUseSourceMap,
      }),
    ],
  },
};
