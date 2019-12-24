<template>
  <el-card>
      <breadcrumb slot="header">
        <template slot="nav">文章列表</template>
      </breadcrumb>
      <el-form>
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

<style>

</style>
