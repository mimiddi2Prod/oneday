<template>
  <div>
    {{ appidList[0].name }}
    <div class="btw-container">
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
          @addSub="addSub"
        />
      </div>
      <KanbanEdit
        v-if="edit.id"
        :edit="edit"
        @handleClickKey="handleClickKey"
        @deleteSub="deleteSub"
      />
    </div>
    <div class="form-submit">
      <aside>
        当前仅提供二级菜单定制选择，一级菜单只能改名称。一级菜单最多3个，二级菜单最多5个。
        应保证每个一级菜单的二级菜单都至少有一个。
        有疑问可拨打 10000 / 10010 / 10086 查询话费，并用力将手机砸向地面打开前往四次元空间，来到作者身边
      </aside>
      <el-form>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存并发布</el-button>
          <el-button v-loading.fullscreen.lock="fullscreenLoading" @click="cancleSubmit">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Kanban from './Component/Kanban'
import KanbanEdit from './Component/KanbanEdit'

const sub_button_template = {
  // appid: "wx21cf2922d0a597b4",
  appid: '', // 公众号appid
  id: 0,
  image: '',
  key: '', // 目前命名方式为类似item1_1，编辑器中应以创建时间或随机字串命名，防止冲突
  keyType: 'message', // message image
  message: '',
  miniappid: '',
  name: '新增菜单',
  pagepath: '', // 小程序路径 应设置首页路径
  parent_button_id: 0, // 根据 headerId 决定
  // sort: 0, // 该字段为在数据库中的位置，添加保存数据时，应根据数组所在位置决定顺序
  type: 'click', // click view miniprogram
  url: ''
}

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
      appidList: [{
        appid: 'wx21cf2922d0a597b4',
        name: 'oneday设计师民宿'
      }],
      list: [],
      chooseId: 0,
      edit: {},
      fullscreenLoading: false,
      counterId: 0 // 用于对新增sub的id的赋值，初始可通过获取最高id值+1
    }
  },
  mounted() {
    this.getMenu()
  },
  methods: {
    getMenu() {
      this.$store.dispatch('wechat/getMenu').then(res => {
        console.info(res)
        this.list = res.map(val => {
          this.counterId = val.id >= this.counterId ? val.id + 1 : this.counterId
          val.sub_button.forEach(m => {
            this.counterId = m.id >= this.counterId ? m.id + 1 : this.counterId
            if (m.image) {
              m.keyType = 'image'
            } else {
              m.message = decodeURIComponent(m.message)
              m.keyType = 'message'
            }
          })
          return val
        })
        setTimeout(_ => {
          this.fullscreenLoading = false
        }, 1000)
      })
    },
    // 一级菜单
    choose(id) {
      // console.info(id)
      this.chooseId = id
      this.edit = this.list.filter(val => {
        return val.id === Number(id)
      })[0]
    },
    // 二级菜单
    chooseSub({ id, parent_button_id }) {
      // console.info(parent_button_id)
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
    },
    // 发送消息中 文字和图片切换 选择关键字 keyType 目前没用，edit自动关联修改的数据
    handleClickKey() {
      // console.info(this.edit)
    },
    onSubmit() {
      // console.log('submit!')
      console.info(this.list)
      this.$store.dispatch('wechat/saveMenu', this.list).then(res => {
        console.info(res)
      })
      // 提交前，先对数据进行判断是否有漏填
    },
    cancleSubmit() {
      this.list = []
      this.chooseId = 0
      this.edit = {}

      this.fullscreenLoading = true
      this.getMenu()
    },
    addSub({ headerId }) {
      // 添加二级菜单 二级菜单最多5个
      for (const i in this.list) {
        if (this.list[i].id === headerId) {
          this.list[i].sub_button.push(sub_button_template)
          this.list[i].sub_button[this.list[i].sub_button.length - 1] =
            Object.assign({}, this.list[i].sub_button[this.list[i].sub_button.length - 1], {
              'id': this.counterId,
              'appid': this.list[0].appid, // 暂时这样处理后续应有公众号选择
              'key': `item${headerId}_` + this.counterId,
              'parent_button_id': headerId
            })
          this.counterId++
          break
        }
      }
    },
    deleteSub({ id }) {
      // 当前只做二级菜单
      for (const i in this.list) {
        for (const j in this.list[i].sub_button) {
          if (this.list[i].sub_button[j].id === Number(id)) {
            this.list[i].sub_button.splice(j, 1)
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
  .btw-container{
    display: flex;
    flex-direction: row;
    align-content: center;
    margin: 30px;
  }
  .board {
    /*width: 1000px;*/
    width: 600px;
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
  .form-submit {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

