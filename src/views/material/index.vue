<template>
    <el-card>
        <breadcrumb slot="header">
            <template slot="nav">
                素材管理
            </template>
        </breadcrumb>
        <el-tabs v-model="activeName">
            <el-tab-pane label="全部素材" name='all'>全部素材</el-tab-pane>
            <el-tab-pane label="我的收藏" name='collect'>我的收藏</el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all'
    }
  }
}
</script>

<style>

</style>
