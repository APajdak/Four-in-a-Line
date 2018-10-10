let gulp = require('gulp');
let sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('src/public/scss/main.scss')
    .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('src/public/css'));
})

gulp.task('watch', ()=>{
    gulp.watch('src/public/scss/**/*.scss',['sass']);
})