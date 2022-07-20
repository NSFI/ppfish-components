const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');
const webpackStream = require('webpack-stream');
const webpack = require('webpack5');
const through = require('through2');

const tsconfig = {
  compilerOptions: {
    baseUrl: './',
    target: 'es6',
    moduleResolution: 'node',
    jsx: 'react',
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    skipLibCheck: true,
    declaration: false,
    allowJs: true,
    checkJs: false,
    experimentalDecorators: true,
    paths: {},
  },
};

function clean() {
  return del('./lib/**');
}

function buildStyle() {
  return gulp
    .src(['./source/**/*.less', './source/**/*.css'], {
      base: './source/',
      ignore: ['**/__tests__/**/*'],
    })
    .pipe(gulp.dest('./lib/es'))
    .pipe(gulp.dest('./lib/cjs'));
}

function copyAssets() {
  return gulp
    .src('./source/assets/**/*')
    .pipe(gulp.dest('lib/es/assets'))
    .pipe(gulp.dest('lib/cjs/assets'));
}

function buildCJS() {
  return gulp
    .src(['lib/es/**/*.js'])
    .pipe(
      babel({
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      }),
    )
    .pipe(gulp.dest('lib/cjs/'));
}

function buildES() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ESNext',
  });
  return gulp
    .src(['source/**/*.{ts,tsx,js,jsx}'], {
      ignore: ['**/demos/**/*', '**/__tests__/**/*'],
    })
    .pipe(tsProject)
    .on('error', () => {
      /* Ignore compiler errors */
    })
    .pipe(
      babel({
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              loose: false,
            },
          ],
        ],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              absoluteRuntime: false,
              corejs: 3,
              helpers: true,
              regenerator: true,
            },
          ],
        ],
      }),
    )
    .pipe(gulp.dest('lib/es/'));
}

function buildDeclaration() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ESNext',
    declaration: true,
    emitDeclarationOnly: true,
  });
  return gulp
    .src(['source/**/*.{ts,tsx}'], {
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(tsProject)
    .on('error', () => {
      /* Ignore compiler errors */
    })
    .pipe(gulp.dest('lib/es/'))
    .pipe(gulp.dest('lib/cjs/'));
}

function umdWebpack() {
  return gulp
    .src('lib/es/components/index.js')
    .pipe(
      webpackStream(
        {
          output: {
            filename: 'ppfish.min.js',
            library: {
              type: 'umd',
              name: 'ppfish',
            },
          },
          mode: 'production',
          optimization: {
            usedExports: true,
          },
          resolve: {
            extensions: ['.js', '.json'],
          },
          plugins: [],
          module: {
            rules: [
              {
                test: /\.js$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      [
                        '@babel/preset-env',
                        {
                          modules: false,
                          loose: true,
                        },
                      ],
                    ],
                  },
                },
              },
              {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                type: 'asset/inline',
              },
              {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
              },
              {
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'less-loader'],
              },
            ],
          },
          externals: [
            {
              react: 'React',
              'react-dom': 'ReactDom',
            },
          ],
        },
        webpack,
      ),
    )
    .pipe(gulp.dest('lib/umd/'));
}

function copyMetaFiles() {
  return gulp.src(['./README.md']).pipe(gulp.dest('./lib/'));
}

function generatePackageJSON() {
  return gulp
    .src('./package.json')
    .pipe(
      through.obj((file, enc, cb) => {
        const rawJSON = file.contents.toString();
        const parsed = JSON.parse(rawJSON);
        delete parsed.scripts;
        delete parsed.devDependencies;
        delete parsed.publishConfig;
        delete parsed.files;
        const stringified = JSON.stringify(parsed, null, 2);
        file.contents = Buffer.from(stringified);
        cb(null, file);
      }),
    )
    .pipe(gulp.dest('./lib/'));
}

exports.umdWebpack = umdWebpack;

exports.default = gulp.series(
  clean,
  buildES,
  gulp.parallel(buildCJS, buildDeclaration, buildStyle),
  copyAssets,
  copyMetaFiles,
  generatePackageJSON,
  gulp.parallel(umdWebpack),
);
