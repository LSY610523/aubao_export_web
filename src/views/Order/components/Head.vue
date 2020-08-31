<template>
  <div class="head">
    <el-form ref="form" :model="form" label-width="auto" class="headForm" :inline="true">
      <el-form-item label="查询的账户ID">
        <el-input v-model="form.id" placeholder="查询的账户ID" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getAdmin" size="small" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="visible=true" size="small" icon="el-icon-plus">新增</el-button>
      </el-form-item>
    </el-form>

    <add-order :visible='visible' @getChildData='getChildData' @getAdmin='getAdmin'></add-order>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import service from '@/service/index'
import AddOrder from './AddOrder/AddOrder.vue'
import downloadMixins from '../mixins/download'
import {getOrdersList} from '@/api/order'

interface Admin {
  form: Object
  visible: Boolean
}

@Component({
  components: { AddOrder },
  mixins: [downloadMixins]
})
export default class OrderHead extends Vue implements Admin{
  @Prop() private page !: number

  downloadData: Array<any> = []

  form = {
    id: '',
  }

  visible = false  // 添加对话框是否可见
  
  // 请求table数据
  public getOrder() {
    // let params = Object.assign({}, this.form, {page: this.page })
    // service.getAdminList(params).then(res => {
    //   this.downloadData = res.result['admins']
    //   this.$emit('getHeadData', res, false)
    // })
    getOrdersList({page:1, pageSize:15}).then(res =>{
      this.downloadData = res.data.list;
      this.$emit('getHeadData', res, false)
    })
  }

  // 接收子组件数据
  public getChildData(val) {
    this.visible = val
  }

  private created() {
    this.getOrder()
  }

  // 请求table数据
  public getAdmin() {
    getOrdersList({page: 1, pageSize: 10}).then(res => {
      this.downloadData = res.data.list;
      this.$emit('getHeadData', res, false)
    })
  }
}
</script>

<style lang="less" scoped>
.head {
  flex: 0 0 50px;
  width: 100%;
  margin: 10px 0;
  background-color:rgba(	176,196,222, 0.3);

  &Form {
    margin: 20px 10px 10px 10px;
    float: left;
  }
}

.el-form-item {
  margin-bottom: 10px;
}

</style>