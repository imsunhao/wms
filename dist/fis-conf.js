fis
    .set('project.ignore', [
        'fis-conf.js',
        'public/components/prod/**'
    ])
    .match('**.html', {
        rExt: '.ejs'
    });