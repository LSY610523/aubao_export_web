<template>
    
    <div class="content">
      <div class="country-search">
        <el-select v-model="country" placeholder="请选择">
              <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.code">
              </el-option>
          </el-select>
      </div>
    <el-table
      :data="options"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="code"
        label="字典码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="bn"
        label="缩写">
      </el-table-column>
    </el-table>
       
      <!-- <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column> -->
    <!-- </el-table> -->

    <!-- <edit-admin :editVisible="editVisible" :row="row" @getChildData='getChildData' @flushList='flushList'></edit-admin> -->
  </div>
</template>




<script>
import {getCountryList} from '@/api/dict'

export default{
    data(){
        return{
            country:null,
            tableData: [
              {name:"张三1", region:"武昌1", date3:"2020-8-28", type:"1", desc:"1"},
              {name:"张三2", region:"武昌3", date3:"2020-8-28", type:"1", desc:"1"},
              {name:"张三3", region:"武昌3", date3:"2020-8-28", type:"1", desc:"1"}
            ],
            options: [],
        }
    },
    methods:{
 
    },
    async mounted() {
        try {
            const res = await getCountryList({page: 1, pageSize: 10});
            console.log('res',res);
            this.options = res.data.list;
        }catch(e) {
            throw e;
        }
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

.country-search {
  text-align: left;
  margin: 5px;
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