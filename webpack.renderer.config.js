// eslint-disable-next-line @typescript-eslint/no-var-requires
const rules = require('./webpack.rules');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugins = require('./webpack.plugins');

rules.push({
    test: /\.css$/,
    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});
rules.push({
    test: /\.(png|jpg|svg|jpeg|gif)$/i,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: './public/images/[name].[ext]',
                publicPath: '../.'
            }
        },
    ],
});
module.exports = {
    module: {
        rules,
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    },
};
