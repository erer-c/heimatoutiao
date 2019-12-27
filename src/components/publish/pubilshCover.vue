<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
      <div class="materialBox">
        <el-card v-for="item in list" :key="item.id" class="coverCard">
          <img @click="clickCurrentImg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
      <el-row type="flex" justify="center">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :page-size="page.pageSize"
          :current-page="page.nowPage"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="uploadImg">
      <!-- 上传图片组件 -->
      <el-upload class="avatar-uploader" action :show-file-list="false" :http-request='userDefined'>
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [], // 定义数据
      page: {
        nowPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    //   自定义上传
    userDefined (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        this.$emit('forFather', res.data.url)
      })
    },
    // 点击选中图片触发
    clickCurrentImg (url) {
      //   alert(url)
      // 点击图片是把图片地址传给显示的封面
      this.$emit('forFather', url)
    },
    // 改变页码事件
    changePage (newpage) {
      this.page.nowPage = newpage
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.nowPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        // alert(res.data.results.id)
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.page.nowPage = res.data.page // 当前页数
        this.page.pageSize = res.data.per_page // 每页数量
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.materialBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px 0;
  .coverCard {
    width: 150px;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #ccc;
  border-radius: 5px;
}
</style>
