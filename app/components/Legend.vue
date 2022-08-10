<template>
    <Page class="page">
      <ActionBar class="action-bar">
        <NavigationButton visibility="hidden"/>
        <GridLayout columns="50, *">
          <Label class="action-bar-title h2" text="Legend" colSpan="2"/>

          <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/>

          
        </GridLayout>
      </ActionBar>

<StackLayout>
    <ContentView height="90%" width="50%">

        <Image :src="srcLegend"  background="white" width="100%" @tap="onLegendTap" stretch="fill" />

   </ContentView>
    <FlexboxLayout height="50" >
      <Button marginTop="0" height="50" width="100%" class="h3 text-center" backgroundColor="blue" color="white" text="Close" @tap="onButtonTap" />
    </FlexboxLayout>
<!--    <Image src="https://art.nativescript-vue.org/NativeScript-Vue-White-Green.png" stretch="none" /> -->
  </StackLayout>



    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import { SelectedPageService } from "../shared/selected-page-service";
  import Settings from "./Settings";
  import MapBox from "./MapBox";
  const appSettings = require("@nativescript/core/application-settings");

  export default {
    data () {
        return { layerName:null,
        srcLegend: null};
    },
    mounted() {
      // SelectedPageService.getInstance().updateSelectedPage("About");
      console.log('*** Legend ***')
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
                this.srcLegend = 'https://estation.jrc.ec.europa.eu/eStation2/webservices?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYERS=' + layer

    },
    computed: {
      message() {
        return "<!-- Page content goes here -->";
      }
    },
    methods: {
      onNavigationItemTap(component) {
        utils.closeDrawer();
      },
      onButtonTap: function () {
        this.$navigateTo(MapBox, {
          clearHistory: true
        });
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
