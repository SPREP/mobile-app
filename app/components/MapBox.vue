<template>
    <Page class="page">
      <ActionBar class="action-bar">
        <NavigationButton visibility="hidden"/>
        <GridLayout columns="50, *">
          <Label class="action-bar-title h2" text="Map" colSpan="2"/>

          <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/>
        </GridLayout>
      </ActionBar>
        <GridLayout>
                <Mapbox
                    accessToken="pk.eyJ1IjoiYnVjY2kiLCJhIjoiY2w2MHNpZGIxMDJsMDNqbnV0cDV2MDJ6cSJ9.hBDYjKhQ_7BzhSTempdKbg"
                    mapStyle="naturalEarth"                    
                    latitude="2.3681990625302096"
                    longitude="18.20708537210865"
                    hideCompass="true"
                    zoomLevel="1.8"
                    showUserLocation="false"
                    disableZoom="false"
                    disableRotation="false"
                    disableScroll="false"
                    disableTilt="false"
                    @mapReady="onMapReady($event)">
                </Mapbox>
        </GridLayout>
    </Page>
</template>
<
<script>
  import { convertHSLToRGBColor } from "@nativescript/core/css/parser";
import * as utils from "~/shared/utils";
  import { SelectedPageService } from "../shared/selected-page-service";

  const appSettings = require("@nativescript/core/application-settings");

     export default {
        data () {
            return { };
        },
        mounted() {
            console.log('** MAPBOX MOUNTED ***')
        },
        unmounted() {
            console.log('** MAPBOX UN-MOUNTED ***')
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },
            onMapReady(args) {
                console.log('*** ADD LAYER ***')
                
                const layer = appSettings.getString("layerName") 
                console.log("*** layer ***")
                if (typeof layer !== 'undefined') {
                    console.log(layer)        
                } else {
                    console.log("indefinito")
                    this.onNavigationItemTap(Main)
                    return
                }

                const layerTitle = appSettings.getString("layerTitle") 
                console.log("*** layerTitle ***")
                if (typeof layerTitle !== 'undefined') {
                    console.log(layerTitle)        
                } else {
                    console.log("indefinito")
                    this.onNavigationItemTap(Main)
                    return
                }

                const source = appSettings.getString("sourceName") 
                const wDate = appSettings.getString("wDate") 
                const wd = wDate.replace(/-/g,"")
                console.log("*** wd ***")
                if (typeof wd !== 'undefined') {
                    console.log(wd)        
                } else {
                    console.log("indefinito")
                    this.onNavigationItemTap(Main)
                    return
                }

                // const linkTo = "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetMap&FORMAT=image%2Fjpg&LAYERS=" + layer + "&DATE=" + wd
                // const linkTo = "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetMap&SRS=EPSG:4326&BBOX=-173.537,35.8775,-11.9603,83.8009&width=736&height=814&FORMAT=image%2Fjpg&LAYERS=" + layer + "&DATE=" + wd

                // questo è ok
                // const linkTo = "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetMap&width=736&height=814&FORMAT=image%2Fjpg&LAYERS=" + layer + "&DATE=" + wd

                const linkTo = 'https://ies-ows.jrc.ec.europa.eu/iforce/kwt/wms.py?service=WMS&request=GetMap&layers=Class20&styles=&format=image%2Fpng&transparent=true&version=1.1.1&width=256&height=256&srs=EPSG%3A3857&bbox=4070118.882129066,-78271.51696401955,4148390.3990930864,0'

                // const linkTo = "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetMap&FORMAT=image%2Fsvg%2Bxml&LAYERS=" + layer + "&DATE=" + wd

                console.log(linkTo)
/*
                 args.map.setViewport(
                    {
                        bounds: {
                        north: 52.4820,
                        east: 5.1087,
                        south: 52.2581,
                        west: 4.6816
                        },
                        animated: true // default true
                    }
                )
*/
/*
                args.map.addSource('wms-test-source', {
                    'type': 'raster',
                    // 'url': linkTo,
                     // use the tiles option to specify a WMS tile source URL
                    // https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/
                    'tiles': [
                    // linkTo,
                    'https://ies-ows.jrc.ec.europa.eu/iforce/kwt/wms.py?service=WMS&request=GetMap&layers=Sentinel2020&srs=EPSG:3857&styles=&format=image/png&transparent=true&version=1.1.1&width=256&height=256&bbox=3991847.3651650455,-78271.51696401955,4070118.882129066,0'
                    // 'https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?request=getmap&service=wms&BBOX=-90,-180,90,360&crs=EPSG:3875&format=image/jpeg&layers=gebco_latest&width=1200&height=600&version=1.3.0'
                    // PERFETTO! 'https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015'
                    ],
                    // bounds: [-90,-40.051129,90,40.051129],
                    'tileSize': 256
                });
*/

                args.map.addSource('wms-test-source', {
                    type: 'raster',
                    tiles : [
                        'https://ies-ows.jrc.ec.europa.eu/iforce/kwt/wms.py?service=WMS&request=GetMap&layers=Sentinel2020&srs=EPSG:3857&styles=&format=image/png&transparent=true&version=1.1.1&width=256&height=256&bbox={bbox-epsg-3857}'],
                    tileSize: 256    
                })

                args.map.addLayer(
                    {
                    id: 'wms-test-layer',
                    type: 'raster',
                    source: 'wms-test-source',
                    paint: {},
                    },
                    'aeroway-line'
                );


                if (true) {
                    return
                }

                args.map.addMarkers([
                    {
                        lat: 2.7397,
                        lng: 18.4252,
                        title: "Center Map",
                        subtitle: "Home of The Polyglot Developer!",
                        onCalloutTap: () => {
                            utils.openUrl("https://www.thepolyglotdeveloper.com");
                        }
                    }
                ]);

/*                
                args.map.setViewport(
                    {
                        bounds: {
                        north: 60.0,
                        east: 60.0,
                        south: -60.0,
                        west: -60.0
                        },
                        animated: false
                    }
                );
*/
                args.map.addSource( 'wms-test-source', {
                    type: "raster",
                    tiles: [
                        linkTo
                        // 'https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015'
                        // "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetMap&FORMAT=image%2Fjpg&LAYERS=layer_chirps-dekad_2.0_10d&DATE=20200111"
                        // "https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015"
                        // "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=layer_chirps-dekad_2.0_10d&FORMAT=image%2Fjpg&TRANSPARENT=true&date=20200921&time_to_nocache=1622704629174&WIDTH=256&HEIGHT=256&CRS=EPSG%3A4326&STYLES=&BBOX=-45%2C45%2C-22.5%2C67.5"
                        // "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&srs=EPSG:3857&LAYERS=layer_chirps-dekad_2.0_10d&FORMAT=image%2Fpng&TRANSPARENT=true&width=256&height=256&date=20200921&time_to_nocache=1622704629174&"
                        // "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetMap&FORMAT=image%2Fjpg&TRANSPARENT=true&LAYERS=layer_modis-sst_v2013.1_monanom"
                        // "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WCS&REQUEST=GetCoverage&FORMAT=GTiff&COVERAGE=layer_modis-sst_v2013.1_monanom"

                    ],
                    /*
                    bounds: {
                        north: 90.0,
                        east: 180.0,
                        south: -90.0,
                        west: -180.0
                    },
                    */



                    /*
                    coordinates: [
                        [-180, 90.0],
                        [180,0, 90.0],
                        [180, -90.0],
                        [-180.0, -90.0] ],
                    */
                    tileSize: 256,

               } );
                /*
                args.map.addSource( 'wms-test-source', {
                    type: "image",
                    url: linkTo,
                    tileSize: 256,
                    coordinates: [
                    [-180, 90.0],
                    [180,0, 90.0],
                    [180, -90.0],
                    [-180.0, -90.0] ]
               } );
               */
              /*
                args.map.addSource('wms-test-source', {
                type: 'image',
                url: 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
                coordinates: [
                [-80.425, 46.437],
                [-71.516, 46.437],
                [-71.516, 37.936],
                [-80.425, 37.936]
                ]
                });
                */
               /*
                args.map.addSource('wms-test-source', {
                    type: 'vector',
                    url: 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif'
                });
                */

                args.map.addLayer( {
                    'id': 'wms-test-layer',
                    'type': 'raster',
                    'source': 'wms-test-source',
                    'paint': {}
                    },
                    'aeroway-line'
                );
/*
console.log('*** ADD IMAGE SOURCE ***')
args.map.addSource('radar', {
'type': 'raster',
'tiles': ['https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif'],
'bounds': [
[-80.425, 46.437],
[71.516, 46.437],
[71.516, 7.936],
[-80.425, 7.936]
]
});
console.log('*** ADD IMAGE LAYER ***')
args.map.addLayer({
id: 'radar-layer',
'type': 'raster',
'source': 'radar',
'paint': {
'raster-fade-duration': 0
}
});
*/

/*
                args.map.addLayer([
                    {

                        id: "wmts-test-layer",
                        type: "raster",
                        source: {
                            type: "raster",
                            tiles: [
                            "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=layer_chirps-dekad_2.0_10d&FORMAT=image%2Fjpg&TRANSPARENT=true&date=20200921&time_to_nocache=1622704629174&"
                            ],
                            tileSize: 256,
                            attribution:
                            'Map tiles by <a target="_top" rel="noopener" href="http://www.swisstopo.admin.ch">swisstopo</a>'

                        }
            }]);
*/
            }
        }
    };


</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
</style>
