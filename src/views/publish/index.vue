<template>
  <el-card>
      <breadcrumb slot="header">
      <template slot="nav">发表文章</template>
      </breadcrumb>
      <el-form ref="publishForm" :model='formData' :rules='rules' style="margin-left:50px" label-width="100px">
          <el-form-item prop='title' label="标题">
              <el-input v-model="formData.title" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item prop='content' label="内容">
                 <el-input
                 v-model="formData.content"
                 type="textarea"
                :rows="4"></el-input>
          </el-form-item>
          <el-form-item prop='cover' label="封面">
              <el-radio-group v-model="formData.cover.type">
                  <el-radio :label='1'>单图</el-radio>
                  <el-radio :label='3'>三图</el-radio>
                  <el-radio :label='0'>无图</el-radio>
                  <el-radio :label='-1'>自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item prop='channel_id' label="频道">
              <el-select v-model="formData.channel_id">
                  <!-- 遍历channels -->
                  <el-option v-for="item in channels" :key="item.id" :value='item.id' :label='item.name'></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type='primary' @click="publishArticles()">发布</el-button> <!--不传参数默认undefined，===false -->
              <el-button @click="publishArticles(true)">存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 表单数据
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        },
        channel_id: null// 文章所属频道id
      },
      // 校验规则
      rules: {
        title: [{ required: true, message: '文章标题不能为空！' }, {
          min: 5,
          max: 30,
          message: '标题内容应在5-30个字符之间'
        }],
        content: [{ required: true, message: '文章内容不能为空！' }],
        channel_id: [{ required: true, message: '文章频道不能为空！' }]
      },
      channels: []// 获取频道数据
    }
  },
  //   监听route对象变化,处理俩个地址对应同一个组件时，组件不销毁，但内容未重置的问题
  watch: {
    $route (to, from) {
      // 如果有article_id是修改，否则是发表（发表信息设为初始值）
      if (to.params.articleId) {

      } else {
        this.formData = {
          title: '',
          content: '',
          cover: {
            type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
            images: []
          }
        }
      }
    },
    'formData.cover.type': function () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      }
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 自定义校验
    publishArticles (draft) {
      this.$refs.publishForm.validate((isOK) => {
        if (isOK) { // 判断是修改文章还是发表文章
          let{ articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(() => {
            this.$message({
              type: 'success',
              message: '保存成功！'
            })
            this.$router.push('/home/articles')
          })
        //   if (articleId) { // 有id说明是修改
        //     this.$axios({
        //       url: `/articles/${articleId}`,
        //       method: 'put',
        //       params: { draft },
        //       data: this.formData
        //     }).then(() => {
        //       this.$message({
        //         type: 'success',
        //         message: '保存成功！'
        //       })
        //       this.$router.push('/home/articles')
        //     })
        //   } else {
        //     this.$axios({
        //       url: '/articles',
        //       method: 'post',
        //       params: { draft },
        //       data: this.formData
        //     }).then(() => {
        //       this.$message({
        //         type: 'success',
        //         message: '保存成功！'
        //       })
        //       this.$router.push('/home/articles')
        //     })
        //   }
        }
      })
    },
    getModifyContent (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
        this.formData = res.data// 把获取的当前内容的data赋值给定义的数据
      })
    }
  },
  created () {
    this.getChannels()
    let{ articleId } = this.$route.params
    articleId && this.getModifyContent(articleId)// 如果id存在直接查询当前要修改文章的数据
  }
}
</script>

<style>

</style>
