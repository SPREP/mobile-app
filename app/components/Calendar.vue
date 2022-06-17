<template>
    <Page class="page">
      <ActionBar class="action-bar">
        <NavigationButton visibility="hidden"/>
        <GridLayout columns="50, *">
          <Label class="action-bar-title h2" text="Calendar" colSpan="2"/>

          <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/>
        </GridLayout>
      </ActionBar>

    <GridLayout class="page__content">
      <DatePicker v-model="selectedDate" @dateChange="dateChanged"/>
    </GridLayout>



    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import { SelectedPageService } from "../shared/selected-page-service";

  const appSettings = require("@nativescript/core/application-settings");

  export default {
    mounted() {
      console.log("*** MOUNTED CALENDAR ***")
      SelectedPageService.getInstance().updateSelectedPage("Calendar");
      const setData = appSettings.getString("wDate");
      console.log(setData)
      console.log("================")
      this.selectedDate = setData
      this.beforeMount = false
    },
    computed: {
      message() {
        return "<!-- Calendar -->";
      }
    },
    watch: {
    },
    data() {
      return {
          selectedDate:'2000-01-01',
          beforeMount: true
      }
    },
    methods: {
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
