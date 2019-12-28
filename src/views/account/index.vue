<template>
  <el-card v-loading='loading'>
      <breadcrumb slot="header">
        <template slot="nav">账户信息</template>
      </breadcrumb>
      <!-- 表单 => 表单容器 -->
      <el-form :model='userInfo' :rules='rules' style="margin-left:100px" label-width="100px">
          <el-form-item label="用户名" prop='username'>
              <el-input v-model="userInfo.name" style="width:40%"></el-input>
          </el-form-item>
           <el-form-item label="简介" prop='intro'>
               <el-input v-model="userInfo.intro" style="width:40%"></el-input>
           </el-form-item>
           <el-form-item label="邮箱" prop='email'>
               <el-input v-model="userInfo.email" style="width:40%"></el-input>
           </el-form-item>
           <el-form-item label="手机号" prop='mobile'>
               <el-input v-model="userInfo.mobile" disabled style="width:40%"></el-input>
           </el-form-item>
           <el-form-item>
               <el-button type="primary" @click="saveInfo">保存信息</el-button>
           </el-form-item>
      </el-form>
      <!-- 上传组件 -->
      <el-upload :http-request='uploadImg' class='head-upload' action="" :show-file-list="false">
          <img :src="userInfo.photo?userInfo.photo:defaultImg" alt="">
      </el-upload>
  </el-card>
</template>

<script>
import eventBus from '../../utills/eventBus'
export default {
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        email: '',
        photo: ''
      },
      loading: false,
      defaultImg: require('../../assets/img/home.jpg'),
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, { min: 1, max: 7, message: '用户名为1-7个字符' }],
        email: [{ required: true, message: '邮箱不能为空' }, { pattern: /^([0-9A-Za-z\\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: '邮箱格式不正确' }]
      }
    }
  },
  methods: {
    // 上传用户头像
    uploadImg (params) {
    //   console.log(params)
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(res => {
        this.loading = false
        this.userInfo.photo = res.data.photo
        eventBus.$emit('syncInfo')
      })
    },
    // 获取个人信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.userInfo = res.data
      })
    },
    // 保存用户信息
    saveInfo () {
      this.$axios({
        url: '/user/profile',
        method: 'patch',
        data: this.userInfo
      }).then(res => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        // 此时已保存成功
        eventBus.$emit('syncInfo')
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.head-upload {
   position: absolute;
   right: 300px;
   top:200px;
    img {
       width: 200px;
       height: 200px;
        border-radius: 50%;
    }
}
</style>
