import * as flsFunctions from "./vendor/functions.js";
import { throttle } from "./vendor/throttle.js";
import "lazysizes";
import mapInit from "./modules/map.js";
import Swiper, { Navigation, Thumbs } from "swiper";

flsFunctions.isWebp();

if (navigator.userAgent.indexOf("Firefox") >= 0) {
	var elms = document.querySelectorAll("link[rel=preload][as=style]");
	for (let i = 0; i < elms.length; i++) {
		elms[i].rel = "stylesheet";
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const body = document.querySelector("body");
	const menuButton = body.querySelector('.menu__button');
	const menu = body.querySelector('.menu');

	const tabs = body.querySelector('.tabs')

	mapInit();
	// leafletInit();

	const tabsSlider = new Swiper('.tabs',{
		slidesPerView: 4,
		spaceBetween: 30,
		freeMode: true,
		watchSlidesProgress: true,
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 20
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 30
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 30
			},
			1400: {
				slidesPerView: 5,
				spaceBetween: 36
			}



		}


	})

	const descSlider = new Swiper('.description__slider', {
		// autoHeight: true,
		modules: [Thumbs],
		loop: true,
		initialSlide: 1,
		slidesPerView: 1,
		centeredSlides: true,
		speed: 400,

		spaceBetween: 20,
		thumbs: {
			swiper: tabsSlider,
			slideThumbActiveClass: 'is-active',
		}

	})

	const offerSlider = new Swiper('.offer__cards-wrapper', {
		slidesPerView: 1,
		spaceBetween: 36,
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 36
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 36
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 20
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 30
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 30
			},
			1400: {
				slidesPerView: 5,
				spaceBetween: 36
			}
		}
	})

	const openMenu = (event) => {
		menuButton.classList.toggle('is-open');
		menu.classList.toggle('is-open');
	}

	menuButton.addEventListener('click', openMenu)
/*
	const swiper = new Swiper(".banners", {
		modules: [Navigation],
		loop: true,
		initialSlide: 1,
		slidesPerView: 1,
		centeredSlides: true,
		speed: 400,
		spaceBetween: 20,
		navigation: {
			nextEl: ".banners__nav--next",
			prevEl: ".banners__nav--prev",
		},
	});*/


	const destroySlider = (slider, elemSlider) => {
		slider.destroy(true, true);
		const wrapper = elemSlider.querySelector(".swiper-wrapper");
		if(wrapper) {
			wrapper.removeAttribute("style")
		}


		const slidersArr = wrapper
			? wrapper.querySelectorAll(".swiper-slide")
			: false;

		if (slidersArr && slidersArr.length > 0) {
			slidersArr.forEach((slide) => {
				slide.removeAttribute("style");
			});
		}
	};

	const udateSlider = (slider) => {
		slider.init();
		slider.update();
	};

	/*if (window.innerWidth <= 768) {
		destroySlider(tabsSlider, tabs );
	} else {
		newsSlider.init();
	}*/

	/*const resize = throttle(
		window.addEventListener(
			"resize",
			function () {
				if(window.innerWidth >= 768) {
					udateSlider(tabsSlider)
				} else {
					destroySlider(tabsSlider, tabs);
				}
			},
			"500"
		)
	);*/
});




