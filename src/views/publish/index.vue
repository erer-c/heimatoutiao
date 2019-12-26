<template>
  <el-card>
      <breadcrumb slot="header">
      <template slot="nav">发表文章</template>
      </breadcrumb>
      <el-form style="margin-left:50px" label-width="100px">
          <el-form-item label="标题">
              <el-input style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="内容">
                 <el-input
                 type="textarea"
                :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="封面">
              <el-radio-group>
                  <el-radio>单图</el-radio>
                  <el-radio>三图</el-radio>
                  <el-radio>无图</el-radio>
                  <el-radio>自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
              <el-select v-model="value">
                  <!-- 遍历channels -->
                  <el-option v-for="item in channels" :key="item.id" :value='item.id' :label='item.name'></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type='primary'>发布</el-button>
              <el-button>存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: []// 获取频道数据
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>

</style>
