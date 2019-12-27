<template>
  <div class="coverImg">
      <div @click="openDialog(index)" class="coverImgItem" v-for='(item,index) in imageList' :key='index'>
          <img :src='item ? item : defaultImg' alt="">
      </div>
      <el-dialog :visible='dialogstate' @close='closeDialog' title='请选择图片'>
        <!-- 素材库和上传图片组件 -->
        <publishCover @forFather='fatherReceive'></publishCover>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogstate: false,
      index: -1
    }
  },
  props: ['imageList'],
  methods: {
    // 接收子组件传来的url
    fatherReceive (url) {
      // alert(url)
      this.$emit('forGrandfather', url, this.index)
      this.closeDialog()
    },
    openDialog (index) { // 打开弹层
      this.dialogstate = true
      this.index = index
    },
    closeDialog () { // 关闭弹层
      this.dialogstate = false
    }
  }
}
</script>

<style lang='less' scoped>
.coverImg{
    margin: 20px 100px;
    display: flex;
    .coverImgItem{
        border: 1px solid #ccc;
        width: 200px;
        height: 200px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
