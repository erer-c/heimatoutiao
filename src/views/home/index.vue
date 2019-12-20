<template>
  <!-- 外层大容器 -->
  <el-container>
    <!-- 侧边栏 -->
    <el-aside style="width:230px">
      <layoutAside style="height:100vh;background-color: #353b4e;"></layoutAside>
    </el-aside>
    <!-- 右边内容 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <layoutHeader></layoutHeader>
      </el-header>
      <!-- 主要区域 -->
      <el-main>
        主要区域
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    layoutAside: layoutAside,
    layoutHeader: layoutHeader
  }
}
</script>

<style>

</style>
