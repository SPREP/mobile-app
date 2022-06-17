<template lang="html">
    <GridLayout rows="auto, *" class="nt-drawer__content">
        <StackLayout row="0" class="nt-drawer__header">
            <Image class="nt-drawer__header-image fas t-36" src.decode="font://&#xf2bd;"/>
            <Label class="nt-drawer__header-brand" text="User Name"/>
            <Label class="nt-drawer__header-footnote" text="username@mail.com"/>
        </StackLayout>

        <ScrollView row="1" class="nt-drawer__body">
            <StackLayout>
                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Home' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Home)">
                    <Label col="0" text.decode="&#xf015;" class="h3 nt-icon fas"/>
                    <Label col="1" text="Home" class="h3 p-r-10"/>
                </GridLayout>

                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Calendar' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Calendar)">
                    <Label col="0" text.decode="&#xf1ea;" class="h3 nt-icon far"/>
                    <Label col="1" text="Calendar" class="h3 p-r-10"/>
                </GridLayout>
                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Search' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Search)">
                    <Label col="0" text.decode="&#xf002;" class="nt-icon fas"/>
                    <Label col="1" text="Map" class="h3 p-r-10"/>
                </GridLayout>
<!--                
                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Map' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Map)">
                    <Label col="0" text.decode="&#xf005;" class="h3 nt-icon fas"/>
                    <Label col="1" text="Maps" class="h3 p-r-10"/>
                </GridLayout>
-->
                <StackLayout class="hr"/>

                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Settings' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Settings)">
                    <Label col="0" text.decode="&#xf013;" class="h3 nt-icon fas"/>
                    <Label col="1" text="Settings" class="h3 p-r-10"/>
                </GridLayout>
            </StackLayout>
        </ScrollView>
    </GridLayout>
</template>

<script>
  import Home from "./Home";
  import Calendar from "./Calendar";
  import Map from "./Map";
  import Search from "./Search";
  import Settings from "./Settings";
  import * as utils from "~/shared/utils";
  import { SelectedPageService } from "~/shared/selected-page-service";

  export default {
    mounted() {
      SelectedPageService.getInstance().selectedPage$
        .subscribe((selectedPage) => this.selectedPage = selectedPage);
    },
    data() {
      return {
        Home: Home,
        Calendar: Calendar,
        Map: Map,
        Search: Search,
        Settings: Settings,
        selectedPage: ""
      };
    },
    components: {
      Home,
      Calendar,
      Map,
      Search,
      Settings
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
