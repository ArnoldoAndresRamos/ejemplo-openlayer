
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
		center: ol.proj.fromLonLat([-71.21456079245439,-33.68551321273539]),//3.801873306,  43.4884075]),
		zoom:14
	})
});




map.on('singleclick', function(evt){
	
	var coordenada = evt.coordinate;
	var hdms = ol.proj.transform(coordenada,'EPSG:3857', 'EPSG:4326');
	contenido.innerHTML ="<a href='https://www.openstreetmap.org/#map=20/"+hdms[1]+"/"+hdms[0]+"&layers=H'>"+hdms[1]+"/"+hdms[0]+
	"</a><br><a href='https://www.google.com/maps/place/"+hdms[1]+","+hdms[0]+"'>google</a>";
	overlay.setPosition(coordenada);

	//document.getElementById('coordenadas').innerHTML = hdms[1]+","+hdms[0];



					// crea marcador
					var punto1 = new ol.Feature({
					        geometry:new ol.geom.Point(ol.proj.fromLonLat([3.801873306,  43.4884075])),
					}); 

					punto1.setStyle(new ol.style.Style ({
					    image: new ol.style.Icon({
					        color:'black',
					        corssOrigin:'anonymous',
					        imgSize:[10,10],
					        src:'https://sites.google.com/site/figuritasgeometricas/_/rsrc/1339206194345/circulo/circulo.jpg?height=344&width=375',

					    })
					}));
					var puntos=[punto1]

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



					// calculo de UTM
					 // datos elipsoide hayford

					   var a = 6378388.0 // semieje mayor
					   var b = 6356911.946130 //semieje menor

					   var e =  0.08199189 //(Math.sqrt((Math.pow(a,2))+(Math.pow(b,2))))/a
					   var ep= 0.08226889 //(Math.sqrt((Math.pow(a,2))+(Math.pow(b,2))))/b
					   var ep2 = 0.00676817
					   var c =  6399936.608 //(Math.pow(a,2))/b

					   // conversion de grados decimales a radianes
					   lat = hdms[1]*-1
					   lon = hdms[0]*-1
					   radLat = ((lat*3.14159265358979323846264338327950)/180)*-1// latitud en rad
					   radLon = ((lon*3.14159265358979323846264338327950)/180)*-1 // longitud en rad

					   // calculo del huso
					   var huso = Math.trunc((lon/6)+31)
					   
					   //calculo del meridiano contral del huso
					   
					   lamda0 = (huso*6)-183

					   //desplazamiento del punto a calcular respecto al meridianocentral del huso
					   deltaLamda0 = radLon-((lamda0*3.14159265358979323846264338327950)/180)

					   console.log(radLon,radLat,huso,lamda0, deltaLamda0) 

					   var A = Math.cos(radLat)*Math.sin(deltaLamda0)
					   var E = (1/2)*Math.log((1+A)/(1-A))
					   var n = Math.atan((Math.tan(radLat))/Math.cos(deltaLamda0))-radLat

					   var V = (c/(Math.sqrt(1+ep2*Math.pow(Math.cos(radLat),2))))*0.9996

					   var E2 = (ep2/2)*Math.pow(E,2)*(Math.pow(Math.cos(radLat),2))
					   var A1 = Math.sin(2*radLat)
					   var A2 = A1*Math.pow(Math.cos(radLat),2)
					   console.log(A,E,n,V,E2,A1,A2)
					   
					   // ------------
					   var J2 = radLat+(A1/2)
					   var J4 = (3*J2+A2)/4	
					   var J6 = (5*J4+A2*Math.pow(Math.cos(radLat),2))/3 
					   var alfa = (3/4)*ep2
					   var beta = (5/3)*Math.pow(alfa,2)
					   var gama = (35/27)*Math.pow(alfa,3)
					   var B0   = 0.9996*c*(radLat-alfa*J2+beta*J4-gama*J6)
					   
					   console.log(J2,J4,J6,alfa,beta,gama,B0) 
					   
					   //calculo final
					   var X = E * V * ( 1 + (E2/3)) + 500000
					   var Y = n * V * ( 1 + E2) +	B0

					   console.log(X,Y)



					   document.getElementById('coordenadas').innerHTML = hdms[1]+","+hdms[0]+
					   "<br>"+X+" , "+Y;

})