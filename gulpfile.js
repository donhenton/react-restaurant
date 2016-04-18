

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglifycss = require('gulp-uglifycss');
var del = require('del');
var reactify = require('reactify');
var babelify = require('babelify');
var browserify = require('browserify');
var watch = require('gulp-watch');
var tap = require('gulp-tap');
var gutil = require('gulp-util');
var server = require('gulp-server-livereload');
var livereload = require('gulp-livereload');
var gulpsync = require('gulp-sync')(gulp);


var notify = require("./build_utils/build_utils").notify;
var targetLocation = './target/'
/* livereload loads this page you only get one  
 * 
 * the chrome livereload plugin needs to be installed
 * 
 */
var pageURL = 'http://localhost:8080';

var SASS_FILES = './sass/**/*.scss';
var WATCH_JS = ['./src/**/*.js'];
var MAIN_HTML_FILE = ['./src/html/index.html'];

function Bundle() {

    var Bundler = browserify({
        entries: './src/index.js',
        transform: [["babelify", {"presets": ["es2015"]}]],
        extensions: ['.js'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    return Bundler
            .bundle()
            .on('error', notify);
}

gulp.task('copy-html', function () {


    // base allows to copy the folders above the file
    // return gulp.src(MAIN_HTML_FILE,{'cwd': './src/html','base':'./..'} )
    return gulp.src(MAIN_HTML_FILE).pipe(gulp.dest(targetLocation))
            .on('finish', function ( ) {
                gutil.log("processing change in html");
                livereload.reload(pageURL);
               // cb();
            });
 

});

gulp.task('clean', function (  ) {

    del(['target']);

});

gulp.task('build', function () {
    Bundle()
            .pipe(source('bundle.js'))
            .pipe(streamify(uglify()))
            .pipe(gulp.dest(targetLocation))
            .on('finish', function ( ) {
                gutil.log("build bundle end");
                 livereload.reload(pageURL);
            });
    ;
});
var sassProcess =
        function () {

            return gulp.src(SASS_FILES)
                    .pipe(sass().on('error', sass.logError))
                    .pipe(concat('style.min.css'))
                    .pipe(uglifycss())
                    .pipe(gulp.dest(targetLocation));
        };

gulp.task('sass', function () {
    sassProcess();

});

gulp.task('watch', function () {

    watch(SASS_FILES, function (events, done) {

        sassProcess()
                .on('finish', function ( ) {
                    gutil.log("processing change in css");
                    livereload.reload(pageURL);
                });

    });

    watch(WATCH_JS, function (events, done) {

        gulp.start('build');
    });

    watch(MAIN_HTML_FILE, function (events, done) {
        gutil.log("starting html change");
        gulp.start('copy-html');
    });

});

/*

,
                    filter: function (filePath, cb) {
                        if (/bundle.js/.test(filePath)) {
                            gutil.log("hit js 1")
                            cb(true)
                        } else if (/style.min.css/.test(filePath)) {
                            gutil.log("hit css 1")
                            cb(true)
                        }
                    }

*/
gulp.task('serve', function (done) {
    livereload.listen();
    gulp.src('target')
            .pipe(server({
                livereload: {
                    enable: true
                },
                host: '127.0.0.1',
                port: 8080,
                defaultFile: 'index.html',
                directoryListing: false,
                open: true
            }));
});
gulp.task('release', gulpsync.sync(['clean','build', 'sass']));
gulp.task('dev', gulpsync.sync(['clean', 'build', 'sass', 'copy-html', 'watch', 'serve']));