import Vue from 'nativescript-vue'
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue'


Vue.use(RadSideDrawer)


// import AWebView from 'nativescript-advanced-webview'
// import AWebView from '/nativescript-webview-plus/vue'
// Vue.use(AWebView)


import App from './components/App'

Vue.config.silent = !__DEV__

new Vue({
  render: h => h(App)
}).$start()
