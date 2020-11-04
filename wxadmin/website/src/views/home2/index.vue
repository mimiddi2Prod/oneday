<template>
  <!--<div>-->
  <div class="components-container board">
    <!--<Kanban :key="1" :list="list1" :group="group" class="kanban todo" header-text="Todo" />-->
    <!--<Kanban :key="2" :list="list2" :group="group" class="kanban working" header-text="Working" />-->
    <!--<Kanban :key="3" :list="list3" :group="group" class="kanban done" header-text="Done" />-->

    <Kanban
      v-for="item in list"
      :key="item.id"
      :list="item.sub_button"
      :group="group"
      class="kanban"
      :class="chooseId == item.id ? 'choose' : 'done'"
      :header-text="item.name"
      :header-id="item.id"
      :choose-id="chooseId"
      @choose="choose"
      @chooseSub="chooseSub"
      @dragButton="dragButton"
    />
    <KanbanEdit
      v-if="edit.id"
      :edit="edit"
    />
  </div>
  <!--</div>-->
</template>
<script>
import Kanban from './Component/Kanban'
import KanbanEdit from './Component/KanbanEdit'

export default {
  name: 'Home2',
  components: {
    Kanban,
    KanbanEdit
  },
  data() {
    return {
      group: 'wechat',
      // list1: [
      //   { name: 'Mission', id: 1 },
      //   { name: 'Mission', id: 2 },
      //   { name: 'Mission', id: 3 },
      //   { name: 'Mission', id: 4 }
      // ],
      // list2: [
      //   { name: 'Mission', id: 5 },
      //   { name: 'Mission', id: 6 },
      //   { name: 'Mission', id: 7 }
      // ],
      // list3: [
      //   { name: 'Mission', id: 8 },
      //   { name: 'Mission', id: 9 },
      //   { name: 'Mission', id: 10 }
      // ],
      // appidList: [{
      //   appid: 'wx21cf2922d0a597b4',
      //   name: 'oneday设计师民宿'
      // }]
      list: [],
      chooseId: 0,
      edit: {}
    }
  },
  mounted() {
    this.getMenu()
  },
  methods: {
    getMenu() {
      this.$store.dispatch('wechat/getMenu').then(res => {
        console.info(res)
        this.list = res
      })
    },
    // 一级菜单
    choose(id) {
      console.info(id)
      this.chooseId = id
      this.edit = this.list.filter(val => {
        return val.id === Number(id)
      })[0]
    },
    // 二级菜单
    chooseSub({ id, parent_button_id }) {
      console.info(parent_button_id)
      this.chooseId = id
      // this.edit = this.list.filter(val => {
      //   return val.id == parent_button_id
      // })[0].sub_button.filter(val => {
      //   return val.id === Number(id)
      // })[0]
      for (const i in this.list) {
        for (const j in this.list[i].sub_button) {
          if (this.list[i].sub_button[j].id === Number(id)) {
            this.edit = this.list[i].sub_button[j]
          }
        }
      }
    },
    // 拖拽排序
    dragButton(e) {
      e.preventDefault()
      // console.log('拖动前的索引 :' + e.oldIndex)
      // console.log('拖动后的索引 :' + e.newIndex)
      // console.info(this.list[1].sub_button,this.list[2].sub_button)
    }
  }
}
</script>
<style lang="scss">
  .board {
    /*width: 1000px;*/
    margin-left: 20px;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    /*align-items: flex-start;*/
    align-items: flex-end;
  }
  .kanban {
  &.todo {
  .board-column-header {
    background: #4A9FF9;
  }
  }
  &.working {
  .board-column-header {
    background: #f9944a;
  }
  }
  &.done {
  .board-column-header {
    background: #2ac06d;
  }
  }
  &.choose {
  .board-column-header {
    background: red;
  }
  }
  }
</style>

