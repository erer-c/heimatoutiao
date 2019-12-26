import layoutAside from '../components/home/layout-aside.vue'
import layoutHeader from '../components/home/layout-header.vue'
import breadcrumb from './common/bread-crumb.vue'
import quillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import coverImg from '../components/publish/coverImg.vue'

export default {
  install (Vue) {
    Vue.component('layoutAside', layoutAside)
    Vue.component('layoutHeader', layoutHeader)
    Vue.component('breadcrumb', breadcrumb)
    Vue.component('quillEditor', quillEditor)// 全局注册富文本编辑器
    Vue.component('coverImg', coverImg)
  }
}
