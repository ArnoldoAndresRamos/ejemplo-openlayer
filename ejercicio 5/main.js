

var contenedor = document.getElementById('popup');
var contenido  = document.getElementById('popup-content');
var cerrar	   = document.getElementById('popup-closer');

var overlay = new ol.Overlay({
  //element:document.getElementById('popup'),
	element:contenedor,
	autoPan:true,
	autoPanAnimation:{
		duration: 250
	}
});

cerrar.onclick = function(){
	overlay.setPosition(undefined);
	cerrar.blur();
	return false;
};




var map = new ol.Map({
	overlays: [overlay],
	target:'map',
	layers:[
		new ol.layer.Tile({
			source: new ol.source.OSM()
		})
	],
	view: new ol.View({
		center: ol.proj.fromLonLat([-71.223970, -33.68105860]),
		zoom:14
	})
});




map.on('singleclick', function(evt){
	var coordenada = evt.coordinate;
	var hdms = ol.proj.transform(coordenada,'EPSG:3857', 'EPSG:4326');
	contenido.innerHTML ="<a href='https://www.openstreetmap.org/#map=20/"+hdms[1]+"/"+hdms[0]+"&layers=H'>"+hdms[1]+"/"+hdms[0]+"</a>";
	overlay.setPosition(coordenada);

	document.getElementById('coordenadas').innerHTML = hdms[1]+","+hdms[0];



					// crea marcador
					var a = new ol.Feature({
					        geometry:new ol.geom.Point(ol.proj.fromLonLat([-71.223970, -33.68105860])),
					}); 

					a.setStyle(new ol.style.Style ({
					    image: new ol.style.Icon({
					        color:'black',
					        corssOrigin:'anonymous',
					        imgSize:[10,10],
					        src:'https://sites.google.com/site/figuritasgeometricas/_/rsrc/1339206194345/circulo/circulo.jpg?height=344&width=375',

					    })
					}));
					var puntos=[a]

					// crea capa 
					var capa = new ol.layer.Vector({
					    source: new ol.source.Vector({
					        features:puntos,
					    })
					});

					/* var vectorLayer = new .layer.vector.Layer({
					    source: vectorSource
					});*/
					map.addLayer(capa);

					//falta funcion hacer clikc sobre el marcador


})