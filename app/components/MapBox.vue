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

    <ContentView v-if="showInfo" height="100%" width="100%" left="0" top="0" backgroundColor="rgba(255, 255, 255, .85)">
      <StackLayout>
            <!-- <Label class="h3 description-label text-center " text=" " height="30"  /> -->
            <Image src="~/shared/logoAbout.png" />
            <Label class="h3 description-label text-center " text=" "  height="50"  />
            <Label class="h2 description-label text-center " text="Climate Station"  height="40"  />
            <Label class="h2 description-label text-center " text="Mobile App"  height="40"  />
            <Label class="h3 description-label text-center " text=" "  height="30"  />
            <Label class="h3 description-label text-center " text="The Joint Research Centre "  height="30"  />
            <Label class="h3 description-label text-center " text="of the" height="30"  />
            <Label class="h3 description-label text-center " text="European Commission" height="50"  />
            <Label class="h5 description-label text-center " text="(ver. 0.1.02 02/09/2022)" height="30"  />
            <Label class="h3 description-label text-center " text="" height="50"  />
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
                    disableRotation="true"
                    disableScroll="false"
                    disableTilt="true"
                    @mapReady="onMapReady($event)">
                </Mapbox>
    </ContentView>

    <Label v-if="!showInfo" :text="categoryName.toUpperCase()" left="0" top="0" width="100%" height="30" color="rgb(113,250,35)" class="h3 text-center" backgroundColor="rgba(0, 0, 0, 1)"/>  
    <Label v-if="!showInfo" :text="titleApp" left="0" top="30" width="100%" height="30" color="rgb(220,157,251)" class="h3 text-center" backgroundColor="rgba(0, 0, 0, .8)"/>  
    <Label v-if="!showInfo" :text="selectedDate" left="0" top="60" width="100%" height="30" color="rgb(252,254,123)" class="h3 text-center" backgroundColor="rgba(0, 0, 0, .8)"/>  

    <Image src="~/shared/listIcon.png"  v-if="!showLayers && !showInfo && !showLegend && false" :left="15" :top="65" width="30" height="40"  @tap="showLegendView" stretch="fill" />


<ScrollView orientation="vertical" v-if="!showPickDate && !showInfo && false" :height="topLayersIcon-250" :width="leftLayersIcon-180"  left="10" top="35">
<!--    <Image v-if="!showPickDate && !showInfo && showLegend" :src="srcLegend"  width="400" height="1500" @tap="onLegendTap" stretch="fill" /> -->
<!--
    <HtmlView :html="htmlLegend" />
-->
    <WebView :src="htmlLegend" />    
</ScrollView>

<!-- <WebView :src="htmlLegend" left="10" top="65" :height="topLayersIcon-400" :width="leftLayersIcon-220" />    -->
<WebView :src="htmlLegend" left="10" top="95" :height="250" :width="100" />    


    <Label v-if="!showPickDate  && !showInfo" :text="wdate" :left="leftLayersIcon-70" top="95" width="130" height="40"  class="text-center pick-date" @tap="showPickDateSelection" color="black" backgroundColor="rgba(200, 200, 200, .6)"/>
    <Label v-if="!showPickDate  && !showInfo" text="" :left="leftLayersIcon-100" :top="95" width="40" height="40"  @tap="showPickDateSelection" color="black" backgroundColor="rgba(200, 200, 200, .6)"/>
    <Image v-if="!showPickDate  && !showInfo" src="~/shared/pickdateIcon.png"  :left="leftLayersIcon-95" :top="97" width="35" height="35" @tap="showPickDateSelection" stretch="fill" />


    <DatePicker v-if="showPickDate && !showInfo && false"  @tap="tapList" left="0" backgroundColor="rgba(255, 255, 255, .95)"  :top="topListPicker"  width="100%"  v-model="selectedDate" @dateChange="dateChanged" :minDate="minDate" :maxDate="maxDate"/>


    <ListPicker v-if="showLayers && !showInfo"  @tap="tapList" left="0" backgroundColor="rgba(41, 92, 40, .99)" color="white" :top="90"  width="100%" :items="categories" :selectedIndex="selectedIndexCategory"
        @selectedIndexChange="selectedIndexCategoryChanged"   />


    <ListPicker v-if="showLayers && !showInfo" @tap="tapList" left="0" backgroundColor="rgba(0, 0, 255, .99)" color="white" :top="270"  width="100%" :items="listOfItemsLayerTitle" :selectedIndex="selectedIndexLayer"
        @selectedIndexChange="selectedIndexLayerChanged"   />

        <ListPicker v-if="showLayers && !showInfo" @tap="tapList" left="0" backgroundColor="rgba(0, 0, 0, .99)" color="white" :top="450"  width="100%" :items="listAvailableDates" :selectedIndex="selectedIndexDate"
        @selectedIndexChange="selectedIndexDateChanged"   />


