<template>
  <div class="content">
    <el-table
    :data="tableData"
    highlight-current-row
    :header-cell-style="{background:'rgba(255,218,185,0.4)',color:'#2F4F4F'}"
    :tree-props="{children:'orderList'}"
    @sort-change='sortChange'
    v-loading="listLoading"
    border>
      <el-table-column type="expand">
        <template props="orderList">
          <el-table :data="orderList">
            <el-table-column label="条码" prop="barCode" align="center" min-width="100"> </el-table-column>
            <el-table-column label="商品名称" prop="gname" align="center" min-width="100"> </el-table-column>
            <el-table-column label="单价" prop="price" align="center" min-width="100"> </el-table-column>
            <el-table-column label="申报数量" prop="qty" align="center" min-width="100"> </el-table-column>
            <el-table-column label="申报单位" prop="unit" align="center" min-width="100"> </el-table-column>
            <el-table-column label="法定数量" prop="qty1" align="center" min-width="100"> </el-table-column>
            <el-table-column label="法定单位" prop="unit1" align="center" min-width="100"> </el-table-column>
            <el-table-column label="第二数量" prop="qty2" align="center" min-width="100"> </el-table-column>
            <el-table-column label="第二单位" prop="unit2" align="center" min-width="100"> </el-table-column>
            <el-table-column label="总价" prop="totalPrice" align="center" min-width="100"> </el-table-column>
          </el-table>
          <!-- <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="名字">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.addr }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.buildtime }}</span>
            </el-form-item>
            <el-form-item label="图像">
              <span><img :src="props.row.image" title="图像示例"></span>
            </el-form-item>
          </el-form> -->
        </template>
      </el-table-column>
      <el-table-column
        label="ID"
        prop="Id"
        align="center"
        min-width="150"
        sortable='custom'>
      </el-table-column>
      <el-table-column
        label="订单编号"
        prop="orderNo"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="报送类型"
        prop="appType"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="业务状态"
        prop="appStatus"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="毛重"
        prop="grossWeight"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="净重"
        prop="netWeight"
        align="center"
        min-width="150">
      </el-table-column>
       
    </el-table>

    <edit-order :editVisible="editVisible" :row="row" @getChildData='getChildData' @flushList='flushList'></edit-order>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import EditOrder from './EditOrder/EditOrder.vue'
import service from '@/service/index'

@Component({
  components: { EditOrder }
})
export default class OrderContent extends Vue{
  @Prop() private tableData!: Array<object>
  @Prop() private listLoading!: Boolean

  editVisible = false
  row = {}

  public sortChange(column) {
    let { prop, order } = column
    if (order === 'descending') {
      this.tableData.sort((a, b) => b["id"] - a["id"])
    } else {
      this.tableData.sort((a, b) => a["id"] - b["id"])
    }
  }

  public getChildData(val) {
    this.editVisible = val
  }

  public handleEdit(index, row) {
    this.editVisible = true
    this.row = row
  }

  public handleDel(index, row) {
    let params = {id: row.id}
    service.deleteAdminList(params).then(res => {
      let { code, msg } = res.data
      this.$message({
        message: msg,
        type: 'success'
      })
      this.$emit('contentFlush')
    })
  }

  public flushList() {
    this.$emit('contentFlush')
  }
}
</script>

<style lang="less" scoped>
.content {
  flex: 1 0 auto;
  border: 1px solid rgba(	176,196,222, 1);
  width: 100%;
  margin: 20px 0;
  overflow: auto;    
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.el-table {
  width: 100%;
  text-align: center
}
</style>