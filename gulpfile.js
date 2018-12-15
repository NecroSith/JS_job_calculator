// Gilp-pack v1.0 for gulp 4.0 made by Yan Pustynnyy
// Heavily inspired by my mentors and colleagues at WebCademy.ru 

//  Variable initializing
const gulp = require('gulp'),
	// less = require('gulp-less'),
	sass = require('gulp-sass'),					// Uncomment this if you use SCSS
	browserSync = require('browser-sync').create(),
	notify = require('gulp-notify'), 				// For error messaging in console
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	plumber = require('gulp-plumber'), 				// For error handling
	clean = require('gulp-clean'),
	del = require('del');
	// uglify = require('gulp-uglify');
	// ssequence = require('run-sequence');
	// pug = require('gulp-pug');


// Watch over LESS files and refresh the page if changes were made
// gulp.task('less', function() {
//     return gulp.src('src/less/**/main.less').
//     	pipe(plumber({
//     		errorHandler: notify.onError(function(err){
//     			return {
//     				title: 'LESS ERROR',
//     				message: err.message
//     			}
//     		})
//     	}))
//     	.pipe(sourcemaps.init())
//     	.pipe(less())
//     	.pipe(autoprefixer({
//     		browsers: ['last 3 versions'],
//     		cascade: false
//     	}))
//     	.pipe(gulp.dest('build/css/'))
//     	.pipe(browserSync.stream());
// });

// Watch over SCSS files and refresh the page if changes were made
// Uncomment if you use SCSS instead of LESS

gulp.task('sass', function() {
    return gulp.src('src/scss/**/main.scss').
    	pipe(plumber({
    		errorHandler: notify.onError(function(err){
    			return {
    				title: 'SCSS ERROR',
    				message: err.message
    			}
    		})
    	}))
    	.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('build/css/'))
		.pipe(browserSync.stream());
});


// Delete build directory
gulp.task('clean:build', function() {
    return del('./build');
});


// Watch over pug files and convert them into html
// gulp.task('pug', function() {
//     return gulp.src('src/pug/pages/**/*.pug')
//     	.pipe(plumber({
//     		errorHandler: notify.onError(function(err) {
//     			return {
//     				title: 'PUG ERROR',
//     				message: err.message
//     			}
//     		})
//     	}))
//     	.pipe(pug({
//     		pretty: true
//     	}))
//     	.pipe(gulp.dest('build/'))
//     	.pipe(browserSync.stream());
// });

// Copy js files from source directory to build
gulp.task('copy:js', function() {
    return gulp.src('./src/js/**/*.*')
    	.pipe(gulp.dest('./build/js/'))
    	.pipe(browserSync.stream());
});

// Copy libraries from source directory to build
gulp.task('copy:lib', function() {
    return gulp.src('./src/lib/**/*.*')
    	.pipe(gulp.dest('./build/lib/'))
    	.pipe(browserSync.stream());
});

// Copy images from source directory to build
gulp.task('copy:img', function() {
    return gulp.src('./src/img/**/*.*')
    	.pipe(gulp.dest('./build/img/'))
    	.pipe(browserSync.stream());
});

// Copy html files from source directory to build
gulp.task('copy:html', function() {
    return gulp.src('./src/*.html')
    	.pipe(gulp.dest('./build/'))
    	.pipe(browserSync.stream());
});

// Watch over all the important folders and refresh the page if changes were made
gulp.task('server', function() {
    browserSync.init({
        server: { baseDir: './build'}
    })
    gulp.watch('./src/scss/**/*.scss').on('change', gulp.series('sass'));
    gulp.watch('./src/js/**/*.js').on('change', gulp.series('copy:js'));
    gulp.watch('./src/lib/**/*.*').on('change', gulp.series('copy:lib'));
    gulp.watch('./src/img/**/*.*').on('change', gulp.series('copy:img'));
    gulp.watch('src/*.html').on('change', gulp.series('copy:html', reload));
    // gulp.watch('src/**/*.pug', ['pug']);
});

function reload(done) {
	browserSync.reload();
	done();
}


gulp.task('default',
    gulp.series('clean:build', 
    	gulp.parallel('sass', 'copy:html', 'copy:lib', 'copy:js', 'copy:img',
    	'server')
    )
);



