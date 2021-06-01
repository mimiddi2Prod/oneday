<template>
  <div class="kanban-edit">
    <!--{{ edit }}-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ edit.name }}</span>
        <!--目前仅做二级菜单删除-->
        <el-button v-if="edit.parent_button_id !== 0" style="float: right; padding: 3px 0" type="text" @click="deleteSub">删除菜单</el-button>
      </div>
      <!--菜单内容-->
      <el-form ref="form" :model="edit" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="edit.name" />
        </el-form-item>
        <el-form-item v-if="edit.parent_button_id !== 0" label="菜单内容">
          <el-radio-group v-model="edit.type" name="type">
            <!--<el-radio label="发送消息" />-->
            <!--<el-radio label="跳转网页" />-->
            <!--<el-radio label="跳转小程序" />-->
            <el-radio label="click">发送消息</el-radio>
            <el-radio label="view">跳转网页</el-radio>
            <el-radio label="miniprogram">跳转小程序</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--菜单内容分三部分 发送消息 跳转网页 跳转小程序-->
        <!--发送消息: 文字 图片 卡券 音频 视频，目前只做前两种-->
        <!--跳转网页: 网页 或 公众号图文消息 地址-->
        <!--跳转小程序: 小程序 和 备用网址-->
        <el-form-item>
          <el-form label-position="top" label-width="80px">
            <el-tabs v-if="edit.type=='click'" v-model="edit.keyType" @tab-click="handleClick">
              <el-tab-pane label="文字" name="message">
                <el-input v-model="edit.message" autosize type="textarea" />
              </el-tab-pane>
              <el-tab-pane label="图片" name="image">
                <!--七牛云上传图片-->
                <!--<div v-if="!edit.image.length">-->
                <!--<el-upload-->
                <!--ref="upload"-->
                <!--class="upload-demo"-->
                <!--drag-->
                <!--:action="domain"-->
                <!--accept="image/jpeg,image/gif,image/png"-->
                <!--:auto-upload="autoUpload"-->
                <!--:http-request="upqiniu"-->
                <!--:limit="limit"-->
                <!--:multiple="multiple"-->
                <!--list-type="picture-card"-->
                <!--:before-upload="beforeUpload"-->

                <!--:file-list="fileList"-->
                <!--:show-file-list="true"-->
                <!--:on-remove="handleImageRemove"-->
                <!--:on-success="handleImageSuccess"-->
                <!--:data="qiniuDataObj"-->
                <!--&gt;-->
                <!--<i class="el-icon-upload" />-->
                <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                <!--</el-upload>-->
                <!--<i class="el-icon-upload" />-->
                <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                <!--</el-upload>-->
                <!--</div>-->
                <di slot="tip" class="el-upload__tip">图片预览</di>
                <el-image v-if="edit.image" :src="edit.image + '?imageView2/2/w/200/h/200'" />
                <div>
                  <!--<el-upload-->
                  <!--class="upload-demo"-->
                  <!--drag-->
                  <!--:action="domain"-->
                  <!--accept="image/jpeg,image/gif,image/png"-->
                  <!--:before-upload="beforeUpload"-->
                  <!--:on-success="handleImageSuccess"-->
                  <!--:data="qiniuDataObj"-->
                  <!--:show-file-list="true"-->
                  <!--list-type="picture"-->
                  <!--:limit="limit"-->
                  <!--:multiple="multiple"-->
                  <!--:on-remove="handleImageRemove"-->
                  <!--&gt;-->
                  <!--<i class="el-icon-upload" />-->
                  <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
                  <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件</div>-->
                  <!--</el-upload>-->
                  <el-upload
                    :action="domain"
                    accept="image/jpeg,image/gif,image/png"
                    :before-upload="beforeUpload"
                    :on-success="handleImageSuccess"
                    :data="qiniuDataObj"
                    :show-file-list="true"
                    list-type="picture-card"
                    :limit="limit"
                    :multiple="multiple"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleImageRemove"
                  >
                    <i class="el-icon-plus" />
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </div>
              </el-tab-pane>
            </el-tabs>

            <el-form-item v-if="edit.type=='miniprogram'" label="跳转小程序">
              <el-input v-model="edit.miniappid" />
            </el-form-item>
            <el-form-item v-if="edit.type=='miniprogram'" label="小程序页面路径">
              <el-input v-model="edit.pagepath" />
            </el-form-item>
            <el-form-item v-if="edit.type=='view'||edit.type=='miniprogram'" :label="edit.type=='view'?'跳转网页':'备用网页'">
              <el-input v-model="edit.url" />
            </el-form-item>
          </el-form>
        </el-form-item>
        <!--<el-form-item>-->
        <!--<el-button type="primary" @click="onSubmit">立即创建</el-button>-->
        <!--<el-button>取消</el-button>-->
        <!--</el-form-item>-->
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import * as qiniu from 'qiniu-js'

