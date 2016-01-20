var gulp = require('gulp');

// 引入组件
var imagemin = require('gulp-imagemin'), //图片压缩
    pngcrush = require('imagemin-pngcrush'),
    minifycss = require('gulp-minify-css'), //css压缩
    uglify = require('gulp-uglify'), //js压缩
    concat = require('gulp-concat'), //文件合并
    rename = require('gulp-rename'), //文件更名
    notify = require('gulp-notify'); //提示信息


// 压缩图片
gulp.task('img', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dest/images/'))
        .pipe(notify({
            message: 'img task ok'
        }));
});

function compressCss(src, output, msg) {
    gulp.src(src)
        .pipe(concat(output))
        .pipe(gulp.dest('dest/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dest/css'))
        .pipe(notify({
            message: msg
        }));
}

// 合并、压缩、重命名css
gulp.task('css', function () {
    compressCss(['src/css/reset.css', 'src/css/main.css'], 'main.css', 'rest main ok');
    return;
});


// 合并、压缩js文件
gulp.task('minifyjs', function () {
    return gulp.src(['src/lib/*.js', 'src/lib/*/*.js']) //需要操作的文件
        .pipe(uglify()) //压缩
        .pipe(gulp.dest('dest/lib/')); //输出
});

// 默认任务
gulp.task('default', function () {
    gulp.run('img', 'css', 'minifyjs');
});
