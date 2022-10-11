const copyright = `
/*! *****************************************************************************************************************************
* Copyright (c) Tuvalsoft Corporation. All rights reserved.                                                                     *
*                                                                                                                               *
* ████████╗██╗   ██╗██╗   ██╗ █████╗ ██╗         ███████╗██████╗  █████╗ ███╗   ███╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗  ██╗ *
* ╚══██╔══╝██║   ██║██║   ██║██╔══██╗██║         ██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔════╝██║    ██║██╔═══██╗██╔══██╗██║ ██╔╝ *
*    ██║   ██║   ██║██║   ██║███████║██║         █████╗  ██████╔╝███████║██╔████╔██║█████╗  ██║ █╗ ██║██║   ██║██████╔╝█████╔╝  *
*    ██║   ██║   ██║╚██╗ ██╔╝██╔══██║██║         ██╔══╝  ██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██╔═██╗  *
*    ██║   ╚██████╔╝ ╚████╔╝ ██║  ██║███████╗    ██║     ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗╚███╔███╔╝╚██████╔╝██║  ██║██║  ██╗ *
*    ╚═╝    ╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ *
*                                                                                                                               *
*                                                                                                                               *
* This file is part of Tuval Framework.                                                                                         *
* Copyright (c) Tuvalsoft 2019 All rights reserved.                                                                             *
*                                                                                                                               *
* Licensed under the GNU General Public License v3.0.                                                                           *
* More info at: https://choosealicense.com/licenses/gpl-3.0/                                                                    *
* Tuval Framework Created By Tuvalsoft in 2019                                                                                  *
******************************************************************************************************************************@*/
`;
const path = require('path');
//const DeclarationBundlerPlugin = require('./declaration-bundler-webpack-plugin.fix');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
//const DtsBundleWebpack = require('dts-bundle-webpack');
const fs = require('fs');


var libraryName = '@procetra/modules/processoverview';

const DeclarationBundlerPlugin = require('./declaration-bundler-webpack-plugin.fix');

function DtsBundlePlugin() {}
DtsBundlePlugin.prototype.apply = function(compiler) {
    compiler.plugin('done', function() {
        var dts = require('dts-bundle');
        if (!dts) {
            throw 'Dts not found.';
        }
        dts.bundle({
            name: libraryName,
            main: 'dist_types/types/index.d.ts',
            out: '../../dist/index.d.ts',
            verbose: true,
            removeSource: true,
            removeSource: false,
            outputAsModuleFolder: true // to use npm in-package typings
        });
    });
};

const umdConfig = {
    mode: 'development',
    devtool: 'source-map',
    //devtool: 'none',
    entry: './src/index.ts',
    externals: [
        '@tuval/core',
        '@tuval/cg',
        '@tuval/graphics',
        '@tuval/gui',
        '@tuval/forms',
        '@realmocean/charts',
        '@realmocean/codeeditor',
        '@realmocean/buttons',
        '@realmocean/calendars',
        '@tuval/components-charts',
        '@realmocean/compression',
        '@realmocean/core',
        '@realmocean/data',
        '@realmocean/diagram',
        '@realmocean/dropdowns',
        '@realmocean/excelexport',
        '@realmocean/filemanager',
        '@realmocean/fileutils',
        '@realmocean/grids',
        '@realmocean/inputs',
        '@realmocean/layouts',
        '@realmocean/lists',
        '@realmocean/navigations',
        '@realmocean/pdfexport',
        '@realmocean/popups',
        '@realmocean/splitbuttons',
        '@realmocean/svgbase',
        '@realmocean/query-query-builder',
        '@realmocean/spreadsheet'
    ],
    module: {
        rules: [
            /*   {
                test: /\.js$/,
                use: ['babel-loader', 'webpack-conditional-loader']
              }, */
            {
                test: /\.(wasm|eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                type: 'javascript/auto',
                loader: 'arraybuffer-loader',
            },
            {
                test: /\.tsx?$/,
                //use: 'ts-loader',
                use: [
                    { loader: "ts-loader" },
                    //  { loader: "ifdef-loader", options: opts }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            /*  {
               test: /\.(woff|woff2|eot|ttf|otf)$/,
               use: [
                 'file-loader'
               ]
             } */
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            child_process: false,
            fs: false,
            crypto: false,
            net: false,
            tls: false,
            ws: false,
            os: false,
            path: false
        }
    },
    output: {
        libraryTarget: 'umd',
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [{
        apply: (compiler) => {
            compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                var dts = require('dts-bundle');
                if (!dts) {
                    throw 'Dts not found.';
                }
                dts.bundle({
                    name: libraryName,
                    main: 'dist_types/types/index.d.ts',
                    out: '../../dist/index.d.ts',
                    verbose: true,
                    removeSource: true,
                    removeSource: false,
                    outputAsModuleFolder: true // to use npm in-package typings
                });
            });
        }
    }]
};

module.exports = [umdConfig /* webClientConfig */ /* umdConfig */ /* , umdWebProcess */ ];