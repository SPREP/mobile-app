<template>
    <Page class="page">
      <ActionBar class="action-bar">
        <NavigationButton visibility="hidden"/>
        <GridLayout columns="50, *">
          <Label class="action-bar-title h2" text="Settings" colSpan="2"/>

          <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/>
        </GridLayout>
      </ActionBar>

    <ScrollView marginTop="-100">
        <StackLayout orientation="vertical" top="10" width="300" height="520"
            backgroundColor="#fcfcfc">
            <!--
            <Label text="Choose source" class="h3 text-center" width="300" height="40"  paddingTop="5" marginTop="1"
                backgroundColor="yellow" />
            -->
            <Label text="Choose layer" class="h3 text-center"  width="300" height="40"  paddingTop="5" marginTop="0"
                backgroundColor="orange" />
            <ListPicker height="120"  :items="listOfItemsLayerTitle" :selectedIndex="selectedIndexLayer"
              @selectedIndexChange="selectedIndexLayerChanged"   />
              <Label class="h4 text-center" :text="layerName"/>
              <!--
              <Label class="h4" :text="maxDate"/>
              -->
              <Label text="Select date" class="h3 text-center"  width="300" height="40"  paddingTop="5" marginTop="30"
                backgroundColor="orange" />
              <DatePicker v-model="selectedDate" @dateChange="dateChanged" :minDate="minDate" :maxDate="maxDate"/>

            <Button marginTop="0" height="50" class="h3 text-center" backgroundColor="blue" color="white" text="Show Map" @tap="onButtonTap" />
        </StackLayout>
    </ScrollView>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import { SelectedPageService } from "../shared/selected-page-service";
  import capabilities from  "~/shared/capabilities.json";
  import MapBox from "./MapBox";

  const appSettings = require("@nativescript/core/application-settings");

  export default {
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Settings");
      console.log("*** SETTINGS ***")
      // console.log(capabilities.WMT_MS_Capabilities.Capability.Layer.Layer)
      let arr = capabilities.WMT_MS_Capabilities.Capability.Layer.Layer
      arr.sort((a, b) => (a.Title > b.Title ? 1 : b.Title > a.Title ? -1 : 0));
      for (let l of arr) {
        console.log(l.Title)
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
    computed: {
      message() {
        return "<!-- MAIN VIEW -->";
      }
    },
    data() {
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
        listOfItemsLayerTitle: [],
        listOfItemsLayer: [],
        listOfItemsLayerExtent: [],
        selectedIndexLayer: layer,
        selectedDate:'2000-01-01',
        beforeMount: true
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
        this.onNavigationItemTap(MapBox)
      },
      dateChanged: function (dc) {
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
        }
      },

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
          this.layerName = this.listOfItemsLayer[e.value]
          let d = this.listOfItemsLayerExtent[e.value].split('/')
          this.minDate = d[0].substring(0,4) + '-' + d[0].substring(4,6) + '-' + d[0].substring(6,8)
          this.maxDate = d[1].substring(0,4) + '-' + d[1].substring(4,6) + '-' + d[1].substring(6,8)
          appSettings.setString("wDate", this.minDate);
          this.selectedDate = this.minDate
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
