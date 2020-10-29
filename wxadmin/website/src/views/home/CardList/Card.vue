<template>
  <el-card :class="device==='mobile'?'':'box-card'">
    <div v-for="o in 4" slot="header" :key="o" class="text item">
      {{ '列表内容 ' + o }}
    </div>
    <div class="clearfix">
      <span v-show="!editing" @dblclick="editing = true">{{ card.name }}</span>
      <input
        v-show="editing"
        v-focus="editing"
        :value="card.name"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        @blur="doneEdit"
      >
      <el-button style="float: right; padding: 3px 0" type="text" @click="deleteCard">删除</el-button>
      <el-button style="float: right; padding: 3px 0;margin-right: 10px" type="text">确定</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Card',
  directives: {
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  props: {
    card: {
      type: Object,
      default: function() {
        return {}
      }
    },
    device: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editing: false
    }
  },
  methods: {
    editCard({ card, value }) {
      this.$emit('editCard', { card, value })
    },
    deleteCard(e) {
      const { card } = this
      this.$emit('deleteCard', { card })
      // this.$emit('deleteCard', { card })
    },
    doneEdit(e) {
      const value = e.target.value.trim()
      const { card } = this
      // if (!value) {
      //   this.deleteCard({
      //     card
      //   })
      // } else
      if (this.editing) {
        this.editCard({
          card,
          value
        })
        this.editing = false
      }
    },
    cancelEdit(e) {

    }
  }
}
</script>

<style>
  .box-card {
    width: 480px;
  }
</style>
