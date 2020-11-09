<template>
  <div class="board-column">
    <!--draggable -> v-model="list" 因为报错与 :list互斥，所以去掉-->
    <draggable
      :list="list"
      v-bind="$attrs"
      class="board-column-content"
      :set-data="setData"
      :move="onMove"
      @update="dragSameButton"
      @add="dragDiffButton"
    >
      <div
        v-for="element in list"
        :id="element.id"
        :key="element.id"
        class="board-item"
        :class="element.id == chooseId ? 'choose-sub':''"
        @click="chooseSub(element.id, element.parent_button_id)"
      >
        {{ element.name }}
      </div>
      <div
        v-if="list.length < 5"
        class="board-item add-sub"
        @click="addSub()"
      >+</div>
    </draggable>
    <div class="board-column-header" @click="choose">
      {{ headerText }}
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'HomeDragKanbanDemo',
  components: {
    draggable
  },
  props: {
    headerText: {
      type: String,
      default: 'Header'
    },
    headerId: {
      type: Number,
      default: 0
    },
    chooseId: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    },
    choose() {
      this.$emit('choose', this.headerId)
    },
    chooseSub(id, parent_button_id) {
      this.$emit('chooseSub', { id, parent_button_id })
    },
    // 只针对同数组位移 拖拽排序
    dragSameButton(e) {
      this.$emit('dragButton', e)
    },
    // 只针对不同数组位移
    dragDiffButton(e) {
      this.$emit('dragButton', e)
    },
    addSub() {
      this.$emit('addSub', { 'headerId': this.headerId })
    },
    onMove(e, originalEvent) {
      // 微信公众号二级菜单最多存放5个
      if (e.relatedContext.list.length >= 5) {
        return false
      }
      return true
    }
  }
}
</script>
<style lang="scss" scoped>
  .board-column {
    /*min-width: 300px;*/
    min-width: 200px;
    min-height: 100px;
    height: auto;
    overflow: hidden;
    background: #f0f0f0;
    border-radius: 3px;

  .board-column-header {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #333;
    color: #fff;
    border-radius: 3px 3px 0 0;
  }

  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

  .board-item {
    cursor: pointer;
    width: 100%;
    height: 64px;
    margin: 5px 0;
    background-color: #fff;
    text-align: left;
    line-height: 54px;
    padding: 5px 10px;
    box-sizing: border-box;
    box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
  }
  .choose-sub {
    background: red;
    color: #fff;
  }
  }
  }
  .add-sub {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

