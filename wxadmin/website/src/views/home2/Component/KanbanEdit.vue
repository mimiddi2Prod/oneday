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
                  <el-upload
                    class="upload-demo"
                    drag
                    :data="dataObj"
                    :multiple="false"
                    :show-file-list="false"
                    :on-success="handleImageSuccess"
                    :action="domain"
                    :before-upload="beforeUpload"
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
import { getToken } from '@/api/qiniu'

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
      domain: 'http://upload.qiniu.com/',
      tempUrl: '',
      dataObj: { token: '', key: '' }
    }
  },
  methods: {
    handleClick() {
      this.$emit('handleClickKey')
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handleImageSuccess() {
      this.emitInput(this.tempUrl)
    },
    beforeUpload() {
      const _self = this
      return new Promise((resolve, reject) => {
        getToken().then(response => {
          const key = response.data.qiniu_key
          const token = response.data.qiniu_token
          _self._data.dataObj.token = token
          _self._data.dataObj.key = key
          this.tempUrl = response.data.qiniu_url
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
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
