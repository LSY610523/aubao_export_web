<template>
    <!-- <el-table :data="tableData">
        <el-table-column  prop="name" label="活动名称" align="center"> </el-table-column>
        <el-table-column prop="region" label="活动区域" align="center"> </el-table-column>
        <el-table-column prop="date3" label="活动时间" align="center"> </el-table-column>
        <el-table-column prop="type" label="活动性质" align="center"> </el-table-column>
        <el-table-column prop="desc" label="活动形式" align="center"> </el-table-column>
    </el-table> -->
    <div class="content">
    <el-table :data="tableData" highlight-current-row :header-cell-style="{background:'rgba(255,218,185,0.4)',color:'#2F4F4F'}"
    @sort-change='sortChange' v-loading="listLoading" border>
      
      <el-table-column
        label="ID"
        prop="id"
        align="center"
        min-width="150"
        sortable='custom'>
      </el-table-column>
      <el-table-column
        label="名字"
        prop="name"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="Code"
        prop="code"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="BN"
        prop="bn"
        align="center"
        min-width="150">
      </el-table-column>
       
      <!-- <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <edit-admin :editVisible="editVisible" :row="row" @getChildData='getChildData' @flushList='flushList'></edit-admin>
  </div>
</template>




<script>
import {getCountryList} from '@/api/dict'

export default{
    data(){
        return{
            p:null,
            tableData: null
        }
    },
    methods:{
        async getCountry(){
          this.p = await getCountryList({"page":1, "pageSize":10});
            this.tableData = this.p.list
      }
    }
}
</script>
// import Vue from 'vue'
// import {getCountryList} from '@/api/dict'

// export default{
//     data() {
//     return {
//         p: null,
//       tableData: [{"name":"张三1", "region":"武昌1", "date3":"2020-8-28", "type":"1", "desc":"1"},
//       {"name":"张三2", "region":"武昌3", "date3":"2020-8-28", "type":"1", "desc":"1"},
//       {"name":"张三3", "region":"武昌3", "date3":"2020-8-28", "type":"1", "desc":"1"}
//       ]
//     }
//   },
//   methods:{
//       async getCountry(){
//           this.p = await getCountryList({"page":1, "pageSize":10});
     
//       }
//   },
// }
// </script>


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