export default {
  name: 'HomeKanbanEditDemo',
  props: {
    edit: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      domain: 'https://upload.qiniup.com/',
      qiniuDataObj: { token: '', key: '' }, // 上传到七牛的token
      // fileList: [],
      limit: 1,
      multiple: true,
      // autoUpload: false, // 禁止自动上传
      imgUrl: '', // 上传图片的地址
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    deleteSub() {
      this.$emit('deleteSub', { 'id': this.edit.id })
    },
    // 目前没用
    handleClick() {
      this.$emit('handleClickKey')
    },
    handleImageRemove() {
      this.imgUrl = ''
    },
    handleImageSuccess(response, file, fileList) {
      this.edit.image = this.imgUrl
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 七牛云上传图片
    beforeUpload(file) {
      // const isPNG = file.type === 'image/png'
      // const isJPEG = file.type === 'image/jpeg'
      // const isJPG = file.type === 'image/jpg'
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isPNG && !isJPEG && !isJPG) {
      //   this.$message.error('上传头像图片只能是 jpg、png、jpeg 格式！')
      //   return false
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB！')
      //   return false
      // }
      // 检测完成后，将文件名拼接上随机数前缀，保存到QiniuData.key中
      // var randPrefix = this.getNum()
      // this.QiniuData.key = randPrefix + '_' + `${file.name}`

      // const fileUrl = this.$refs.upload.uploadFiles[0].url
      // this.fileUrl = fileUrl

      // this.qiniuDataObj.key = this.getKey() + `${file.name}`
      this.qiniuDataObj.key = this.getKey() + '.' + file.name.split('.')[1]
      // 请求 qiniu get_token / post 覆盖上传凭证 需要key
      return this.$store.dispatch('qiniu/getQiniuToken', this.qiniuDataObj).then(res => {
        this.qiniuDataObj = res.qiniuDataObj
        // _self.rootUrl = res.rootUrl
        // console.info(_self.rootUrl + res.qiniuDataObj.key)
        this.imgUrl = res.imgUrl
        return true
        // _self.uploadImage(res => {
        //   console.info(res, 3344777)
        //   // _self.edit.image = _self.rootUrl + res.key
        //   console.info(_self.rootUrl + res.key)
        // })
      })
      // // 请求 qiniu get_token / get 简单上传凭证 不需要key
      // this.$store.dispatch('qiniu/getQiniuToken').then(res => {
      //   console.info(res)
      //   _self.qiniuDataObj.token = res.token
      //   _self.rootUrl = res.rootUrl
      // })
    },
    getKey() {
      const time = new Date()
      const year = time.getFullYear() + '_'
      const month = time.getMonth() + 1 + '_'
      const day = time.getDate() + '_'
      const hours = time.getHours() + '_'
      const minutes = time.getMinutes() + '_'
      const seconds = time.getSeconds() + '_'
      return year + month + day + hours + minutes + seconds
    }
  }
}
</script>

<style scope>
  .kanban-edit {
    margin-left: 20px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    /*width: 480px;*/
    min-width: 700px;
    width: auto;
  }
</style>
