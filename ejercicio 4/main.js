var map = new ol.Map({
	target:'map',
	layers:[
		new ol.layer.Tile({
			source: new ol.source.OSM()
		})
	],
    view: new ol.View({
    	center: ol.proj.fromLonLat([-71.223970, -33.68105860]),
    	zoom:12
    })
})



var popup = new ol.Overlay({
	element:document.getElementById('popup')
});
map.addOverlay(popup);


map.on('click', function(evt){
	var elemento = popup.getElement();
	var coordenadas = evt.coordinate;
	var hdms = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326', 4);
	
	
	//$('#popup').popover("dispose"),

	popup.setPosition(coordenadas);
	$("#popup").popover({
		
		placement:'top',
		animation:false,
		html:true,
		content:'<p>jshdfhsdkjfh</p><code>'+hdms+'</code>'
	});

	//$("#popup").popover('destroy');
	$("#popup").popover('show');
});


		
//# sourceMappingURL=overlay.js.map