<!--
    <Label :text="connectionType" :left="leftLayersIcon/2-50" :top="topLayersIcon" width="100" height="40"  class="text-center"  color="black" backgroundColor="rgba(200, 200, 200, .6)"/>
-->
    <Image src="~/shared/infoIcon.png" v-if="!showLayers && !showInfo" left="30" :top="topLayersIcon" color="rgba(25, 25, 200, .6)" width="40" @tap="showInfo = !showInfo"/>

    <Image src="~/shared/layers2.png"  v-if="!showLayers && !showInfo" :left="leftLayersIcon" :top="topLayersIcon" width="40" height="40" @tap="showLayersChoice" stretch="fill" />

</AbsoluteLayout>


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
  import { Connectivity } from '@nativescript/core'

  import { screen } from '@nativescript/core/platform'

  import { Http, HttpResponse } from '@nativescript/core'




  const appSettings = require("@nativescript/core/application-settings");

     export default {
        props: { collections: Object,  categories: Array},
        data () {
            let layer = null
            let category = null
            try {
                layer = appSettings.getNumber("layerIndex");
            } catch (error) {
                console.log(error)
            }
            console.log('*** layer index ***')
            console.log(layer)

            category = 0
            try {
                category = appSettings.getNumber("categoryIndex");
            } catch (error) {
                console.log(error)
            }
            console.log('*** category index ***')
            console.log(category)


            let catName = appSettings.getString("categoryName");



            return {
                layerTitle: '',
                layerName: '',
                categoryName: catName,
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
                listAvailableDates: [],
                selectedIndexLayer: layer,
                selectedIndexCategory: category,
                selectedDate:'2000-01-01',

                beforeMount: true,
                topLayersIcon:100,
                topListPicker:100,
                leftLayersIcon:100,
                titleApp: null,
                connectionType: '',
                selectedIndexDate: null,
                htmlLegend: '',
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
            let self = this

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

            /*
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

            Http.request({
                url: 'https://estation.jrc.ec.europa.eu/eStation2/mobile-app/legend-html?product_id=layer_modis-fapar_1.0_10dmax',
                method: 'GET'
            }).then(
                (response) => {
                    // Argument (response) is HttpResponse
                    // console.log(`Response Status Code: ${response.statusCode}`)
                    // console.log(`Response Headers:`, response.headers)
                    // console.log(`Response Content: ${response.content}`)
                    let htmlLegendObj = JSON.parse(`${response.content}`)
                    console.log(htmlLegendObj.html.legendHTMLVertical)
                    self.htmlLegend = htmlLegendObj.html.legendHTMLVertical
            },
            e => {}
            )
            */

            this.beforeMount = false

        },
        unmounted() {
            console.log('** MAPBOX UN-MOUNTED ***')
        },
        methods: {
            showPickDateSelection: function () {
                if (this.checkConnection()) {
                    this.showPickDate = !this.showPickDate
                }
            },
            showLegendView: function () {
                if (this.checkConnection()) {
                    this.showLegend = !this.showLegend
                }
            },
            showLayersChoice: function () {
                if (this.checkConnection()) {
                    this.showLayers=!this.showLayers
                }
            },
            checkConnection: function () {
                console.log('** CHECK CONNECTION  ***')
                const type = Connectivity.getConnectionType()
                console.log(type)
                switch (type) {
                    case Connectivity.connectionType.none:
                    this.connectionType = 'NO CONNECTION!!!' 
                    console.log('No connection')
                    alert({
                        title: "NO INTERNET CONNECTION!",
                        message: "This App requires Internet connectivity. Check your device and retry.",
                        okButtonText: "Close"
                        }).then(() => {
                        console.log("Alert dialog closed");
                        });
                    return false
                    break
                    case Connectivity.connectionType.wifi:
                    this.connectionType = 'WIFI' 
                    console.log('WiFi connection')
                    break
                    case Connectivity.connectionType.vpn:
                    this.connectionType = 'VPN' 
                    console.log('VPN connection')
                    break
                    case Connectivity.connectionType.mobile:
                    console.log('Mobile connection')
                    this.connectionType = 'MOBILE' 
                    break
                    case Connectivity.connectionType.ethernet:
                    console.log('Ethernet connection')
                    this.connectionType = 'ETHERNET' 
                    break
                    case Connectivity.connectionType.bluetooth:
                    console.log('Bluetooth connection')
                    this.connectionType = 'BLUETOOTH' 
                    break
                    default:
                    break
                }
                return true
            },
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
                    if (this.checkConnection()) {
                        this.changeLayer()
                    }
                }
                return true;
            },
            tapList: function(e) {
                console.log('tap list')
                this.checkChg()
            },
            dateChanged: function (dc) {
                /*
                console.log("*** dateChanged ***")
                console.log(this.selectedDate)        
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
                */
            },

            changeLayer: function () {
                let self = this
                /*
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
                */

                // let urlToGo = appSettings.getString("wms_url") + '&WIDTH=256&HEIGHT=256&bbox={bbox-epsg-3857}&CRS=EPSG:3857'
                let urlToGo = appSettings.getString("wms_url") + '&WIDTH=256&HEIGHT=256'
                let layer = appSettings.getString("product_id")
                let wdate = appSettings.getString("wdate");

                // console.log(urlToGo)
                // this.minDate = appSettings.getString("minDate")
                // appSettings.setString("wms_url", objLayer.wms_getmap_url);
                let linkTo = 'https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=' + layer + '&date=' + wdate +'&FORMAT=image%2Fjpg&TRANSPARENT=false&time_to_nocache=1622704629174&WIDTH=256&HEIGHT=256&bbox={bbox-epsg-3857}&CRS=EPSG:3857'
                // let linkTo = urlToGo
                console.log(urlToGo)
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
                )


                let legendUrl = appSettings.getString("legend_url")
                console.log("*** legend URL ***")
                console.log(legendUrl)

                Http.request({
                    // url: 'https://estation.jrc.ec.europa.eu/eStation2/mobile-app/legend-html?product_id=layer_modis-fapar_1.0_10dmax',
                    url: legendUrl,
                    method: 'GET'
                }).then(
                    (response) => {
                        // Argument (response) is HttpResponse
                        // console.log(`Response Status Code: ${response.statusCode}`)
                        // console.log(`Response Headers:`, response.headers)
                        // console.log(`Response Content: ${response.content}`)
                        let htmlLegendObj = JSON.parse(`${response.content}`)
                        let htmlCode = htmlLegendObj.html.legendHTMLVertical
                        htmlCode = htmlCode.replace(/white/gi, 'transparent')
                        htmlCode = htmlCode.replace(/font-size:15px/gi, 'font-size:12px')
                        htmlCode = htmlCode.replace(/font-size:12px/gi, 'font-size:10px')
                        htmlCode = htmlCode.replace(/line-height:12px/gi, 'line-height:10px')
                        htmlCode = htmlCode.replace(/height:12px/gi, 'height:10px')
                        
                        self.htmlLegend = '<style> span {font-size:10px;} td {font-size:10px;} </style>' + htmlCode
                        console.log(self.htmlLegend)

                },
                e => {}
                )

                let layerTitle = appSettings.getString("descriptive_name")
                this.titleApp = layerTitle


                // this.srcLegend = 'https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYERS=' + layer
                // console.log(linkTo)
                // this.titleApp = layerTitle
                // this.wdate = wDate
                // this.selectedDate = wDate

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
            selectedIndexDateChanged: function (e) {
                console.log('*** date changed ***') 
                console.log(e.value)
                appSettings.setNumber("dateIndex", e.value);
                console.log(this.listAvailableDates[e.value])
                appSettings.setString("wdate", this.listAvailableDates[e.value]);
                this.selectedDate = this.listAvailableDates[e.value]

            },
            selectedIndexCategoryChanged: function (e) {
                console.log('*** categoy changed ***')
                console.log(e.value)
                // console.log(this.selectedIndexCategory)
                appSettings.setNumber("categoryIndex", e.value);
                this.selectedIndexCategory = e.value
                let cat = this.categories[e.value]
                // this.categoryName = this.categories[e.value].toUpperCase()
                this.categoryName = this.categories[e.value]
                appSettings.setString("categoryName", this.categoryName);

                let arr = this.collections[cat]

                this.listOfItemsLayer = []
                this.listOfItemsLayerTitle = [] 
                this.listOfItemsLayerExtent = [] 

                for (let l of arr) {
                    // console.log(l)
                    // console.log(l.Title)
                    this.listOfItemsLayer.push(l.descriptive_name)
                    this.listOfItemsLayerTitle.push(l.descriptive_name) 
                    this.listOfItemsLayerExtent.push(l.descriptive_name) 
                }


            },

            selectedIndexLayerChanged: function (e) {
                /*
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
                */
                let self = this
                console.log(e.value)
                console.log(this.collections[this.categoryName][e.value])
                let objLayer = this.collections[this.categoryName][e.value]
                appSettings.setString("wms_url", objLayer.wms_getmap_url);
                appSettings.setString("legend_url", objLayer.legend_url);
                appSettings.setString("product_id", objLayer.product_id)
                appSettings.setString("descriptive_name", objLayer.descriptive_name)
                appSettings.setNumber("layerIndex", e.value);


                let layerTitle = appSettings.getString("descriptive_name")
                this.titleApp = layerTitle


                let urlInfo = 'https://estation.jrc.ec.europa.eu/eStation2/mobile-app/describeLayer?product_id=' + objLayer.product_id

                Http.request({
                    url: urlInfo,
                    method: 'GET'
                }).then(
                    (response) => {
                        let strTmp =  `${response.content}`
                        /*
                        strTmp = strTmp.replace(/\"\[/,'[')
                        strTmp = strTmp.replace(/\]\"/,']')
                        */
                        console.log(strTmp)
                        console.log('^^^^^^')
                        let infoObj = JSON.parse(strTmp)
                        console.log('????')
                        console.log(infoObj.product.dates)
                        strTmp = infoObj.product.dates
                        strTmp = strTmp.replace(/\'/g,'\"')
                        console.log(strTmp)
                        self.listAvailableDates = JSON.parse(strTmp)
                        /*
                        let arrTmp = []
                        for (let d of infoObj.product.dates) {
                            console.log(d)
                            arrTmp.push(d)
                        }
                        self.listAvailableDates = arrTmp
                        */
                },
                e => {}
                )



/*
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
*/

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
                        if (this.checkConnection()) {
                            this.changeLayer()
                        }
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
