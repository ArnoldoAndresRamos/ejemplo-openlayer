
var map = new ol.Map({
	target:'map',
	layers:[
		new ol.layer.Tile({
			source: new ol.source.OSM()
		})
	],
	view: new ol.View({
		center: ol.proj.fromLonLat([-71.223970, -33.68105860]),
		zoom:10
	})	
})


// funcion para capturar coordenadas al hacer click
var arr=[]

map.on('singleclick',function(evt){

	var coordenada =[evt.coordinate];
	//var hdms = ol.coordinate.toStringXY(ol.proj.toLonLat(coordenada),48);
	var hdms = ol.coordinate.toStringXY(ol.proj.fromLonLat(coordenada));

	//document.getElementById('content').innerHTML=hdms;
	//document.getElementById('content1').innerHTML= ol.coordinate.toStringXY(ol.proj.toLonLat(evt.coordinate),48);
	
	var lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
  	var lon = lonlat[0];
  	var lat = lonlat[1];
	
	arr.push(coordenada)
	console.log(arr)
	document.getElementById('content1').innerHTML=lat+lon;

	
})

map.on('click', function(evt) {
  

  
});