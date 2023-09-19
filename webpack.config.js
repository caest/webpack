const autoprefixer = require('autoprefixer');
const postcssRTLCSS = require('postcss-rtlcss');
const chokidar = require('chokidar');
const colorExtractor = require("postcss-color-extractor");
const additionalData = require("ungic-sass-theme");
const path = require('path');
const fse = require('fs-extra');
const sass = require('sass');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        entry: './src/index.js',
    },
    mode: 'development',
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].min.css",
            chunkFilename: "[id].min.css",
            ignoreOrder: false,
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader
                  },
                  {
                    loader: "css-loader",
                    options: {
                      url: false,
                      import: false,
                    },
                  },
                  {
                    loader: "postcss-loader",
                    options: {
                      postcssOptions: {
                        plugins: [
                          autoprefixer(),
                          postcssRTLCSS(),
                          colorExtractor({
                            mergeMode: 'before',
                            mergeType: "className",
                            mergeValue: "light",
                            saveInputRules: true,
                            removeFromSelector: [{
                              type: "tag",
                              match: /html/i,
                            },
                            {
                              type: "pseudo",
                              match: /:root/i,
                            },
                            {
                              type: "pseudo",
                              match: /:host(-context)?/i,
                            },
                            {
                              type: "pseudo",
                              match: /::?ng-deep/i,
                            },
                            {
                              type: "attribute",
                              match: /dir/i,
                            }],
                            extract: (input) => {
                              fse.outputFileSync(path.join(__dirname, 'src/assets/artifacts/theme-light.css'), input.toResult().css);
                            }
                          })
                        ]
                      }
                    }
                  },
                  {
                    loader: "sass-loader",
                    options: {
                      additionalData: additionalData({
                        cwd: path.join(__dirname, 'src/styles/configs'),
                        themeOptions: {
                          "inverse-mode": false
                        }
                      })
                    }
                  }
                ]
              },              
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    colorExtractor({
                                        extract: (input) => {
                                            console.log(input.toResult(), input.source?.input?.file);
                                        },
                                        includeResultInOutput: true,
                                        mergeMode: "before",
                                        mergeType: "className",
                                        mergeValue: "my-theme",
                                        removeFromSelector: [
                                            { type: "class", match: "remove-me" },
                                        ],
                                        saveInputRules: true,
                                    }),
                                ]
                            }
                        }
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                  }
                }
              },
            {
                test: /\.light\.scss$/, 
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            import: false,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer(),
                                    postcssRTLCSS(),
                                    colorExtractor({
                                        mergeMode: 'before',
                                        mergeType: "className",
                                        mergeValue: "light",
                                        saveInputRules: true,
                                        removeFromSelector: [{
                                            type: "tag",
                                            match: /html/i,
                                        },
                                        {
                                            type: "pseudo",
                                            match: /:root/i,
                                        },
                                        {
                                            type: "pseudo",
                                            match: /:host(-context)?/i,
                                        },
                                        {
                                            type: "pseudo",
                                            match: /::?ng-deep/i,
                                        },
                                        {
                                            type: "attribute",
                                            match: /dir/i,
                                        }],
                                        extract: (input) => {
                                            fse.outputFileSync(path.join(__dirname, 'src/assets/artifacts/theme-light.css'), input.toResult().css);
                                        }
                                    })
                                ]
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            additionalData: additionalData({
                                cwd: path.join(__dirname, 'src/styles/configs'),
                                themeOptions: {
                                    "inverse-mode": false
                                }
                            })
                        }
                    },
                ]
            },
            {
                test: /\.(svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: 'images/[name].[hash:8].[ext]',
                    },
                  },
                ],
              },
            {
                test: /\.dark\.scss$/, 
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            import: false,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {                                
                                plugins: [
                                    colorExtractor({
                                        mergeMode: 'before',
                                        mergeType: "className",
                                        mergeValue: "dark",
                                        removeFromSelector: [{
                                            type: "tag",
                                            match: /html/i,
                                        },
                                        {
                                            type: "pseudo",
                                            match: /:root/i,
                                        },
                                        {
                                            type: "pseudo",
                                            match: /:host(-context)?/i,
                                        },
                                        {
                                            type: "pseudo",
                                            match: /::?ng-deep/i,
                                        },
                                        {
                                            type: "attribute",
                                            match: /dir/i,
                                        }],
                                        extract: (input) => {
                                            fse.outputFileSync(path.join(__dirname, 'src/assets/artifacts/theme-dark.css'), input.toResult().css);
                                        }
                                    })
                                ]
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            additionalData: additionalData({
                                cwd: path.join(__dirname, 'src/styles/configs'),
                                themeOptions: {
                                    "inverse-mode": true
                                }
                            })
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        modules: [path.resolve(__dirname, "node_modules"), path.resolve(__dirname, "src")],
        extensions: ['.js', '.jsx'],
    },
    output: {
        filename: "[name].min.js",
        path: path.resolve(__dirname, "src/assets/artifacts"),
        publicPath: '/'
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    }
};
