const path = require('path')

// import des plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack');


module.exports = {
    // lien vers le fichier js
    entry: './src/js/script.js',

    // après la compilation
    output: {
        filename: './js/app.js', // chemin et nom du fichier
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: true,
        compress: true,
        stats: 'errors-only'
    },
    module: {
        rules: [
            {
                test: /\.scss|css$/,
                use: [
                    {
                        // extraire le css dans un fichier séparé
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader', // gérer le css
                    'postcss-loader', // ajout des compatibilité navigateurs
                    'sass-loader' // compiler scss/sass to css
                ]
            },
            {
                test: /\.(jpg|png|svg|webp)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]', outputPath: 'img', publicPath: ''
                }
            },
            {
                test: /\.(woff|woff2|otf|eot|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]', outputPath: 'fonts', publicPath: ''
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/style.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'img/**', to: path.resolve(__dirname, "dist") },
            ]
        }),
        new CleanWebpackPlugin(),
        ...['index', 'about', 'legal', 'megarama', 'fitae', 'competition'].map(el => {
            return new HtmlWebpackPlugin({
                filename: `${el}.html`,
                template: `./src/${el}.html`,
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true
                }
            })
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ]
}