module.exports = {
    presets: [
        '@vue/app'
    ],
    plugins: [
        ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            // style: name => `${name}/style/less`
            style: false // 这里不导入样式， 样式直接全局导入
        }, 'vant'
        ]
    ]
}
