<template>
    <Page class="page">
<!--
  <ActionBar class="action-bar">
    <NavigationButton visibility="hidden"/>
    <GridLayout columns="50, *">
        <Label class="title-bar" height="40" text="Climate Station" colSpan="2"/>
        <Label v-if="!showInfo" class="fas" text.decode="&#xf05a;" color="blue" @tap="showInfo = !showInfo"/>
        <Label v-else class="fas" text.decode="&#xf279;" color="blue" @tap="showInfo = !showInfo"/>
    </GridLayout>
  </ActionBar>
-->

<AbsoluteLayout backgroundColor="#3c495e">

    <ContentView v-if="showInfo" height="100%" width="100%" left="0" top="0" backgroundColor="white">
      <StackLayout>
            <Label class="h3 description-label text-center " text=" " height="30" backgroundColor="white" />
            <Image src="~/shared/logoAbout.png" />
            <Label class="h3 description-label text-center " text=" "  height="50" backgroundColor="white" />
            <Label class="h2 description-label text-center " text="Climate Station"  height="40" backgroundColor="white" />
            <Label class="h2 description-label text-center " text="Mobile App"  height="40" backgroundColor="white" />
            <Label class="h3 description-label text-center " text=" "  height="30" backgroundColor="white" />
            <Label class="h3 description-label text-center " text="The Joint Research Centre "  height="30" backgroundColor="white" />
            <Label class="h3 description-label text-center " text="of the" height="30" backgroundColor="white" />
            <Label class="h3 description-label text-center " text="European Commission" height="30" backgroundColor="white" />
            <Label class="h3 description-label text-center " text="" height="50" backgroundColor="white" />
            <Label class="h3 text-center " text="Close" height="30" width="200" color="white" backgroundColor="blue" @tap="showInfo=false" />
        </StackLayout>
    </ContentView>
    <Image v-if="showInfo" src="~/shared/footerAbout.png" stretch="aspectFit" :top="topLayersIcon-20" width="100%" height="130" left="0"/>

    <ContentView v-if="!showInfo" height="100%" width="100%" left="0" top="0">
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

<!--
    <Label width="100%" :text="layerName" left="0" top="600"   class="nomeLayer" @tap="onTap"/>
    <Label width="100%" :text="wdate" left="0" top="620"  class="nomeLayer" @tap="onTap"/>
-->

    <Label v-if="!showInfo" :text="titleApp" left="0" top="0" width="100%" height="30" color="white" class="h3 text-center" backgroundColor="rgba(64, 64, 64, .6)"/>  

    <Image src="~/shared/listIcon.png"  v-if="!showLayers && !showInfo && !showLegend" :left="15" :top="35" width="30" height="40"  @tap="showLegend=!showLegend" stretch="fill" />


<ScrollView orientation="vertical" v-if="!showPickDate && !showInfo && showLegend" :height="topLayersIcon-50" :width="leftLayersIcon-120"  left="10" top="35">
    <Image v-if="!showPickDate && !showInfo && showLegend" :src="srcLegend"  width="400" height="1500" @tap="onLegendTap" stretch="fill" />
</ScrollView>





    <Label v-if="!showPickDate  && !showInfo" :text="wdate" :left="leftLayersIcon-70" top="35" width="130" height="40"  class="text-center pick-date" @tap="showPickDate=!showPickDate" color="black" backgroundColor="#ffffff"/>

    <Image v-if="!showPickDate  && !showInfo" src="~/shared/pickdate.jpg"  :left="leftLayersIcon-100" :top="35" width="40" height="40" @tap="showPickDate=!showPickDate" stretch="fill" />


    <DatePicker v-if="showPickDate && !showInfo"  @tap="tapList" left="0" backgroundColor="rgba(255, 255, 255, .95)"  :top="30"  width="100%"  v-model="selectedDate" @dateChange="dateChanged" :minDate="minDate" :maxDate="maxDate"/>


    <ListPicker v-if="showLayers && !showInfo" @tap="tapList" left="0" backgroundColor="rgba(0, 0, 255, .6)" color="white" :top="topListPicker"  width="100%" :items="listOfItemsLayerTitle" :selectedIndex="selectedIndexLayer"
        @selectedIndexChange="selectedIndexLayerChanged"   />


