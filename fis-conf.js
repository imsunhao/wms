// 设置项目属性
fis.set('project.static', '/static');


fis.match(/static\/(css)\/.*\.*$/, {
    useHash: true
});

//sass的编译
fis.match('**/*.scss', {
    rExt: '.css', // from .scss to .css
    parser: fis.plugin('node-sass', {
        //fis-parser-node-sass option
    })
});

fis.match('::packager', {
    spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '15'
    })
});

//-------------------------删除 生产实际代码--------------------------------

fis.media('debug')
    .set('project.ignore', [
        'DOC/**',
        'UI/**',
        'TODOLIST/**',
        'node_modules/**',
        '.git/**',
        '.idea/**',
        'test/**',
          'output/**',
        'dist/**',
        'fis-conf.js'
    ])
    //调整 main.html
    .match('static/(main.html)', {
        release: "/$1",
        useCache: false
    })
    //调整 login.html
    .match("static/page/login/(*.html)", {
        release: '/$1',
        useCache: false
    })
    .match('static/**(.{html,js})', {
        parser: fis.plugin('jdists', {
            remove: "prod"
        })
    });

//-----------------------模拟生产环境下CSS、JS压缩合并-----------------------
fis.media('test')
    .set('project.ignore', [
        'DOC/**',
        'UI/**',
        'TODOLIST/**',
        'hock/**',
        'node_modules/**',
        '.git/**',
        '.idea/**',
        'test/**',
        'server/**',
        'output/**',
        'dist/**',
        'fis-conf.js'
    ])
    .match(/static\/(css|js)\/.*\.*$/, {
        useHash: false
    })
    .match('**.html', {
        parser: fis.plugin('jdists', {
            remove: "todoList,debug"
        })
    })
    .match('static/**.js', {
        parser: fis.plugin('jdists', {
            remove: "todoList,debug"
        }),
        optimizer: fis.plugin('uglify-js')
    })
    .match("static/page/(**.html)", {                                    //修改 附属文件
        release: '../views/page/$1',
        useCache: false
    })
    .match("static/page/login/index.html", {                             //修改登录 释放位置
        release: '../views/login.html',
        useCache: false
    })
    .match("static/main.html", {                                         //修改main 释放位置
        release: '../views/index.html',
        useCache: false
    })
    .match(/(components\/.*\/*css|static\/css\/main.scss)/, {
        packTo: '${project.static}/lib/common.css',
        optimizer: fis.plugin('clean-css')
    })
    .match("components/*/fonts/(**)", {
        release: "${project.static}/lib/fonts/$1"
    })
    .match('components/prod/*.js', {
        packTo: '${project.static}/lib/common.js'
    })
    .match('components/debug/*.js', {
        release: false
    })
    .match('**.css', {
        optimizer: fis.plugin('clean-css')
    });