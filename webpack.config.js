const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const DEVELOPMENT = process.env.NODE_ENV == 'development';
const PRODUCTION = process.env.NODE_ENV == 'production';

const entry = PRODUCTION 
?   ['./src/js/main.js']
:   ['./src/js/main.js',
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080'
    ];

const plugins = PRODUCTION 
?   [
      new UglifyJsPlugin({
            extractComments: true,
            cache: true,
            parallel: true,
            uglifyOptions: {
              compress: {
                keep_fnames: true,
                warnings: true,
              },
              ecma: 6,
              mangle: false,
              output: {
                comments: 'all'
              }
            },
            sourceMap: true,
          }),
        new ExtractTextPlugin('css/style-[md5:contenthash:10].css'),
        new HTMLWebpackPlugin({
          template: 'index-template.html',
        })
    ] 
:  [new webpack.HotModuleReplacementPlugin()];

const mode = PRODUCTION 
?   'production'
:   'development';

const output = PRODUCTION 
?   './'
:   '/dist/';

const cssIndentifier = PRODUCTION 
?   '[hash:base64:10]'
:   '[path][name]__[local]';

const cssLoader = PRODUCTION 
?   ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader?modules=true&localIdentName=' + cssIndentifier, {
        loader: "postcss-loader",
        options: {
          ident: 'postcss',
          plugins: [
            require('autoprefixer')({
              'browsers': ['> 1%', 'last 2 versions']
            }),
          ]
        }
      }],
    })
:   ['style-loader', 'css-loader?modules=true&localIdentName=' + cssIndentifier];

const sassLoader = PRODUCTION
?   ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader?modules=true&localIdentName=' + cssIndentifier, {
        loader: "postcss-loader",
        options: {
          ident: 'postcss',
          plugins: [
            require('autoprefixer')({
              'browsers': ['> 1%', 'last 2 versions']
            }),
          ]
        }
      }, 'sass-loader'],
    })
:   ['style-loader', 'css-loader?modules=true&localIdentName=' + cssIndentifier, 'sass-loader'];  

module.exports = {
  externals: {
    'jquery' : 'jQuery',
  },
  mode: mode,
  devtool: 'source-map',
  entry: entry,
  plugins: plugins,
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      use: ['url-loader?limit=10000&name=img/[hash:12].[ext]'],
      exclude: '/node_modules/'
    }, {
      test: /\.css$/,
      use: cssLoader,
      exclude: '/node_modules/'
    },{
      test: /\.(scss|sass)$/,
      use: sassLoader,
      exclude: '/node_modules/'
    }]
  },
  output: {
    filename: PRODUCTION ? 'js/bundle[hash:12].min.js' : 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: output // public URL in browser files 
  },
  optimization: {
    sideEffects: false,
    usedExports: true
  }
};