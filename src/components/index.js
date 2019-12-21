import layoutAside from '../components/home/layout-aside.vue'
import layoutHeader from '../components/home/layout-header.vue'
import breadcrumb from './common/bread-crumb.vue'

export default {
  install (Vue) {
    Vue.component('layoutAside', layoutAside)
    Vue.component('layoutHeader', layoutHeader)
    Vue.component('breadcrumb', breadcrumb)
  }
}
