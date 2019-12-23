<template>
    <el-card>
        <breadcrumb slot="header">
            <template slot="nav">
                素材管理
            </template>
        </breadcrumb>
        <el-tabs v-model="activeName" @tab-click='changeTab'>
            <!-- 全部 -->
            <el-tab-pane label="全部素材" name='all'>
                <div class="imgList">
                    <!-- 遍历生成数据 -->
                    <el-card class="img-card" v-for='item in list' :key='item.id'>
                        <img :src="item.url" alt="">
                        <el-row class="icon" type='flex' justify='space-around' align='middle'>
                            <i class="el-icon-star-on"></i>
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
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: []// 接受全部素材数据
    }
  },
  methods: {
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect'// true获取所有数据,false获取收藏数据
        }
      }).then(res => {
        this.list = res.data.results
      })
    },
    changeTab () {
      this.getMaterial()
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
        }
    }
}
</style>
