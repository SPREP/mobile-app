<template lang="html">
    <RadSideDrawer ref="drawer" drawerLocation="Left" gesturesEnabled="true" :drawerTransition="transition">
        <StackLayout ~drawerContent backgroundColor="#ffffff">
            <DrawerContent/>
        </StackLayout>
        <Frame ~mainContent ref="drawerMainContent">
            <MapBox/>
        </Frame>
    </RadSideDrawer>
</template>

<script>
  import DrawerContent from './DrawerContent'
  import MapBox from './MapBox'
  import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';

  export default {
    data() {
      return {
        transition: new SlideInOnTopTransition()
      }
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
