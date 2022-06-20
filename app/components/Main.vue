<template>
    <Page class="page">
      <ActionBar class="action-bar">
        <NavigationButton visibility="hidden"/>
        <GridLayout columns="50, *">
          <Label class="action-bar-title h2" text="Main view" colSpan="2"/>

          <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/>
        </GridLayout>
      </ActionBar>

    <ScrollView marginTop="-100">
        <StackLayout orientation="vertical" top="10" width="300" height="510"
            backgroundColor="#fcfcfc">
            <!--
            <Label text="Choose source" class="h3 text-center" width="300" height="40"  paddingTop="5" marginTop="1"
                backgroundColor="yellow" />
            -->
            <Label text="Choose layer" class="h3 text-center"  width="300" height="40"  paddingTop="5" marginTop="0"
                backgroundColor="orange" />
            <ListPicker height="120"  :items="listOfItemsLayerTitle" :selectedIndex="selectedIndexLayer"
              @selectedIndexChange="selectedIndexLayerChanged"   />
              <Label class="h4" :text="layerTitle"/>
              <Label class="h4" :text="minDate"/>
              <Label class="h4" :text="maxDate"/>

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
  import capabilities from  "~/shared/capabilities.json";
  const appSettings = require("@nativescript/core/application-settings");

  export default {
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Main");
      console.log("*** MAIN ***")
      // console.log(capabilities.WMT_MS_Capabilities.Capability.Layer.Layer)
      let arr = capabilities.WMT_MS_Capabilities.Capability.Layer.Layer
      arr.sort((a, b) => (a.Title > b.Title ? 1 : b.Title > a.Title ? -1 : 0));
      for (let l of arr) {
        console.log(l.Title)
        this.listOfItemsLayer.push(l.Name)
        this.listOfItemsLayerTitle.push(l.Title) 
        this.listOfItemsLayerExtent.push(l.Extent) 
      }
      const layer = appSettings.getNumber("layerIndex2");
      console.log(layer)
      console.log(appSettings.getString("layer2"))
      console.log("================")
      this.selectedIndex = layer
      this.beforeMount = false

    },
    computed: {
      message() {
        return "<!-- MAIN VIEW -->";
      }
    },
    data() {
      let layer = null;
      try {
        layer = appSettings.getNumber("layerIndex2");
      } catch (error) {
        console.log(error)
      }
      console.log('*** DATA ***')
      console.log(layer)
      return {
        layerTitle: '',
        minDate: '',
        maxDate: '',
        listOfItemsLayerTitle: [],
        listOfItemsLayer: [],
        listOfItemsLayerExtent: [],
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
          appSettings.setString("layerTitle", this.listOfItemsLayerTitle[e.value]);
          // appSettings.setString("layerMinDate", this.listOfItemsLayerTitle[e.value]);
          console.log(this.listOfItemsLayerExtent[e.value])
          this.layerTitle = this.listOfItemsLayerTitle[e.value]

          let d = this.listOfItemsLayerExtent[e.value].split('-')
          this.minDate = d[0]
          this.maxDate = d[1]

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
