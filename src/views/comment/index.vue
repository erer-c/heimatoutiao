<template>
  <el-card>
      <breadcrumb slot="header">
        <template slot="nav">
            评论管理
        </template>
      </breadcrumb>
      <el-table :data='list'>
          <el-table-column prop='title' label='标题' width='600'></el-table-column>
          <el-table-column :formatter='formatter' prop='comment_status' label='评论状态'></el-table-column>
          <el-table-column prop='total_comment_count' label='总评论数'></el-table-column>
          <el-table-column prop='fans_comment_count' label='粉丝评论数'></el-table-column>
          <el-table-column prop='' label='操作'>
            <template slot-scope="obj">
              <el-button size='small' type="text">修改</el-button>
              <el-button size='small' type="text">{{obj.row.comment_status?'关闭' : '打开'}}评论</el-button>
            </template>
          </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []// 定义一个数据接收返回的结果
    }
  },
  methods: {
    getcomment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(res => {
        this.list = res.data.results
      })
    },
    formatter (row, column, cellValue, index) {
      return cellValue ? '打开' : '关闭'
    }
  },
  created () {
    this.getcomment()// 获取评论信息
  }
}
</script>

<style>

</style>
