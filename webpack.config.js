const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        new CopyPlugin([
            {from: 'index.html', to: 'index.html', toType: 'file'}
        ])
    ]
};
