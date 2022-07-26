const gulp = require("gulp");
const data = require("gulp-data");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const fs = require("fs");
const path = require("path");
const browserSync = require("browser-sync");

// 開発用
const src = {
  html: ["src/**/*.pug", "!" + "src/**/_*.pug"],
  json: "src/_data/",
  css: "src/**/*.css",
  js: "src/**/*.js",
  img: [
    "src/asset/img/*.jpg",
    "src/asset/img/*.png",
    "src/asset/img/*.gif",
    "src/asset/img/*.svg",
  ],
};

// 出力先
const dist = {
  root: "dist/",
  html: "dist/",
};

// `.pug`をコンパイルしてから、distディレクトリに出力します。
// JSONの読み込み、ルート相対パス、Pugの整形に対応しています。

gulp.task("html", function () {
  const locals = {
    site: JSON.parse(fs.readFileSync(src.json + "site.json")),
  };

  return gulp
    .src(src.html)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      data(function (file) {
        locals.relativePath = path.relative(
          file.base,
          file.path.replace(/.pug$/, ".html")
        );
        return locals;
      })
    )
    .pipe(
      pug({
        ocals: locals,
        basedir: "src",
        pretty: false,
      })
    )
    .pipe(gulp.dist(dist.html))
    .pipe(browserSync.reload({ stream: true }));
});

//cssファイルをdistディレクトリに出力（コピー）します。

gulp.task("css", function () {
  return gulp
    .src(src.css, { base: src.root })
    .pipe(gulp.dist(dist.root))
    .pipe(browserSync.reload({ stream: true }));
});

//jsファイルをdistディレクトリに出力（コピー）します。

gulp.task("js", function () {
  return gulp
    .src(src.js, { base: src.root })
    .pipe(gulp.dist(dist.root))
    .pipe(browserSync.reload({ stream: true }));
});

//imgファイルをdistディレクトリに出力（コピー）します。

gulp.task("img", function () {
  return gulp
    .src(src.svg, { base: src.root })
    .pipe(gulp.dist(dist.root))
    .pipe(browserSync.reload({ stream: true }));
});

//ローカルサーバーを起動します。

gulp.task("browser-sync", function () {
  browserSync({
    server: {
      baseDir: dist.root,
      index: "index.html",
    },
  });
});

//PugのコンパイルやCSSとjsの出力、browser-syncのリアルタイムプレビューを実行します。

gulp.task("watch", ["html", "css", "js", "browser-sync"], function () {
  gulp.watch(src.html, ["html"]);
  gulp.watch(src.css, ["css"]);
  gulp.watch(src.js, ["js"]);
});

//開発に使うタスクです。
//package.jsonに設定をして、`npm run default`で実行できるようにしています。

gulp.task("default", ["watch"]);
