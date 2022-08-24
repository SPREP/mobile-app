<template>
    <Page class="page">
      <ActionBar class="action-bar">
        <NavigationButton visibility="hidden"/>
        <GridLayout columns="50, *">
          <Label class="title-bar" text="Climate Station" colSpan="2"/>
          <!-- <Label class="action-bar-title h2" text="Climate Station - Map" colSpan="2"/> -->
          <!-- <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/> -->
        </GridLayout>
      </ActionBar>

<StackLayout>
    <ContentView height="80%" width="100%">
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
    </ContentView>
    <ContentView height="15%" width="100%">
        <WrapLayout backgroundColor="#fcfcfc">
            <StackLayout height="50" width="80%" backgroundColor="#fcfcfc">
                <Label width="100%" :text="layerName" class="nomeLayer" @tap="onTap"/>
                <Label width="100%" :text="wdate" class="nomeLayer" @tap="onTap"/>
            </StackLayout>
            <Image :src="srcLegend"  background="white" width="20%" @tap="onLegendTap" stretch="fill" />
    </WrapLayout>
    </ContentView>
    <ContentView height="5%" width="100%">
      <WrapLayout backgroundColor="#000000">
        <Label text="Change Layer/Date" class="h3 text-center" width="50%" height="100%" backgroundColor="red" color="white"  @tap="onTap"/>

<Label text="Info" class="h3 text-center" width="50%" height="100%" backgroundColor="green" color="white"  @tap="goInfo"/>
<!---
        <Button  width="45%" class="h3 text-center" backgroundColor="blue" color="white" text="Show Map" @tap="onButtonTap" />
        <Button  width="40%" class="h3 text-center" backgroundColor="green" color="white" text="Info" @tap="goInfo" />
-->
      </WrapLayout>
    </ContentView>


  </StackLayout>

<!--
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
-->


    </Page>
</template>






<script>
  import { convertHSLToRGBColor } from "@nativescript/core/css/parser";
import * as utils from "~/shared/utils";
  import { SelectedPageService } from "../shared/selected-page-service";
  import Settings from "./Settings";
  import Legend from "./Legend";
  import About from "./About";

  const appSettings = require("@nativescript/core/application-settings");

     export default {
        data () {
            return { layerName:null, wdate:null, srcLegend: null};
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
            onTap() {
                this.$navigateTo(Settings, {
                clearHistory: true
                });
            },
            goInfo() {
                this.$navigateTo(About, {
                clearHistory: true
                });
            },
            onLegendTap() {
                this.$navigateTo(Legend, {
                clearHistory: true
                });
            },
            onMapReady(args) {
                console.log('*** ADD LAYER ***')
                
                const layer = appSettings.getString("layerName") 
                console.log("*** layer ***")
                if (typeof layer !== 'undefined') {
                    console.log(layer)        
                } else {
                    console.log("indefinito")
                    this.onNavigationItemTap(Settings)
                    return
                }

                const layerTitle = appSettings.getString("layerTitle") 
                console.log("*** layerTitle ***")
                if (typeof layerTitle !== 'undefined') {
                    console.log(layerTitle)        
                } else {
                    console.log("indefinito")
                    this.onNavigationItemTap(Settings)
                    return
                }
                this.layerName = layerTitle

                const source = appSettings.getString("sourceName") 
                const wDate = appSettings.getString("wDate") 
                const wd = wDate.replace(/-/g,"")
                console.log("*** wd ***")
                if (typeof wd !== 'undefined') {
                    console.log(wd)        
                } else {
                    console.log("indefinito")
                    this.onNavigationItemTap(Settings)
                    return
                }
                this.wdate = wDate
                // const linkTo = "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetMap&FORMAT=image%2Fjpg&LAYERS=" + layer + "&DATE=" + wd
                // const linkTo = "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetMap&SRS=EPSG:4326&BBOX=-173.537,35.8775,-11.9603,83.8009&width=736&height=814&FORMAT=image%2Fjpg&LAYERS=" + layer + "&DATE=" + wd

                // questo è ok
                let linkTo = "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetMap&width=736&height=814&FORMAT=image%2Fjpg&WIDTH=256&HEIGHT=256&bbox={bbox-epsg-3857}&CRS=EPSG:3857&LAYERS=" + layer + "&DATE=" + wd

                // Link fornito da Dario Simonetti con la projection corretta
                // const linkTo = 'https://ies-ows.jrc.ec.europa.eu/iforce/kwt/wms.py?service=WMS&request=GetMap&layers=Class20&styles=&format=image%2Fpng&transparent=true&version=1.1.1&width=256&height=256&srs=EPSG%3A3857&bbox=4070118.882129066,-78271.51696401955,4148390.3990930864,0'

                linkTo = 'https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=' + layer + '&FORMAT=image%2Fjpg&TRANSPARENT=true&date=' + wd + '&time_to_nocache=1622704629174&WIDTH=256&HEIGHT=256&bbox={bbox-epsg-3857}&CRS=EPSG:3857'

                // linkTo = 'https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=layer_chirps-dekad_2.0_10d&FORMAT=image%2Fjpg&TRANSPARENT=false&date=20200921&time_to_nocache=1622704629174&WIDTH=256&HEIGHT=256&bbox={bbox-epsg-3857}&CRS=EPSG:3857'

                console.log(linkTo)

                this.srcLegend = 'https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYERS=' + layer

                 args.map.setViewport(
                    {
                        bounds: {
                        north: 38.27,
                        east: 57.60,
                        south: -37.18,
                        west: -20.62
                        },
                        animated: true // default true
                    }
                )

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
                        linkTo],
//                        'https://ies-ows.jrc.ec.europa.eu/iforce/kwt/wms.py?service=WMS&request=GetMap&layers=Sentinel2020&srs=EPSG:3857&styles=&format=image/png&transparent=true&version=1.1.1&width=256&height=256&bbox={bbox-epsg-3857}'],
                        tileSize: 512    
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


            }
        }
    };


</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
    .action-bar {
      height: 30;
      padding: 0;
      margin: 0;
      background: white;
    }
    .title-bar {
        font-size: x-small;
        color: rgb(0, 0, 0);
        padding: 0;
        margin: 0;
    }

</style>
