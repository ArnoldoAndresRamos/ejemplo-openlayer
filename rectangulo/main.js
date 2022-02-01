const requestURL = '../map.geojson';



var contenedor = document.getElementById('popup');
var contenido  = document.getElementById('popup-content');
var cerrar	   = document.getElementById('popup-closer');

var overlay = new ol.Overlay({
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



/* 
GeoJson
*/
var geo1={
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -71.22348546981812,
              -33.67905500816076
            ],
            [
              -71.22342646121979,
              -33.67905500816076
            ],
            [
              -71.22342646121979,
              -33.67901483181432
            ],
            [
              -71.22348546981812,
              -33.67901483181432
            ],
            [
              -71.22348546981812,
              -33.67905500816076
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -71.22348546981812,
              -33.679095742492855
            ],
            [
              -71.2234278023243,
              -33.679095742492855
            ],
            [
              -71.2234278023243,
              -33.67905947219809
            ],
            [
              -71.22348546981812,
              -33.67905947219809
            ],
            [
              -71.22348546981812,
              -33.679095742492855
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -71.22348546981812,
              -33.67913033875975
            ],
            [
              -71.22342847287655,
              -33.67913033875975
            ],
            [
              -71.22342847287655,
              -33.67909797451049
            ],
            [
              -71.22348546981812,
              -33.67909797451049
            ],
            [
              -71.22348546981812,
              -33.67913033875975
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -71.22342377901077,
              -33.67905389215139
            ],
            [
              -71.22337013483047,
              -33.67905389215139
            ],
            [
              -71.22337013483047,
              -33.67901483181432
            ],
            [
              -71.22342377901077,
              -33.67901483181432
            ],
            [
              -71.22342377901077,
              -33.67905389215139
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -71.22342646121979,
              -33.679095742492855
            ],
            [
              -71.2233667820692,
              -33.679095742492855
            ],
            [
              -71.2233667820692,
              -33.679061146212035
            ],
            [
              -71.22342646121979,
              -33.679061146212035
            ],
            [
              -71.22342646121979,
              -33.679095742492855
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -71.22342646121979,
              -33.679126990734524
            ],
            [
              -71.22336745262146,
              -33.679126990734524
            ],
            [
              -71.22336745262146,
              -33.67909797451049
            ],
            [
              -71.22342646121979,
              -33.67909797451049
            ],
            [
              -71.22342646121979,
              -33.679126990734524
            ]
          ]
        ]
      }
    }
  ]
}


const geojsonObject = {
  'type': 'FeatureCollection',
  'crs': {
    'type': 'name',
    'properties': {
      'name': 'EPSG:4326',
    },
  },
  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [
          [
            [-71.2273773409314  ,-33.68297783052198 ],
            [-71.2273773409314  ,-33.6893865069027  ],
            [-71.21927005431316 ,-33.6893865069027  ],
            [-71.21927005431316 ,-33.68297783052398 ],
            //[-71.20873058172243 * x,-33.68331514119337 * y],
          ],
        ],
      },
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [
          [
            [-71.2273773404314  ,-33.68297783052198 ],
            [-71.2273773404314  ,-33.6893865069027  ],
            [-71.21927005431316 ,-33.6893865069027  ],
            [-71.21927005431316 ,-33.68297783052398 ],
            //[-71.20873058172243 * x,-33.68331514119337 * y],
          ],
        ],
      },
    }

   	]
 }



styles = [

// Style({})
new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'blue',
      width: 3,
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 0, 255, 0.05)',
    	}),
  	/*
  	geometry: function (feature) {
      // return the coordinates of the first ring of the polygon
      const coordinates = ol.feature.getGeometry().getCoordinates()[0];
      return new MultiPoint(coordinates);
    },
    */
    }),
]



const source = new ol.source.Vector({
  // features: new ol.format.GeoJSON().readFeatures(geo1) para cambiar a EPSG26 
  // https://stackoverflow.com/questions/44957431/openlayers-3-reproject-epsg4326-vector-to-epsg3857
  features: new ol.format.GeoJSON().readFeatures(geo1 , { dataProjection: 'EPSG:4326',featureProjection:'EPSG:3857' }),
});



const layer = new ol.layer.Vector({
  source: source,
  style: styles,
});

const raster = new ol.layer.Tile({
			source: new ol.source.OSM()
		})



// d--

var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat:ol.coordinate.createStringXY(48),
    projection:'EPSG:4326',
    className:'custom-mouse-position',
    target:document.getElementById('mouse-position'),
    undefinedHTML:'&nbsp'
})



var map = new ol.Map({
  //controls: ol.control.defaults().extend([m.mousePositionControl]),
	overlays: [overlay],
	target:'map',
	layers:[
		raster,
		layer,

		],
	view: new ol.View({            // -71.21456079245439,-33.68551321273539
		center: ol.proj.fromLonLat([-71.2163891680685,-33.683779807491256]),//3.801873306,  43.4884075]),
		zoom:15
	})
});


arr=[[],[]]
contador = 1

map.on('singleclick', function(evt){
	
	var coordenada = evt.coordinate;
	var hdms = ol.proj.transform(coordenada,'EPSG:3857', 'EPSG:4326');

	contenido.innerHTML = hdms 
	overlay.setPosition(coordenada);

	
	if (contador == 1) {
		arr[0] = [hdms]
	}
	if (contador == 2){
		arr[1] = [hdms]
		contador = 0
	}

	contador+=1
	
	document.getElementById('coordenadas').innerHTML = "punto 1:" + arr[0] +'<br>'+ "punto 2:"+arr[1]+ "<br> clik:"+contador +
		"<br>"+coordenada
})



