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
                    mapStyle="traffic_day"
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
  import * as utils from "~/shared/utils";
  import { SelectedPageService } from "../shared/selected-page-service";

  const appSettings = require("@nativescript/core/application-settings");

     export default {
        data () {
            return { };
        },
        methods: {
            onMapReady(args) {
                console.log('*** ADD LAYER ***')
                /*
                args.map.addMarkers([
                    {
                        lat: 37.7397,
                        lng: -121.4252,
                        title: "Tracy, CA",
                        subtitle: "Home of The Polyglot Developer!",
                        onCalloutTap: () => {
                            utils.openUrl("https://www.thepolyglotdeveloper.com");
                        }
                    }
                ]);
                */

                args.map.addSource( 'wms-test-source', {
                    type: "raster",
                    tiles: [
                        "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetMap&FORMAT=image%2Fjpg&LAYERS=layer_chirps-dekad_2.0_10d&DATE=20200111"
                        // "https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015"
                        // "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=layer_chirps-dekad_2.0_10d&FORMAT=image%2Fjpg&TRANSPARENT=true&date=20200921&time_to_nocache=1622704629174&WIDTH=256&HEIGHT=256&CRS=EPSG%3A4326&STYLES=&BBOX=-45%2C45%2C-22.5%2C67.5"
                        // "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&srs=EPSG:3857&LAYERS=layer_chirps-dekad_2.0_10d&FORMAT=image%2Fpng&TRANSPARENT=true&width=256&height=256&date=20200921&time_to_nocache=1622704629174&"
                        // "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetMap&FORMAT=image%2Fjpg&TRANSPARENT=true&LAYERS=layer_modis-sst_v2013.1_monanom"
                        // "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WCS&REQUEST=GetCoverage&FORMAT=GTiff&COVERAGE=layer_modis-sst_v2013.1_monanom"

                    ],
                    tileSize: 256,
               } );
                args.map.addLayer( {
                    'id': 'wms-test-layer',
                    'type': 'raster',
                    'source': 'wms-test-source',
                    'paint': {
                        'line-color': '#ed6498',
                        'line-width': .5,
                        'line-opacity': .3
                        }
                    },
                    'aeroway-line'
                );

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
