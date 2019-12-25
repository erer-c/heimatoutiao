<template>
  <el-card class="articles">
      <breadcrumb slot="header">
        <template slot="nav">文章列表</template>
      </breadcrumb>
      <el-form style="padding-left:50px">
          <el-form-item label='文章状态 :'>
              <!-- 单选组 -->
              <!-- 双向绑定，默认选中全部 -->
            <el-radio-group v-model="searchForm.status" @change="changeCondition">
                <el-radio :label='5'>全部</el-radio>
                <el-radio :label='0'>草稿</el-radio>
                <el-radio :label='1'>待审核</el-radio>
                <el-radio :label='2'>审核成功</el-radio>
                <el-radio :label='3'>审核失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label='频道列表 :'>
              <!-- select选择器 -->
              <el-select placeholder='请选择频道' v-model="searchForm.channel_id" @change="changeCondition">
                  <el-option v-for="item in channels" :key="item.id" :value='item.id' :label='item.name'></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label='时间选择 :'>
              <!-- 日期选择器 -->
              <el-date-picker value-format='yyyy-MM-dd' type="daterange" range-separator="-" v-model="searchForm.dateRange" @change="changeCondition"></el-date-picker>
          </el-form-item>
      </el-form>
      <el-row class="total" type='flex' align='middle'>
          <span>共有10条相关文章</span>
      </el-row>
      <div class="articleContent" v-for="item in list" :key="item.id.toString()">
          <!-- 左边 -->
          <div class="left">
              <img :src="item.cover.images.length?item.cover.images[0]:img" alt="">
              <div class="info">
                  <span>{{item.title}}</span>
                  <el-tag class="tag" :type='item.status | filterType'>{{item.status|filterstatus}}</el-tag>
                  <span class="date">{{item.pubdate}}</span>
              </div>
          </div>
          <!-- 右边 -->
          <div class="right">
              <i class="el-icon-edit">修改</i>
              <i class="el-icon-delete">删除</i>
          </div>
      </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 搜索表单数据
      searchForm: {
        status: 5,
        channel_id: null,
        dateRange: []// 日期范围
      },
      channels: [], // 频道数据
      list: [], // 文章列表数据
      img: require('../../assets/img/collect.png')// 动态图片
    }
  },
  filters: {
    //  过滤状态
    filterstatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    // 过滤类型
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    //   获取搜索数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        console.log(res.data)
        this.channels = res.data.channels
      })
    },
    // 获取文章列表数据
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        this.list = res.data.results
      })
    },
    changeCondition () {
      // alert(this.searchForm.status)
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange.length > 0 ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      this.getArticles(params)
    }
  },
  created () {
    this.getChannels()// 获取文章数据
    this.getArticles()
  }
}
</script>

<style lang='less' scoped>
.articles{
    .total{
        height: 60px;
        font-size: 14px;
        border-bottom: 1px dashed #ccc;
    }
    .articleContent{
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        border-bottom: 1px solid #f2f3f5;
        .left{
            display: flex;
            img{
                width: 150px;
                height: 100px;
                margin-right: 20px;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .tag{
                    width: 60px;
                    text-align: center;
                }
                .date{
                    color: #666;
                    font-size: 12px;
                }
            }
        }
        .right{
            font-size: 12px;
            i{
                margin-right: 10px;
                cursor:pointer;
            }
        }
    }
}
</style>
