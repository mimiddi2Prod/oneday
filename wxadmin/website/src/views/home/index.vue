<template>
  <div>
    <div :class="device==='mobile'?'':'dashboard-container'">
      <card
        v-for="(card,index) in cards"
        :key="index"
        :card="card"
        :device="device"
        class="choose"
        @editCard="editCard"
        @deleteCard="deleteCard"
      />

      <div>
        <el-button v-show="cards.length < 4" type="primary" @click="addCard">添加菜单</el-button>
      </div>
    </div>
    <div>
      可编辑的
    </div>
  </div>
</template>

<script>
import Card from './CardList/Card.vue'
// 移动适配 ResizeMixin mapState
import ResizeMixin from '@/layout/mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: { Card },
  // 移动适配
  mixins: [ResizeMixin],
  data() {
    return {
      cards: [{
        'name': 'JOLLY',
        'sub_button': [{
          'name': 'JOLLY商城',
          'type': 'miniprogram',
          'url': 'https://weibo.com/u/7208197320',
          'appid': 'wxa0869cd59ebaaa06',
          'pagepath': 'pages/blank/blank'
        }, {
          'name': 'ONEDAY民宿',
          'type': 'miniprogram',
          'url': 'https://weibo.com/u/7208197320',
          'appid': 'wxba832bcb326b64f3',
          'pagepath': 'zh_jdgjb/pages/blank/blank'
        }]
      }, {
        'name': 'JOLLY UP',
        'sub_button': [{
          'name': '关于JOLLY',
          'type': 'view',
          'url': 'https://mp.weixin.qq.com/s/sKRuNYzktp7jdcNpyrHHsA'
        }, {
          'type': 'click',
          'name': '玩赏指南',
          'key': 'item2_2',
          'sub_button': []
        }, {
          'type': 'click',
          'name': 'NEW JOLLY',
          'key': 'item2_3',
          'sub_button': []
        }, {
          'type': 'click',
          'name': '交通指南',
          'key': 'item2_4',
          'sub_button': []
        }]
      }, {
        'name': 'ABOUT US',
        'sub_button': [{
          'name': '关于ONEDAY',
          'type': 'view',
          'url': 'https://mp.weixin.qq.com/s/CTCDB647EWaNZzp2QwOlfg'
        }, {
          'type': 'click',
          'name': '联系客服',
          'key': 'item3_1',
          'sub_button': []
        }, {
          'type': 'click',
          'name': 'JOLLY+',
          'key': 'item3_2',
          'sub_button': []
        }]
      }]
    }
  },
  // 移动适配
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    addCard() {
      if (this.cards.length < 4) {
        this.cards.push({
          name: '菜单名称'
        })
      }
    },
    editCard({ card, value }) {
      card.name = value
    },
    deleteCard({ card }) {
      this.cards.splice(this.cards.indexOf(card), 1)
    },
    cancelEdit(e) {

    }
  }
}
</script>

<style scope>
  .dashboard-container {
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .dashboard-container > div {
    margin-right: 20px;
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
  .choose{

  }
</style>
