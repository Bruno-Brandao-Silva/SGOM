import type { Configuration } from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';

import { rules } from './webpack.rules';

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  //add better-sqlite3 to externals
  externals: {
    better_sqlite3: 'better-sqlite3'
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/pdf-to-printer/dist/SumatraPDF-3.4.6-32.exe',
          to: './',
        },
      ]
    })
  ],
};
