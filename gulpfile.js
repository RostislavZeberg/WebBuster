const { src, dest, watch, series } = require("gulp");
const concat = require("gulp-concat");
const htmlMin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const svgSprite = require("gulp-svg-sprite");
const svgMin = require("gulp-svgmin");
const image = require("gulp-image");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify-es").default;
const notify = require("gulp-notify");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const browserSync = require("browser-sync").create();

const clean = () => {
  return del(["dist", "dev"]);
};

const stylesBuild = () => {
  return src("src/styles/**/*.css")
    .pipe(concat("styles.css"))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(dest("dist/styles"));
};

const stylesDev = () => {
  return (
    src("src/styles/**/*.css")
      .pipe(sourcemaps.init())
      // .pipe(concat('styles.css'))
      .pipe(sourcemaps.write())
      .pipe(dest("dev/styles"))
      .pipe(browserSync.stream())
  );
};

const htmlMinify = () => {
  return src("src/**/*.html").pipe(dest("dist"));
};

const htmlDev = () => {
  return src("src/**/*.html").pipe(dest("dev"));
};

const svgSpritesBuild = () => {
  return src("src/resource/img/**/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("dist/resource/img"));
};

const svgSpritesDev = () => {
  return src("src/resource/img/**/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("dev/resource/img"));
};

const svgMinDev = () => {
  return src("src/resource/img/**/*.svg")
    .pipe(
      svgMin({
        plugins: [
          {
            removeComments: true,
          },
          {
            removeEmptyContainers: true,
          },
        ],
      })
    )
    .pipe(dest("dev/resource/img"));
};

const svgMinBuild = () => {
  return src("src/resource/img/**/*.svg")
    .pipe(
      svgMin({
        plugins: [
          {
            removeComments: true,
          },
          {
            removeEmptyContainers: true,
          },
        ],
      })
    )
    .pipe(dest("dist/resource/img"));
};

const scriptsBuild = () => {
  return src(["src/js/**/*.js"])
    .pipe(sourcemaps.init())
    .pipe(concat("script.js"))
    .pipe(sourcemaps.write())
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
};

const scriptsDev = () => {
  return src(["src/js/**/*.js"])
    .pipe(sourcemaps.init())
    .pipe(concat("script.js"))
    .pipe(sourcemaps.write())
    .pipe(dest("dev/js"))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dev",
    },
  });
};

const imagesBuild = () => {
  return src([
    "src/resource/img/**/*.jpg",
    "src/resource/img/**/*.png",
    "src/resource/img/*.svg",
    "src/resource/img/**/*.jpeg",
    "src/resource/img/**/*.webp",
  ])
    .pipe(image())
    .pipe(dest("dist/resource/img"));
};

const imagesDev = () => {
  return src([
    "src/img/**/*.jpg",
    "src/img/**/*.png",
    "src/img/*.svg",
    "src/img/**/*.jpeg",
    "src/img/**/*.webp",
  ])
    .pipe(image())
    .pipe(dest("dev/resource/img"));
};

const resources = () => {
  return src("src/resources/**").pipe(dest("dev"));
};

const fontsBuild = () => {
  return src(["src/resource/fonts/**/*.woff", "src/resource/fonts/**/*.woff2"]).pipe(
    dest("dist/resource/fonts")
  );
};

const fontsDev = () => {
  return src(["src/resource/fonts/**/*.woff", "src/resource/fonts/**/*.woff2"]).pipe(
    dest("dev/resource/fonts")
  );
};

watch("src/**/*.html", htmlMinify);
watch("src/styles/**/*.css", stylesBuild);
watch("src/styles/**/*.css", stylesDev);
watch("src/resource/img/**/*.svg", svgSpritesBuild);
watch("src/resource/img/**/*.svg", svgSpritesDev);
watch("src/js/**/*.js", scriptsBuild);
watch("src/js/**/*.js", scriptsDev);
watch("src/resource/**", resources);
watch("src/resource/fonts/**", fontsBuild);
watch("src/resource/fonts/**", resources);

exports.dev = series(
  clean,
  fontsDev,
  stylesDev,
  htmlDev,
  scriptsDev,
  svgMinDev,
  svgSpritesDev,
  imagesDev,
  resources,
  watchFiles
);

exports.build = series(
  clean,
  fontsBuild,
  htmlMinify,
  svgMinBuild,
  svgSpritesBuild,
  imagesBuild,
  scriptsBuild,
  resources,
  stylesBuild
);