<!--
    <Label :text="titleApp" left="0" top="150" width="100%" height="30" color="white" class="h3 text-center" backgroundColor="rgba(64, 64, 64, .6)"/>  
    <Label :text="wdate" left="0" top="180" width="100%" height="30" color="white" class="h3 text-center" backgroundColor="rgba(64, 64, 64, .6)"/>  
    <Label :text="selectedDate" left="0" top="210" width="100%" height="30" color="white" class="h3 text-center" backgroundColor="rgba(64, 64, 64, .6)"/>  
-->




<!-- <Label left="30" :top="topLayersIcon" class="fas h2" text.decode="&#xf05a;" color="rgba(25, 25, 200, .6)" width="50" @tap="showInfo = !showInfo"/> -->
    <Image src="~/shared/infoIcon.png" v-if="!showLayers && !showInfo" left="30" :top="topLayersIcon" color="rgba(25, 25, 200, .6)" width="40" @tap="showInfo = !showInfo"/>

    <Image src="~/shared/layers2.png"  v-if="!showLayers && !showInfo" :left="leftLayersIcon" :top="topLayersIcon" width="40" height="40" @tap="showLayers=!showLayers" stretch="fill" />

  <!--
  <Label text="10,10" left="10" top="10" width="100" height="100" backgroundColor="rgba(255, 165, 0, 0.1)"/>
  <Label text="30,40" left="30" top="40" width="100" height="100" backgroundColor="#43b883"/>
  -->
