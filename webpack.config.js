let path = require('path');
let conf = {
    "mode": "production",
    "entry": "./src/index.js",
    "output": {
        "path": path.resolve(__dirname, './dist '),
        "filename": "main.js",
        "publicPath": 'dist/'
    },
    "devtool": "source-map",
    "module": {
        "rules": [
            {
                "test": /\.js$/,
                "loader": 'babel-loader',
                "exclude": /node_modules/
            }
        ]
    }
}

module.exports = conf;