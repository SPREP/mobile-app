<template lang="html">
    <!--
    <RadSideDrawer ref="drawer" drawerLocation="Left" gesturesEnabled="true" :drawerTransition="transition">
        <StackLayout ~drawerContent backgroundColor="#ffffff">
            <DrawerContent/>
        </StackLayout>
        <Frame ~mainContent ref="drawerMainContent">
    -->
            <MapBox/>
<!--        </Frame> 
    </RadSideDrawer>
-->
</template>

<script>
  import DrawerContent from './DrawerContent'
  import MapBox from './MapBox'
  import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
  import { Connectivity } from '@nativescript/core'

  export default {
    data() {
      return {
        transition: new SlideInOnTopTransition()
      }
    },
    mounted() {
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
