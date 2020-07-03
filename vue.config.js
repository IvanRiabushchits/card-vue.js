module.exports = {
    css: {
        loaderOptions: {
            css:  {prependData: '@import "@/assets/styles.scss";'},
            sass: {
                prependData: '@import "@/assets/styles.scss";'
            }
        }
    }
}