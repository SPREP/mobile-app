<template>
    <Page class="page">
      <ActionBar class="action-bar">
        <NavigationButton visibility="hidden"/>
        <GridLayout columns="50, *">
          <Label class="action-bar-title h2" text="Settings" colSpan="2"/>

          <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/>
        </GridLayout>
      </ActionBar>


    <ScrollView marginTop="-10">
        <StackLayout orientation="vertical" top="10" width="300" height="510"
            backgroundColor="#fcfcfc">
            <Label text="Choose source" class="h3 text-center" width="300" height="40"  paddingTop="5" marginTop="1"
                backgroundColor="yellow" />
            <ListPicker height="120"  :items="listOfItemsSource" :selectedIndex="selectedIndexSource"
          @selectedIndexChange="selectedIndexSourceChanged"   />

            <Label text="Choose layer" class="h3 text-center"  width="300" height="40"  paddingTop="5" marginTop="40"
                backgroundColor="orange" />
            <ListPicker height="120"  :items="listOfItemsLayer" :selectedIndex="selectedIndexLayer"
              @selectedIndexChange="selectedIndexLayerChanged"   />
            <!--
            <Button marginTop="30" height="60" class="h2 text-center" backgroundColor="blue" color="white" text="Confirm" tap="onButtonTap" />
            -->
        </StackLayout>
    </ScrollView>


    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import { SelectedPageService } from "../shared/selected-page-service";

  const appSettings = require("@nativescript/core/application-settings");


  export default {
    mounted() {
      console.log("*** MOUNTED ***")
      SelectedPageService.getInstance().updateSelectedPage("Settings");
      const layer = appSettings.getNumber("layerIndex");
      console.log(layer)
      console.log(appSettings.getString("layer"))
      console.log("================")
      this.selectedIndex = layer
      this.beforeMount = false
    },
    computed: {
      message() {
        return "";
      }
    },
    watch: {
      selectedIndex: function (i) {
        console.log(i)
      }
    },
    data() {
      const layer = appSettings.getNumber("layerIndex");
      const source = appSettings.getNumber("sourceIndex");
      console.log('*** DATA ***')
      console.log(layer)
      return {
        listOfItemsSource: ['Source #1', 'Source #2', 'Source #3', 'Source #4', 'Source #5'],
        listOfItemsLayer: ['layer_chirps-dekad_2.0_10d', 'layer_modis-fapar_1.0_10dmax', 'layer_modis-fapar_1.0_10dstd', 'layer_vgt-fapar_V2.0_1monratio', 'layer_vgt-lai_V2.0_1monmin'],
        selectedIndexSource: source,
        selectedIndexLayer: layer,
        beforeMount: true
      }
    },
    methods: {
      selectedIndexLayerChanged: function (e) {
        if (!this.beforeMount) {
          console.log("set appSettings layer")
          console.log(e.value)
          appSettings.setNumber("layerIndex", e.value);
          appSettings.setString("layerName", this.listOfItemsLayer[e.value]);
        }
      },
      selectedIndexSourceChanged: function (e) {
        if (!this.beforeMount) {
          console.log("set appSettings source")
          console.log(e.value)
          appSettings.setNumber("sourceIndex", e.value);
          appSettings.setString("sourceName", this.listOfItemsSource[e.value]);
        }
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
