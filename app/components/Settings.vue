<template>
    <Page class="page">
      <ActionBar class="action-bar">
        <NavigationButton visibility="hidden"/>
        <GridLayout columns="50, *">
          <Label class="action-bar-title h2" text="Climate Station - Settings" colSpan="2"/>

          <!--<Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/> -->
        </GridLayout>
      </ActionBar>
<StackLayout>
    <ContentView height="45%" width="100%" backgroundColor="#c7f9cc">
        <StackLayout>
          <Label text="Choose layer" class="h2 text-center"   paddingTop="5" marginTop="50"
                backgroundColor="#c7f9cc" />
          <ListPicker height="120"  :items="listOfItemsLayerTitle" :selectedIndex="selectedIndexLayer"
              @selectedIndexChange="selectedIndexLayerChanged"   />
              <Label class="h4 text-center" :text="layerName"/>
      </StackLayout>
    </ContentView>
    <ContentView height="50%" width="100%" backgroundColor="#ffd670">
        <StackLayout>
              <Label text="Select date" class="h2 text-center"   paddingTop="5" marginTop="30"
                backgroundColor="#ffd670" />
              <DatePicker v-model="selectedDate" @dateChange="dateChanged" :minDate="minDate" :maxDate="maxDate"/>
      </StackLayout>
    </ContentView>
    <ContentView height="5%" width="100%">
      <WrapLayout backgroundColor="#000000">
        <Label text="Show Map" class="h3 text-center" width="50%" height="100%" color="white" backgroundColor="blue" @tap="onButtonTap"/>
        <Label text="Info" class="h3 text-center" width="50%" height="100%" color="white"  backgroundColor="green" @tap="goInfo"/>
<!--
        <Button  width="45%" class="h3 text-center" backgroundColor="blue" color="white" text="Show Map" @tap="onButtonTap" />
        <Button  width="40%" class="h3 text-center" backgroundColor="green" color="white" text="Info" @tap="goInfo" />
-->
      </WrapLayout>
      </ContentView>

</StackLayout>



    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import { SelectedPageService } from "../shared/selected-page-service";
  import capabilities from  "~/shared/capabilities.json";
  import MapBox from "./MapBox";
  import About from "./About";

  const appSettings = require("@nativescript/core/application-settings");

  export default {
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Settings");
      console.log("*** SETTINGS ***")
      // console.log(capabilities.WMT_MS_Capabilities.Capability.Layer.Layer)
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
        dateValueChanged: false,
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
        this.onNavigationItemTap(MapBox)
      },
      goInfo: function () {
        this.onNavigationItemTap(About)
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
        }
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

          this.layerChanged = true
          if (layer !== this.listOfItemsLayer[e.value]) {
            appSettings.setNumber("layerIndex", e.value);
            appSettings.setString("layerName", this.listOfItemsLayer[e.value]);
            appSettings.setString("layerTitle", this.listOfItemsLayerTitle[e.value]);

            // appSettings.setString("layerMinDate", this.listOfItemsLayerTitle[e.value]);
            console.log(this.listOfItemsLayerExtent[e.value])
            this.layerTitle = this.listOfItemsLayerTitle[e.value]
            this.layerName = this.listOfItemsLayer[e.value]
            appSettings.setString("wDate", this.maxDate);
            this.selectedDate = this.maxDate
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
      height: 0px;
    }

</style>
