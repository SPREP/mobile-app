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
      <WebView scalesPageToFit="true" displayZoomControls="true" :src="linkTo" width="791" height="500" @loadStarted="startLoad" @loadFinished="endLoad"/>
      <Label class="h4" :text="layer"/>
      <Label class="h4" :text="source"/>
      <Label class="h4" :text="wdate"/>
      <Label class="h3 red p-r-10" backgroundColor="red" color="white" :text="msg"/>

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

  const appSettings = require("@nativescript/core/application-settings");

  export default {
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Search");

      const layer = appSettings.getString("layerName") 
      const source = appSettings.getString("sourceName") 
      const wDate = appSettings.getString("wDate") 
      const wd = wDate.replace(/-/g,"")
      console.log(wd)
      this.linkTo = "https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetMap&width=736&height=814&FORMAT=image%2Fjpg&LAYERS=" + layer + "&DATE=" + wd
      console.log(this.linkTo)
      this.layer = layer
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
