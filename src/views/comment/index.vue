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
              <el-button size='small' @click="openOrClose(obj.row)" type="text">{{obj.row.comment_status?'关闭' : '打开'}}评论</el-button>
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
    },
    openOrClose (row) {
      this.$confirm(row.comment_status ? '关闭后将清除所有评论，是否继续进行此操作？' : '是否打开评论？', '提示', { type: 'warning' }).then(() => {
        // debugger
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(res => {
          this.getcomment()
        })
        // debugger
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      })
    }
  },
  created () {
    this.getcomment()// 获取评论信息
  }
}
</script>

<style>

</style>
