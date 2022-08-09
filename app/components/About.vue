<template>
    <Page class="page">
      <ActionBar class="action-bar">
        <NavigationButton visibility="hidden"/>
        <GridLayout columns="50, *">
          <Label class="action-bar-title h2" text="Climate station" colSpan="2"/>

          <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/>
        </GridLayout>
      </ActionBar>

<ScrollView top="10">
        <StackLayout orientation="vertical" width="300" height="410"
            backgroundColor="white">
            <Label class="h2 description-label text-center " text="Ispra" width="400" height="40" backgroundColor="white" />
            <Label class="h2 description-label text-center " text="Atmosphere" width="400" height="40" backgroundColor="white" />
            <Label class="h2 description-label text-center " text="Biosphere 
" width="400" height="90" backgroundColor="white" />
            <Label class="h3 description-label text-center " text="Climate Integrated" width="400" height="40" backgroundColor="white" />
            <Label class="h3 description-label text-center " text="Monitoring Station of the JRC
" width="400" height="50" backgroundColor="white" />

        </StackLayout>
    </ScrollView>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import { SelectedPageService } from "../shared/selected-page-service";

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
