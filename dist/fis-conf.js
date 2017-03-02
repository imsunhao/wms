fis
    .set('project.ignore', [
        'fis-conf.js',
        'public/components/prod/**'
    ])
    .match('**.html', {
        rExt: '.ejs'
    })
    .match('**.js', {
        parser: fis.plugin('jdists', {
            remove: "todoList,debug"
        }),
        optimizer: fis.plugin('uglify-js')
    });