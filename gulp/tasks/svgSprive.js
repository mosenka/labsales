
import svgSprite from "gulp-svg-sprite";
import svgo from "gulp-svgo";

export const svgSprive = () => {
	return app.gulp.src(app.path.src.svgicons)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SVG",
				message: "Error: <%= error.message %>"
			})
			)
		)
		.pipe(svgo({
			plugins: [{
				name: 'removeAttributesBySelector',
				params: {
					selector: "[fill='none']",
					attributes: "fill"
				}
			}]
		}))
		.pipe(svgSprite({
			svg: {
				rootAttributes: {
					style: "position: absolute; width: 0; height: 0;"
				}
			},
			mode: {
				// defs: true,
				// symbol: {
				// 	sprite: "../icons.svg"
				// }
				inline: true,
				symbol: {
					sprite: "../icons.svg", //sprite file name
					// example: true  //create html examle file
				},
				// css: {
				// 	render: {
				// 		scss: true
				// 	}
				// }
			}
		}))
		.pipe(app.gulp.dest(`${app.path.srcFolder}/img/`))
		.pipe(app.gulp.dest(`${app.path.buildFolder}/img/`))
}
