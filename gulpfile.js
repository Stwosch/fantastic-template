const gulp = require('gulp'),
	$ = require('gulp-load-plugins')({
		lazy: true
	}),
	browserSync = require('browser-sync').create(),
	del = require('del'),
	runSequence = require('run-sequence'),
	pump = require('pump'),
	ftp = require('vinyl-ftp'),
	argv = require('yargs').argv;

gulp.task('sass', () => {

	return gulp.src('source/sass/**/*.scss')
		.pipe($.plumber())
		.pipe($.sass.sync({
			outputStyle: 'compressed'
		}).on('error', $.sass.logError))
		.pipe($.autoprefixer({
			browsers: ['last 5 versions', 'IE 9']
		}))
		.pipe(gulp.dest('source/css'))
		.pipe(browserSync.stream());
});

gulp.task('watch', () => {

	gulp.watch('source/sass/**/*.scss', ['sass']);
	gulp.watch(['source/*.html', 'source/js/*.js'], browserSync.reload);
});

gulp.task('browser-sync', () => {

    browserSync.init({
        server: {
            baseDir: 'source'
        }
    });
});

gulp.task('default', ['sass', 'browser-sync', 'watch']);

// Optimization distribution version

gulp.task('clean', () => {

	return del('public/');
});

gulp.task('copy', () => {

	return gulp.src(['source/css/**/*.css', 'source/js/plugins/*', 'source/tools/**/*'], {
		base: 'source'
	})
		.pipe(gulp.dest('public/'));
});

gulp.task('imgmin', () => {

	return gulp.src('source/img/*')
		.pipe($.imagemin())
		.pipe(gulp.dest('public/img'));
});

gulp.task('jsmin', cb => {
    pump([
	    	gulp.src('source/js/*.js'),
	        $.babel({
	            presets: ['es2015']
	        }),
	        $.uglify(),
	        gulp.dest('public/js')
        ],
        cb);
});

gulp.task('htmlmin', () => {
  return gulp.src('source/*.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'));
});

// Build queue

gulp.task('build', () => {

	runSequence('clean', 'copy', 'imgmin', 'jsmin', 'htmlmin', 'upload');
});


// Upload to server

gulp.task('upload', () => {

	const conn = ftp.create({
		host:     'mywebsite.tld',
        user:     'me',
        password: 'mypass'
	});

	return gulp.src('public/**/*')
		.pipe($.if(argv.upload, conn.dest('public_html/')));
});