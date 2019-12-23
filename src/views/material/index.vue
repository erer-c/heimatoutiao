<template>
    <el-card v-model="loading">
        <breadcrumb slot="header">
            <template slot="nav">
                素材管理
            </template>
        </breadcrumb>
        <el-row type='flex' justify='end'>
            <el-upload action='' :http-request='upload' :show-file-list='false'>
                <el-button size="small" type="primary">上传素材</el-button>
            </el-upload>
        </el-row>
        <el-tabs v-model="activeName" @tab-click='changeTab'>
            <!-- 全部 -->
            <el-tab-pane label="全部素材" name='all'>
                <div class="imgList">
                    <!-- 遍历生成数据 -->
                    <el-card class="img-card" v-for='item in list' :key='item.id'>
                        <img :src="item.url" alt="">
                        <el-row class="icon" type='flex' justify='space-around' align='middle'>
                            <!-- 根据当前是否收藏的状态决定当前图标颜色 -->
                            <i @click="collectOrNot(item)" :style="{color:item.is_collected?'red':'#000'}" class="el-icon-star-on"></i>
                            <i class="el-icon-delete-solid"></i>
                        </el-row>
                    </el-card>
                </div>
            </el-tab-pane>
            <!-- 收藏 -->
            <el-tab-pane label="我的收藏" name='collect'></el-tab-pane>
            <div class="imgList">
                <el-card class="img-card" v-for='item in list' :key='item.id'>
                    <img :src="item.url" alt="">
                </el-card>
            </div>
        </el-tabs>
        <!-- 共用一个分页组件 -->
        <el-row type='flex' justify='center' style="height:60px" align='middle'>
            <el-pagination background layout="prev, pager, next" :total="page.total" :page-size='page.pageSize' :current-page='page.nowpage' @current-change='changepage'></el-pagination>
        </el-row>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [], // 接受全部素材数据
      page: {
        total: 0,
        pageSize: 8,
        nowpage: 1
      },
      loading: false
    }
  },
  methods: {
    // 收藏
    collectOrNot (item) {
    //   alert(item.is_collected)
      this.$axios({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        this.getMaterial()
      })
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect', // true获取所有数据,false获取收藏数据
          page: this.page.pageSize,
          per_page: this.page.nowpage
        }
      }).then(res => {
        this.list = res.data.results
      })
    },
    // 上传图片
    upload (params) {
    //   alert(1)
      let data = new FormData()
      data.append('image', params.file)
      this.loading = true
      this.$axios({
        method: 'post',
        url: '/user/images',
        data
      }).then(res => {
        this.loading = false
        this.getMaterial()
      })
    },
    // 切换页签
    changeTab () {
      // 切换页签时回到第一页
      this.page.nowpage = 1
      this.getMaterial()
    },
    changepage (newpage) {
      this.page.nowpage = newpage
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.imgList{
    display: flex;
    flex-wrap: wrap;
    .img-card{
        width: 200px;
        height: 200px;
        margin: 20px 50px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
        .icon{
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            font-size: 18px;
            height: 30px;
            background-color: #f4f5f6;
            i{
                cursor: pointer;
            }
        }
    }
}
</style>
