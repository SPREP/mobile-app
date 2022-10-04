<template lang="html">
    <!--
    <RadSideDrawer ref="drawer" drawerLocation="Left" gesturesEnabled="true" :drawerTransition="transition">
        <StackLayout ~drawerContent backgroundColor="#ffffff">
            <DrawerContent/>
        </StackLayout>
        <Frame ~mainContent ref="drawerMainContent">
    -->
            <MapBox :categories="categories" :collections="collections" :waitingFor="waitingFor"/>
<!--        </Frame> 
    </RadSideDrawer>
-->
</template>

<script>
  import DrawerContent from './DrawerContent'
  import MapBox from './MapBox'
  import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
  import { Connectivity } from '@nativescript/core'
  import { Http, HttpResponse } from '@nativescript/core'
  // import { runInThisContext } from 'vm';


  export default {
    data() {
      return {
        categories: null,
        collections: null,
        waitingFor: false,
        transition: new SlideInOnTopTransition()
      }
    },
    mounted() {
      let self = this
      this.waitingFor = true
      // SelectedPageService.getInstance().updateSelectedPage("About");
      // Starts monitoring the network for changes
      const type = Connectivity.getConnectionType()
      console.log(type)
      switch (type) {
        case Connectivity.connectionType.none:
          console.log('No connection')
          alert({
            title: "NO INTERNET CONNECTION!",
            message: "This App requires Internet connectivity. Check your device and retry.",
            okButtonText: "Close"
          }).then(() => {
            console.log("Alert dialog closed");
          });
          break
        case Connectivity.connectionType.wifi:
          console.log('WiFi connection')
          break
        case Connectivity.connectionType.vpn:
          console.log('VPN connection')
          break
        case Connectivity.connectionType.mobile:
          console.log('Mobile connection')
          break
        case Connectivity.connectionType.ethernet:
          console.log('Ethernet connection')
          break
        case Connectivity.connectionType.bluetooth:
          console.log('Bluetooth connection')
          break
        default:
          break
      }

      // Read all features
      // https://estation.jrc.ec.europa.eu/eStation2//mobile-app/collections


      Http.request({
                url: 'https://estation.jrc.ec.europa.eu/eStation2//mobile-app/collections',
                method: 'GET'
            }).then(
                (response) => {
                    // Argument (response) is HttpResponse
                    // console.log(`Response Status Code: ${response.statusCode}`)
                    // console.log(`Response Headers:`, response.headers)
                    // console.log(`Response Content: ${response.content}`)
                    let objRet = JSON.parse(`${response.content}`)
                    let objStruct = {}

                    // console.log(objRet.products.length)
                    for (let o of objRet.products) {
                      if (!objStruct[o.category]) {
                        objStruct[o.category] = []
                      }
                      objStruct[o.category].push(o)
                      // console.log(o.category)
                    }
                    // console.log(objStruct)
                    // console.log(Object.keys(objStruct))

                    self.collections = objStruct
                    self.categories = Object.keys(objStruct)

                    self.waitingFor = false
                    // for (let c of Object.keys(objStruct)) {
                      //console.log(c)
                      // console.log(objStruct[o.category])
                    // }
           },
            e => {}
            )



      /*
        Connectivity.startMonitoring(newConnectionType => {
          switch (newConnectionType) {
            case Connectivity.connectionType.none:
              console.log('Connection type changed to none.')
              break
            case Connectivity.connectionType.wifi:
              console.log('Connection type changed to WiFi.')
              break
            case Connectivity.connectionType.vpn:
              console.log('Connection type changed to VPN.')
              break
            case Connectivity.connectionType.mobile:
              console.log('Connection type changed to mobile.')
              break
            case Connectivity.connectionType.ethernet:
              console.log('Connection type changed to ethernet.')
              break
            case Connectivity.connectionType.bluetooth:
              console.log('Connection type changed to bluetooth.')
              break
            default:
              break
          }
      */
    },
    components: {
      DrawerContent,
      MapBox
    }
  }
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '@nativescript/theme/scss/variables/aqua';
    // End custom common variables

    // Custom styles
    .action-bar {
      background: black;
    }
</style>
