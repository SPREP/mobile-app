<template>
<Page class="page">
  <ActionBar class="action-bar">
    <!--
    <NavigationButton visibility="hidden"/>
    -->
    <GridLayout columns="50, *">
      <Label class="action-bar-title h2" text="Climate Station - Info" colSpan="2"/>
      <!-- <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/> -->
    </GridLayout>
  </ActionBar>

<StackLayout>
    <ContentView height="80%" width="90%">
      <StackLayout>
            <Label class="h3 description-label text-center " text=" " height="30" backgroundColor="white" />
            <Image src="~/shared/logoAbout.png" />
            <Label class="h3 description-label text-center " text=" "  height="50" backgroundColor="white" />
            <Label class="h2 description-label text-center " text="Climate Station"  height="40" backgroundColor="white" />
            <Label class="h2 description-label text-center " text="Mobile App"  height="40" backgroundColor="white" />
            <Label class="h3 description-label text-center " text=" "  height="30" backgroundColor="white" />
            <Label class="h3 description-label text-center " text="The Joint Research Centre "  height="30" backgroundColor="white" />
            <Label class="h3 description-label text-center " text="of the" height="30" backgroundColor="white" />
            <Label class="h3 description-label text-center " text="European Commission" height="30" backgroundColor="white" />
      </StackLayout>
    </ContentView>
    <ContentView height="15%" width="90%">
      <WrapLayout >
        <Image src="~/shared/footerAbout.png" stretch="aspectFit" />
      </WrapLayout>
    </ContentView>
    <ContentView height="5%" width="100%">
      <WrapLayout backgroundColor="#000000">
        <Label text="Show Map" class="h3 text-center" width="50%" height="100%" backgroundColor="blue" color="white"  @tap="goMap"/>
        <Label text="Change Layer/Date" class="h3 text-center" width="50%" height="100%" backgroundColor="red" color="white" @tap="goChange"/>
        <!--
        <Button  width="45%" class="h4 text-center" backgroundColor="blue" color="white" text="Show Map" @tap="goMap" />
        <Button  width="40%" class="h4 text-center" backgroundColor="green" color="white" text="Change Layer/Date" @tap="goChange" />
        -->
      </WrapLayout>

    </ContentView>


</StackLayout>
</Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import { SelectedPageService } from "../shared/selected-page-service";
  import MapBox from "./MapBox";

  export default {
    mounted() {
      // SelectedPageService.getInstance().updateSelectedPage("About");
    },
    computed: {
      message() {
        return "<!-- Page content goes here -->";
      }
    },
    methods: {
      goMap: function () {
        this.onNavigationItemTap(MapBox)
      },
      goChange: function () {
        // this.onNavigationItemTap(Settings)
      },
      onNavigationItemTap(component) {
        this.$navigateTo(component, {
          clearHistory: true
        });
        utils.closeDrawer();
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
      background: rgb(245, 204, 204);
      height: 0px;
    }

</style>
