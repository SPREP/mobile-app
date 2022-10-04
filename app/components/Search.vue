<template>
    <Page class="page">
      <ActionBar class="action-bar">
        <NavigationButton visibility="hidden"/>
        <GridLayout columns="50, *">
          <Label class="action-bar-title h2" text="Map" colSpan="2"/>

          <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/>
        </GridLayout>
      </ActionBar>

    <FlexboxLayout flexDirection="column">
<!--      <WebView src="https://www.yahoo.com/" /> -->
      <WebView scalesPageToFit="true" displayZoomControls="true" :src="linkTo" width="791" height="400" @loadStarted="startLoad" @loadFinished="endLoad"/>
      <Label class="h4 text-center" :text="layerTitle"/>
      <Label class="h4 text-center" :text="layer"/> 
      <Label class="h4 text-center" :text="wdate"/>
      <Label class="h3 text-center" backgroundColor="#fcfcfc" color="red" :text="msg"/>
      <Button marginTop="0" height="40" class="h3 text-center" backgroundColor="blue" color="white" text="Change settings" @tap="onButtonTap" />

    </FlexboxLayout>

<!--
    <ScrollView marginTop="-100">
        <StackLayout orientation="vertical" top="10" width="350" height="500">

            <WebView scalesPageToFit="true" displayZoomControls="true" :src="linkTo" width="791" height="500" @loadStarted="startLoad" @loadFinished="endLoad"/>
          </StackLayout>
      </ScrollView>
-->
      <!--
      <ActivityIndicator busy="wait" @busyChange="onBusyChanged" />
      -->
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import { SelectedPageService } from "../shared/selected-page-service";
  import Main from "./Main";

  const appSettings = require("@nativescript/core/application-settings");

  export default {
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Search");

      /*
      const test = appSettings.getString("test") 
      console.log("*** test ***")
      console.log(test)
      if (typeof test !== 'undefined') {
        console.log(test)        
      } else {
        console.log("indefinito")
        this.onNavigationItemTap(Main)
        return
      }
      */
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

      this.linkTo = "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetMap&width=736&height=814&FORMAT=image%2Fjpg&LAYERS=" + layer + "&DATE=" + wd
      // this.linkTo = "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetMap&FORMAT=image%2Fsvg%2Bxml&LAYERS=" + layer + "&DATE=" + wd

      console.log(this.linkTo)
      this.layer = layer
      this.layerTitle = layerTitle
      this.source = source
      this.wdate = wDate
      console.log(layer)
      console.log(source)
      console.log(wDate)
      this.wait = true
      this.msg = 'Loading map...'
    },
    data () {
      return {
        layer:'',
        layerTitle: '',
        source:'',
        wdate: '',
        msg: '',
        wait: false,
        linkTo: "https://google.com"
      }
    },
    computed: {
      message() {
        return "<!-- Page content goes here -->";
      }
    },
    methods: {
      onNavigationItemTap(component) {
        this.$navigateTo(component, {
          clearHistory: true
        });
        utils.closeDrawer();
      },
      onButtonTap: function () {
        console.log('ok')
        this.onNavigationItemTap(Main)
      },
      onBusyChanged: function () {
        console.log('busy changed')
      },
      startLoad: function () {
        console.log('start')
      },
      endLoad: function () {
        console.log('end')
        this.msg = 'Map available'
        this.wait = false
      },
      onDrawerButtonTap() {
        utils.showDrawer();
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
