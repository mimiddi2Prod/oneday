<template>
  <div class="kanban-edit">
    <!--{{ edit }}-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ edit.name }}</span>
        <el-button style="float: right; padding: 3px 0" type="text">删除菜单</el-button>
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
                <div v-if="!edit.image.length">
                  <!---->
                  <el-upload
                    ref="upload"
                    class="upload-demo"
                    drag
                    :action="domain"
                    accept="image/jpeg,image/gif,image/png"
                    :auto-upload="autoUpload"
                    :http-request="upqiniu"
                    :limit="limit"
                    :multiple="multiple"
                    list-type="picture-card"
                    :before-upload="beforeUpload"

                    :file-list="fileList"
                    :show-file-list="true"
                    :on-remove="handleImageRemove"
                    :on-success="handleImageSuccess"
                    :data="qiniuDataObj"
                  >
                    <i class="el-icon-upload" />
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </div>
                <el-image v-else :src="edit.image" />
              </el-tab-pane>
            </el-tabs>

            <el-form-item v-if="edit.type=='miniprogram'" label="跳转小程序">
              <el-input v-model="edit.miniappid" />
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
import * as qiniu from 'qiniu-js'

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
      rootUrl: '',
      fileUrl: '',
      qiniuDataObj: { token: '', key: '' }, // 上传到七牛的token
      listObj: [],
      fileList: [],
      limit: 1,
      multiple: false,
      autoUpload: true // 禁止自动上传
    }
  },
  methods: {
    handleClick() {
      this.$emit('handleClickKey')
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handleImageRemove() {
      console.info(111)
    },
    handleImageSuccess(response, file, fileList) {
      console.info(222222333, response, file, fileList)
      this.emitInput(this.tempUrl)
    },
    upqiniu(e) {},
    beforeUpload(file) {
      const _self = this
      console.info(file)
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

      const fileUrl = this.$refs.upload.uploadFiles[0].url
      this.qiniuDataObj.key = this.getKey() + `${file.name}`
      // 请求 qiniu token
      this.$store.dispatch('qiniu/getQiniuToken', this.qiniuDataObj).then(res => {
        _self.qiniuDataObj = res.qiniuDataObj
        _self.rootUrl = res.rootUrl
        _self.fileUrl = fileUrl
        _self.uploadImage(res => {
          console.info(res, 3344777)
          // _self.edit.image = _self.rootUrl + res.key
          console.info(_self.rootUrl + res.key)
        })
      })
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
    },
    uploadImage(callback) {
      const key = this.qiniuDataObj.key
      const token = this.qiniuDataObj.token
      const file = this.fileUrl
      console.info(file)
      const putExtra = {
        fname: key,
        params: {},
        mimeType: null
      }

      const observer = {
        next(res) {
          // ...
        },
        // error(err) {
        //   // ...
        // },
        complete(res) {
          // ...
          // console.info(res)
          return callback(res)
        }
      }
      const config = {
        useCdnDomain: true,
        region: qiniu.region.z0
      }
      const observable = qiniu.upload(file, key, token, putExtra, config)
      // const subscription = observable.subscribe(observer) // 上传开始
      observable.subscribe(observer) // 上传开始
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
