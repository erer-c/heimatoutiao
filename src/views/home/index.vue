<template>
  <!-- 外层大容器 -->
  <el-container>
    <!-- 侧边栏 -->
    <el-aside>
      <layoutAside style="height:100vh;background-color: #353b4e;width:230px"></layoutAside>
    </el-aside>
    <!-- 右边内容 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        头部
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
export default {
  components: {
    layoutAside: layoutAside
  }
}
</script>

<style>

</style>
