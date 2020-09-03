<template>
  <div class="admin">
    <order-head @getHeadData='getHeadData' ref="child" :page='page'></order-head>
    <order-content :tableData="tableData" :listLoading="listLoading" @contentFlush='contentFlush'></order-content>
    <order-foot :total="total" @getFootData='getFootData'></order-foot>
    <div class="block"></div>
  </div>
</template>

<script>
import OrderHead from './components/Head.vue'
import OrderContent from './components/Content.vue'
import OrderFoot from './components/Foot.vue'

export default {
  components: {
    OrderHead,
    OrderContent,
    OrderFoot
  },

  data() {
    return {
      tableData: [],
      total: 0,
      page: 1,
      listLoading: true,
    }
  },

<<<<<<< HEAD
<script>
import Vue from 'vue'
import {getCountryList} from '@/api/dict'

export default {
    data(){
        return{
            p:null
        }
    },
    methods:{
        async getCountry(){
          this.p = await getCountryList({"page":1, "pageSize":10});
     
      }
    }
}
</script>
// import Vue from 'vue'
// import {getCountryList} from '@/api/dict'
=======
  methods: {
    getHeadData(data, listLoading = false) {
      let result = data.data
      this.tableData = result.list
      this.total = result.total
      this.listLoading = false

      if (this.total < 15) {
        this.page = 1
      }
    },
>>>>>>> liusy

    contentFlush() {
      this.$nextTick(() => {
        this.$refs.child.getOrder()
      })
    },

    getFootData(page, pageSize) {
      this.page = page
      this.$nextTick(() => {
        this.$refs.child.getOrder()
      })
    }
  },
}
</script>

<style lang="less" scoped>
.admin {
  width: 100%;
  margin: 10px 0;
  // border: 2px solid blue;
  // height: 95%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}

.block{
  flex: 0 0 100px
}
</style>