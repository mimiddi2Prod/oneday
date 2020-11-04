<template>
  <div class="kanban-edit">
    {{ edit }}
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ edit.name }}</span>
        <el-button style="float: right; padding: 3px 0" type="text">删除菜单</el-button>
      </div>
      <!--菜单内容-->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="edit.name" />
        </el-form-item>
        <el-form-item label="按钮类型">
          <el-radio-group v-model="form.resource">
            <el-radio label="小程序" />
            <el-radio label="网站" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单内容">
          <el-input v-model="edit.type" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'HomeKanbanEditDemo',
  props: {
    edit: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
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
    width: 480px;
  }
</style>
