<template>
  <div class="login">
      <el-card class="box-card">
          <div class="img">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <el-form :model="formData" :rules="formrules" ref="myform">
            <el-form-item prop='mobile'>
                <el-input placeholder="请输入手机号" v-model="formData.mobile"></el-input>
            </el-form-item>
            <el-form-item prop='code'>
                <el-input placeholder="请输入验证码" style="width:65%" v-model="formData.code"></el-input>
                <el-button plain style="float:right">发送验证码</el-button>
            </el-form-item>
            <el-form-item prop='check'>
                <el-checkbox v-model="formData.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%" @click.prevent="submit">登录</el-button>
            </el-form-item>
          </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        mobile: '',
        code: '',
        check: false
      },
      formrules: {
        mobile: [{
          required: true, message: '请输入手机号'
        }, {
          pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号'
        }],
        code: [{
          required: true, message: '请输入验证码'
        }, {
          pattern: /^\d{6}$/, message: '验证码为6位数字'
        }],
        check: [{
          validator (rule, value, callback) {
            if (value) {
              callback()
            } else {
              callback(new Error('您需要先勾选协议'))
            }
          }
        }]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.myform.validate((isOK) => {
        if (isOK) {
          this.$axios.post('/authorizations', this.formData).then(res => {
            window.localStorage.setItem('user-token', res.data.token)
            this.$router.push('/home')
          }).catch(() => {
            // this.$message({
            //   type: 'warning',
            //   message: '输入信息有误，请重新输入！'
            // })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
    .login{
        height: 100vh;
        background-image: url('../../assets/img/login_bg.jpg');
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        .box-card{
            width: 450px;
            height: 340px;
            opacity: 0.8;
            .img{
                text-align: center;
                margin-bottom: 20px;
                img{
                    height: 45px;
                }
            }
        }
    }
</style>
