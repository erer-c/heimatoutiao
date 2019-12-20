<template>
  <div class="layoutAside">
      <!-- logo -->
      <div class="logo">
          <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <el-menu router background-color='#353b4e' text-color='#adafb5' active-text-color='#ffd04b'>
          <el-menu-item  index='/home'>
              <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index='1'>
              <span slot="title">内容管理</span>
              <el-menu-item index='/home/publish'>发布文章</el-menu-item>
              <el-menu-item index='/home/articles'>文章列表</el-menu-item>
              <el-menu-item index='/home/comment'>评论管理</el-menu-item>
              <el-menu-item index='/home/material'>素材管理</el-menu-item>
          </el-submenu>
          <el-submenu index='2'>
              <span slot="title">粉丝管理</span>
              <el-menu-item index="1-1">图文数据</el-menu-item>
              <el-menu-item index="1-2">粉丝概况</el-menu-item>
              <el-menu-item index="1-2">粉丝画像</el-menu-item>
              <el-menu-item index="1-2">粉丝列表</el-menu-item>
          </el-submenu>
          <el-menu-item>
              <span slot="title">账户信息</span>
          </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layoutAside{
    width: 230px;
    .el-menu{
        border-right: none;
    }
    .logo{
        background-color: #2e2f32;
        text-align: center;
        padding: 10px 0;
        img{
            height: 30px;
        }
    }
}
</style>
