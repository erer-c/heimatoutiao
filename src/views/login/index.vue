<template>
  <div class="login">
      <el-card class="box-card">
          <div class="img">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <el-form>
            <el-form-item>
                <el-input placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入验证码" style="width:65%"></el-input>
                <el-button plain style="float:right">发送验证码</el-button>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%">登录</el-button>
            </el-form-item>
          </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

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
