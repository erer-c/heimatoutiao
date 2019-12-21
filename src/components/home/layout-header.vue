<template>
  <el-row class="layoutHeader" type='flex' align='middle'>
      <el-col :span='12' class="left">
          <i class="el-icon-s-unfold"></i>
          <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span='12' class="right">
          <el-row type='flex' justify='end' align='middle'>
              <img :src="userInfo.photo?userInfo.photo:defaultImg" alt="">
              <el-dropdown @command='clickPullDown'>
                  <span>{{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command='userInfo'>个人信息</el-dropdown-item>
                      <el-dropdown-item command='gitURL'>git地址</el-dropdown-item>
                      <el-dropdown-item command='logout'>退出</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
          </el-row>
      </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/qzl.jpeg')
    }
  },
  methods: {
    clickPullDown (command) {
      if (command === 'userInfo') {

      } else if (command === 'gitURL') {
        window.location.href = 'https://github.com/erer-c/heimatoutiao/commits/master'
      } else {
        window.localStorage.removeItem('user-token')// 删除令牌
        this.$router.push('/login')
      }
    }
  },
  created () {
    // var token = localStorage.getItem('user-token')//已经全局统一注入token，因为所有接口的token格式要求都是一样的
    this.$axios({
      url: '/user/profile'
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).then(res => {
      this.userInfo = res.data.data
    })
  }
}
</script>

<style lang="less" scoped>
.layoutHeader{
    height: 60px;
    .left{
        i{
            font-size: 20px;
        }
        span{
            font-size: 14px;
            color: #2c3e50;
            margin-left: 5px;
        }
    }
    .right{
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 15px;
        }
    }
}
</style>
