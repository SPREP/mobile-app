<template lang="html">
    <GridLayout rows="auto, *" class="nt-drawer__content">
        <StackLayout row="0" class="nt-drawer__header">
            <Image class="nt-drawer__header-image fas t-36" src.decode="font://&#xf2bd;"/>
            <Label class="nt-drawer__header-brand" text="User Name"/>
            <Label class="nt-drawer__header-footnote" text="username@mail.com"/>
        </StackLayout>

        <ScrollView row="1" class="nt-drawer__body">
            <StackLayout>
<!--
                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Calendar' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Calendar)">
                    <Label col="0" text.decode="&#xf1ea;" class="h3 nt-icon far"/>
                    <Label col="1" text="Calendar" class="h3 p-r-10"/>
                </GridLayout>
-->                
                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'MapBox' ? ' -selected': '')"
                            @tap="onNavigationItemTap(MapBox)">
                    <Label col="0" text.decode="&#xf279;" class="h3 nt-icon fas"/>
                    <Label col="1" text="Map" class="h3 p-r-10"/>
                </GridLayout>

                <StackLayout class="hr"/>
                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'About' ? ' -selected': '')"
                            @tap="onNavigationItemTap(About)">
                    <Label col="0" text.decode="&#xf129;" class="h3 nt-icon fas"/>
                    <Label col="1" text="About" class="h3 p-r-10"/>
                </GridLayout>


        </StackLayout>
        </ScrollView>
    </GridLayout>
</template>

<script>
  import About from "./About";
  import Calendar from "./Calendar";
  import MapBox from "./MapBox";
  import * as utils from "~/shared/utils";
  import { SelectedPageService } from "~/shared/selected-page-service";

  export default {
    mounted() {
      SelectedPageService.getInstance().selectedPage$
        .subscribe((selectedPage) => this.selectedPage = selectedPage);
    },
    watch: {
      selectedPage(s) {
        console.log(s)
      }
    },
    data() {
      return {
        About: About,
        Calendar: Calendar,
        MapBox: MapBox,
        selectedPage: ""
      };
    },
    components: {
      // Home,
      Calendar,
      MapBox,
    },
    methods: {
      onNavigationItemTap(component) {
        this.$navigateTo(component, {
          clearHistory: true
        });
        utils.closeDrawer();
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
