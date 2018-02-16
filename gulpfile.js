const gulp  = require('gulp');
const clean = require('gulp-clean');
const ts    = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

// Compilar arquivos typescripts 
gulp.task('ts-scripts', ['static'], () => {
    const tsResult = tsProject
        .src()
        .pipe(tsProject());

    return tsResult
            .js
            .pipe(
                gulp.dest('dist')
            );
});

// Mover todos os arquivos .json para pasta dist
gulp.task('static', ['clean'], () => {
    return gulp
        .src(['src/**/*.json'])
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
    return gulp
            .src(['dist'])
            .pipe(clean());
});

gulp.task('build', ['ts-scripts']);

gulp.task('watch', ['build'], () => {
    return gulp
            .watch(['src/**/*.ts', 'src/**/*.json']);
});

gulp.task('default', ['watch']);
