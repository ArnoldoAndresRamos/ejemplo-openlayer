

var coord  =[-33.6810011,-71.224]
var coord_a=[-33.6810011,-71.224]
var coord_b=[-33.6810011265,-71.224]
var coord_c=[-33.681001151,-71.224]
var coord_d=[-33.6810011735,-71.224]

var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat:ol.coordinate.createStringXY(50),
    projection:'EPSG:4326',
    className:'custom-mouse-position',
    target:document.getElementById('mouse-position'),
    undefinedHTML:'&nbsp'
})


/// ____________________________________


var map = new ol.Map({
    controls: ol.control.defaults().extend([mousePositionControl]),
     target:'js-map',
     layers:[
        new ol.layer.Tile({
            source:new ol.source.OSM()
        })
     ],
     view: new ol.View({
          center: ol.proj.fromLonLat([coord[1],coord[0]]),
          zoom:20
        }),
    });

//___________________________________________
//     caputura de coordenadas con mouse



// primer punto
var a = new ol.Feature({
        geometry:new ol.geom.Point(ol.proj.fromLonLat([coord_a[1],coord_a[0]])),
}); 

a.setStyle(new ol.style.Style ({
    image: new ol.style.Icon({
        color:'black',
        corssOrigin:'anonymous',
        imgSize:[10,10],
        src:'https://sites.google.com/site/figuritasgeometricas/_/rsrc/1339206194345/circulo/circulo.jpg?height=344&width=375',

    })
}));

var b = new ol.Feature({
        geometry:new ol.geom.Point(ol.proj.fromLonLat([coord_b[1],coord_b[0]])),
}); 

b.setStyle(new ol.style.Style ({
    image: new ol.style.Icon({
        //color:'blue',
        corssOrigin:'anonymous',
        imgSize:[1,1],
        src:'https://sites.google.com/site/figuritasgeometricas/_/rsrc/1339206194345/circulo/circulo.jpg?height=344&width=375'
    })
}));


var c = new ol.Feature({
        geometry:new ol.geom.Point(ol.proj.fromLonLat([coord_c[1],coord_c[0]])),
}); 

c.setStyle(new ol.style.Style ({
    image: new ol.style.Icon({
        color:'red',
        corssOrigin:'anonymous',
        imgSize:[10,10],
        src:'https://sites.google.com/site/figuritasgeometricas/_/rsrc/1339206194345/circulo/circulo.jpg?height=344&width=375'
    })
}));



var d = new ol.Feature({
        geometry:new ol.geom.Point(ol.proj.fromLonLat([coord_d[1],coord_d[0]])),
}); 

d.setStyle(new ol.style.Style ({
    image: new ol.style.Icon({
        color:'blue',
        corssOrigin:'anonymous',
        imgSize:[10,10],
        src:'https://sites.google.com/site/figuritasgeometricas/_/rsrc/1339206194345/circulo/circulo.jpg?height=344&width=375'
    })
}));



var puntos=[a,b,c,d]

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




 
