const webpack = require('webpack')
module.exports = {
    publicPath:'./',
    configureWebpack: {
        externals: {
            'AMap': 'AMap',
            'BMap': 'BMap',
            'BMap_Symbol_SHAPE_POINT': 'BMap_Symbol_SHAPE_POINT'
        },
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    }
}