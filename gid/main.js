var f=require('../map.geojson')

// import {get as getProjection} from 'ol/proj';
const projExtent = ol.proj.get('EPSG:3857').getExtent();

// import {getWidth} from 'ol/extent';
const startResolution = ol.extent.getWidth(projExtent) / 256;

const resolutions = new Array(22);

for (let i = 0, ii = resolutions.length; i < ii; ++i) {
  resolutions[i] = startResolution / Math.pow(2, i);
  //document.getElementById('array').innerHTML += resolutions[i]+'<br>';

}

const tileGrid = new ol.tilegrid.TileGrid({
    extent: [-138849910, 2870341, -7455066, 6338219],
    resolutions: resolutions,
    tileSize: [512, 256],
  });


const raster = new ol.layer.Tile({
    source: new ol.source.OSM()
})  

const wms = new ol.layer.Tile({
    // import TileWMS from 'ol/source/TileWMS';
    source: new ol.source.TileWMS({
        url: '',
        params: {'LAYERS': 'topp:states', 'TILED': true},
        serverType: 'geoserver',
        tileGrid: tileGrid,
      }),
})

const map = new ol.Map({
    layers: [raster],
    target: 'map',
    
    // View({})
    view: new ol.View({
      center: [-10997148, 4569099],
      zoom: 4,
    })
})