</AbsoluteLayout>


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
  // const platform = require("platform")
  import capabilities from  "~/shared/capabilities.json";

  import { screen } from '@nativescript/core/platform'

  const appSettings = require("@nativescript/core/application-settings");

     export default {
        data () {
            let layer = null;
            try {
                layer = appSettings.getNumber("layerIndex");
            } catch (error) {
                console.log(error)
            }
            console.log('*** DATA ***')
            console.log(layer)

            return {
                layerTitle: '',
                layerName: '',
                minDate: '',
                maxDate: '',
                layer: null,
                showLayers: false,
                showPickDate: false,
                showInfo: false,
                showLegend: false,
                args: null,
                dateValueChanged: false,
                listOfItemsLayerTitle: [],
                listOfItemsLayer: [],
                listOfItemsLayerExtent: [],
                selectedIndexLayer: layer,
                selectedDate:'2000-01-01',
                beforeMount: true,
                topLayersIcon:100,
                topListPicker:100,
                leftLayersIcon:100,
                titleApp: null,
                wdate:null, srcLegend: null};
        },
        watch: {
            showLayers(s) {
                if (s) {
                    this.showPickDate = true
                    this.showLegend = false
                    this.selectedIndexLayer = appSettings.getNumber("layerIndex");
                }
            }
            
        },
        mounted() {
            console.log('** MAPBOX MOUNTED ***')

            console.log('screen.mainScreen.widthDIPs')
            console.log(screen.mainScreen.widthDIPs)
            console.log('screen.mainScreen.widthPixels')
            console.log(screen.mainScreen.widthPixels)
            console.log('screen.mainScreen.heightDIPs')
            console.log(screen.mainScreen.heightDIPs)
            console.log('screen.mainScreen.heightPixels')
            console.log(screen.mainScreen.heightPixels)

            this.topLayersIcon = screen.mainScreen.heightDIPs - 140
            this.leftLayersIcon = screen.mainScreen.widthDIPs - 70
            this.topListPicker = screen.mainScreen.heightDIPs - 250

            let arr = capabilities.WMT_MS_Capabilities.Capability.Layer.Layer
            arr.sort((a, b) => (a.Title > b.Title ? 1 : b.Title > a.Title ? -1 : 0));
            for (let l of arr) {
                // console.log(l)
                // console.log(l.Title)
                this.listOfItemsLayer.push(l.Name)
                this.listOfItemsLayerTitle.push(l.Title) 
                this.listOfItemsLayerExtent.push(l.Extent) 
            }
            const layer = appSettings.getNumber("layerIndex");
            console.log(layer)
            console.log(appSettings.getString("layer2"))
            console.log("================")
            this.selectedIndex = layer

            const setData = appSettings.getString("wDate");
            console.log(setData)
            console.log("================")
            this.selectedDate = setData

            this.beforeMount = false

        },
        unmounted() {
            console.log('** MAPBOX UN-MOUNTED ***')
        },
        methods: {
            checkChg: function () {
                let chgLayer = false
                if (this.showLayers) {
                    this.showLayers = false
                    chgLayer = true
                }
                if(this.showPickDate) {
                    this.showPickDate = false
                    chgLayer = true
                }
                if(this.showLegend) {
                    this.showLegend = false
                    chgLayer = true
                }
                if (chgLayer) {
                    this.changeLayer()
                }
                return true;
            },
            tapList: function(e) {
                console.log('tap list')
                this.checkChg()
            },
            dateChanged: function (dc) {
                if (this.dateValueChanged) {
                    this.dateValueChanged = false
                    return
                }
                console.log("*** dateChanged ***")
                console.log(this.selectedDate)        
                const wDate = appSettings.getString("wDate") 
                console.log("*** wDate ***")
                console.log(wDate)        

                if (this.layerChanged) {
                    this.dateValueChanged = true
                    this.layerChanged = false
                    this.selectedDate = wDate
                    this.wdate = wDate
                    return
                }


                if (!this.beforeMount) {
                    // console.log(this.selectedDate)
                    const birthday = new Date(this.selectedDate);
                    const day = birthday.getDate()
                    const month = birthday.getMonth()+1
                    const year = birthday.getYear() + 1900
                    let strDate = year.toString() + '-' 
                    if (month < 10) {
                        strDate +=  '0'
                    }
                    strDate += month.toString() + '-'
                    if (day < 10) {
                        strDate +=  '0'
                    }
                    strDate += day.toString()
                    console.log("*** DATE CHANGED ***")
                    console.log(strDate)
                    appSettings.setString("wDate", strDate);
                    this.wdate = wDate
                }
            },

            changeLayer: function () {
                console.log('*** valori letti da preferenze ***')
                const layer = appSettings.getString("layerName") 
                console.log("*** layer ***")
                console.log(layer)                        
                const layerTitle = appSettings.getString("layerTitle") 
                console.log("*** layerTitle ***")
                console.log(layerTitle)        
                const wDate = appSettings.getString("wDate") 
                console.log("*** wDate ***")
                console.log(wDate)        
                const wd = wDate.replace(/-/g,"")

                this.minDate = appSettings.getString("minDate")
                this.maxDate = appSettings.getString("maxDate")

                if (typeof layerTitle !== 'undefined') {
                    console.log(layerTitle)        
                } else {
                    console.log("indefinito")
                    this.onNavigationItemTap(Settings)
                    return
                }

                let linkTo = 'https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=' + layer + '&FORMAT=image%2Fjpg&TRANSPARENT=false&date=' + wd + '&time_to_nocache=1622704629174&WIDTH=256&HEIGHT=256&bbox={bbox-epsg-3857}&CRS=EPSG:3857'
                this.args.map.removeLayer('wms-test-layer')
                this.args.map.removeSource('wms-test-source')
                this.args.map.addSource('wms-test-source', {
                    type: 'raster',
                    tiles : [
                        linkTo],
                        tileSize: 512    
                    })
                this.args.map.addLayer(
                    {
                    id: 'wms-test-layer',
                    type: 'raster',
                    source: 'wms-test-source',
                    paint: {'line-color': '#ff0000',
                        'raster-opacity': .4,
                        },
                    },
                    'aeroway-line'
                );
                this.srcLegend = 'https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYERS=' + layer
                console.log(linkTo)
                this.titleApp = layerTitle
                this.wdate = wDate
                this.selectedDate = wDate

                this.args.map.setCenter(
                    {
                        lat: 2.3681990625302096, // mandatory
                        lng: 18.20708537210865, // mandatory
                        animated: true // default true
                    }
                )
                this.args.map.setViewport(
                    {
                        bounds: {
                        north: 38.27,
                        east: 57.60,
                        south: -24.18,
                        west: -20.62
                        },
                        animated: true // default true
                    }
                )



            },
            selectedIndexLayerChanged: function (e) {
                console.log('*** valori letti da preferenze ***')
                const layer = appSettings.getString("layerName") 
                console.log("*** layer ***")
                console.log(layer)                        
                const layerTitle = appSettings.getString("layerTitle") 
                console.log("*** layerTitle ***")
                console.log(layerTitle)        
                const wDate = appSettings.getString("wDate") 
                console.log("*** wDate ***")
                console.log(wDate)        

                if (!this.beforeMount) {
                console.log("set appSettings layer")
                console.log(e.value)
                console.log(this.listOfItemsLayer[e.value])
                console.log(this.listOfItemsLayerTitle[e.value])

                let d = this.listOfItemsLayerExtent[e.value].split('/')
                this.minDate = d[0].substring(0,4) + '-' + d[0].substring(4,6) + '-' + d[0].substring(6,8)
                this.maxDate = d[1].substring(0,4) + '-' + d[1].substring(4,6) + '-' + d[1].substring(6,8)
                appSettings.setString("wDate", this.maxDate);

                appSettings.setString("minDate", this.minDate);
                appSettings.setString("maxDate", this.maxDate);

                this.layerChanged = true
                if (layer !== this.listOfItemsLayer[e.value]) {
                    appSettings.setNumber("layerIndex", e.value);
                    appSettings.setString("layerName", this.listOfItemsLayer[e.value]);
                    appSettings.setString("layerTitle", this.listOfItemsLayerTitle[e.value]);


                    this.titleApp = this.listOfItemsLayerTitle[e.value]

                    // appSettings.setString("layerMinDate", this.listOfItemsLayerTitle[e.value]);
                    console.log(this.listOfItemsLayerExtent[e.value])
                    this.layerTitle = this.listOfItemsLayerTitle[e.value]
                    this.layerName = this.listOfItemsLayer[e.value]
                    appSettings.setString("wDate", this.maxDate);
                    this.selectedDate = this.maxDate
                    // this.changeLayer()                    
                } else {
                    console.log('*** Stesso layer ***')
                    console.log('*** Imposto data  ***')
                    console.log(wDate)
                    appSettings.setString("wDate", wDate);
                    this.selectedDate = wDate
                }
                }
            },
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
                this.args = args
                 args.map.setViewport(
                    {
                        bounds: {
                        north: 38.27,
                        east: 57.60,
                        south: -24.18,
                        west: -20.62
                        },
                        animated: true // default true
                    }
                )
                args.map.setOnMapClickListener( point => {
                    console.log(`>> Map clicked: ${JSON.stringify(point)}`);
                    let chgLayer = false
                    if (this.showLayers) {
                        this.showLayers = false
                        chgLayer = true
                    }
                    if(this.showPickDate) {
                        this.showPickDate = false
                        chgLayer = true
                    }
                    if(this.showLegend) {
                        this.showLegend = false
                        chgLayer = true
                    }
                    if (chgLayer) {
                        this.changeLayer()
                    }
                    return true;
                });

                args.map.setOnMapLongClickListener( point => {
                    console.log(`>> Map longpressed: ${JSON.stringify(point)}`);
                    return true;
                });


                args.map.setOnFlingListener(() => {
                    console.log(`>> Map flinged"`);
                }).catch( err => console.log(err) );

                this.changeLayer()

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
      height: 50;
      padding: 0;
      margin: 0;
      color: white;
      background: rgb(255, 255, 255);
    }
    .title-bar {
        font-size: 20px;
        font-weight: 700;
        color: rgb(9, 24, 1);
        padding: 0;
        margin: 0;
    }
    .pick-date {
        font-weight: 700;
        font-size: x-large;
        padding-top:7;
    }

</style>
