<template>
  <el-card class="articles">
      <breadcrumb slot="header">
        <template slot="nav">文章列表</template>
      </breadcrumb>
      <el-form style="padding-left:50px">
          <el-form-item label='文章状态 :'>
              <!-- 单选组 -->
              <!-- 双向绑定，默认选中全部 -->
            <el-radio-group v-model="searchForm.status">
                <el-radio :label='5'>全部</el-radio>
                <el-radio :label='0'>草稿</el-radio>
                <el-radio :label='1'>待审核</el-radio>
                <el-radio :label='2'>审核成功</el-radio>
                <el-radio :label='3'>审核失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label='频道列表 :'>
              <!-- select选择器 -->
              <el-select placeholder='请选择频道' v-model="searchForm.channel_id">
                  <el-option v-for="item in channels" :key="item.id" :value='item.id' :label='item.name'></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label='时间选择 :'>
              <!-- 日期选择器 -->
              <el-date-picker type="daterange" range-separator="-" v-model="searchForm.dateRange"></el-date-picker>
          </el-form-item>
      </el-form>
      <el-row class="total" type='flex' align='middle'>
          <span>共有10条相关文章</span>
      </el-row>
      <div class="articleContent">
          <!-- 左边 -->
          <div class="left">
              <img src="../../assets/img/collect.png" alt="">
              <div class="info">
                  <span>哈哈哈哈哈哈</span>
                  <el-tag class="tag">标签</el-tag>
                  <span class="date">2019-12-24</span>
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
        dateRange: []
      },
      channels: []// 频道数据
    }
  },
  methods: {
    getChennels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        console.log(res.data)
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChennels()// 获取文章数据
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
