
var coordenadas_mouse = new ol.control.MousePosition({
	coordinateFormat:ol.coordinate.createStringXY(5),
	projection:'EPSG:4326',
	//target:document.getElementById('coord')

})

console.log(coordenadas_mouse)
var map = new ol.Map({
	controls: ol.control.defaults().extend([coordenadas_mouse]),
	target: 'map',
	layers:[
	 new ol.layer.Tile({
	 	source: new ol.source.OSM()
	 })
	],
	view: new ol.View({
		center: ol.proj.fromLonLat([-71.223970481761540440857061184942722320556640625000, -33.681058602450583805421047145500779151916503906250]),
		zoom:10
	})

});

