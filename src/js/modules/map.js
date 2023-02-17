// Дождёмся загрузки API и готовности DOM.

const data = {
	"type": "FeatureCollection",
	"features": [
	{
		"type": "Feature",
		"id": 0,
		"geometry": {
			"type": "Point",
			"coordinates": [44.99106353286937,38.929555436523465]
		},
		"properties": {
			"hintContent": "Магазин на углу",
			"data": {
				"organization": "shop",
				"open": "9am - 9pm"
			}
		}
	},
	{
		"type": "Feature",
		"id": 1,
		"geometry": {
			"type": "Point",
			"coordinates": [44.99261660290072,38.93068732872774]
		},
		"properties": {
			"hintContent": "Аптека",
			"data": {
				"organization": "pharmacy",
				"open": "8am - 10pm"
			}
		},
	}
]
}

export default function mapInit() {
	// ymaps.ready(init);
	const mapWrapper = document.querySelector('.map__wrapper')
	const spinner = mapWrapper.querySelector('.loader');
	let check_if_load = false;
	let myMapTemp, myPlacemarkTemp;

	var ymap = function(mapWrapper) {
		mapWrapper.addEventListener('mouseenter', function(e){
			if (!check_if_load) {
				check_if_load = true;
				spinner.classList.add('is-active');


				loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=fb6ba0dc-be1f-4dc4-a271-cce1243ad11b", function(){
						ymaps.load(init);
				});
				}
		})

	}



	function init () {
	   let myMap = new ymaps.Map('map', {
			center: [44.992020, 38.933128],
			zoom: 17,
			controls: ['smallMapDefaultSet']
		});

		const hintLayout = ymaps.templateLayoutFactory.createClass( '<div class="my-hint">{{ properties.hintContent }}</div>',
			{
				getShape: function () {
					var el = this.getElement(),
						result = null;
					if (el) {
						var firstChild = el.firstChild;
						result = new ymaps.shape.Rectangle(
							new ymaps.geometry.pixel.Rectangle([
								[0, 0],
								[firstChild.offsetWidth, firstChild.offsetHeight]
							])
						);
					}
					return result;
				}
			}
		);

		const polygonLayout = ymaps.templateLayoutFactory.createClass('<div class="location__icon"><svg><use xlink:href="#loc"></use></svg></div>');

		const objectManager = new ymaps.ObjectManager();

		const hospitalIcon = ymaps.templateLayoutFactory.createClass('<div class="location__icon"><svg><use xlink:href="#plus"></use></svg></div>');

		const shopIcon = ymaps.templateLayoutFactory.createClass('<div class="map-icon--green"><svg><use xlink:href="#cart"></use></svg></div>')

		data.features.forEach(elem => {
			if(elem.properties.data.organization === 'pharmacy') {
				elem.options = { iconLayout: hospitalIcon, hintLayout: hintLayout,
					hintOffset: [-100, -50], iconShape: {
						type: 'Circle',
						coordinates: [0, 0],
						radius: 51
					}}
				}
			if(elem.properties.data.organization === 'shop') {
				elem.options = { iconLayout: shopIcon, hintLayout: hintLayout,
					hintOffset: [-100, -50], iconShape: {
						type: 'Circle',
						coordinates: [0, 0],
						radius: 51
					}
				}
			}
		})

		objectManager.add(data);


		const myPlacemark = new ymaps.Placemark([44.991899, 38.927496], {
				hintContent: 'ЖК “Яблоновский”',
		},
			{
				hintLayout: hintLayout,
				hintOffset: [-100, -50],
				iconLayout: polygonLayout,
				iconCaptionMaxWidth: '300',
				hideIconOnBalloonOpen: false,
				iconShape: {
					type: 'Circle',
					coordinates: [0, 0],
					radius: 51
				},

		});
				myMap.geoObjects.add(myPlacemark);
				myMap.geoObjects.add(objectManager);


		myMap.controls.remove('searchControl').remove('typeSelector').remove('rulerControl').remove('routeButtonControl');

		let layer = myMap.layers.get(0).get(0);
		// let layer = myMap.layers.get[0][0];

		waitForTilesLoad(layer).then(function() {

			spinner.classList.remove('is-active');
		});

	}

	 // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
	function waitForTilesLoad(layer) {
		return new ymaps.vow.Promise(function (resolve, reject) {
			var tc = getTileContainer(layer), readyAll = true;
			tc.tiles.each(function (tile, number) {
				if (!tile.isReady()) {
					readyAll = false;
				}
			});

			if (readyAll) {
				resolve();
			} else {
				tc.events.once("ready", function() {
					resolve();
				});
			}
		});
	}

	function getTileContainer(layer) {
		for (var k in layer) {
			if (layer.hasOwnProperty(k)) {
				if (layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
				|| layer[k] instanceof ymaps.layer.tileContainer.DomContainer) {
					return layer[k];
				}
			}
		}
		return null;
	}

	// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
	function loadScript(url, callback){
		var script = document.createElement("script");

		if (script.readyState){  // IE
			script.onreadystatechange = function(){
				if (script.readyState == "loaded" || script.readyState == "complete"){
					script.onreadystatechange = null;
					callback();
				}
			}
		}
		else {  // Другие браузеры
			script.onload = function(){
				callback();
			};
		}

		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	}

	ymap(mapWrapper);



}





