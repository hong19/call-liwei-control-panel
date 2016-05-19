var elixir = require('laravel-elixir');
var BrowserSync = require('laravel-elixir-browsersync');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss', 'public/build')
        .browserify('app.js', 'public/build')
        .browserSync({
            files: [
                'app/**/*',
                'public/**/*',
                'resources/views/**/*'
            ],
            proxy: 'localhost:8000'
        });
});
