<template>
    <div v-loading="loading">
       
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
           
        </el-table>
        
        <div class="foot">
          <el-pagination
            background
            layout="total, prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :total="total">
          </el-pagination>
        </div>   
    </div>
    
</template>

<script lang='ts'>
import { getTrafModeList } from '@/api/dict.ts';
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CountryDict extends Vue {
  pageSize:number = 10
  total: number = 0;
  options:Array<any> = [];
  country: any = null;
  loading: boolean = true;

  public handleCurrentChange(val) {
    let page = val
    this.getCountry({page, pageSize:this.pageSize})
  }

  
  async getCountry(val){
    this.loading = true;
    try {
      const {data} = await getTrafModeList(val);
      data && (this.options = data.list,this.total = data.total);
    } catch(e) {
      throw e;
    }
    this.loading = false;
  }

  mounted(){
      this.getCountry({page:1, pageSize:this.pageSize});
  }
}
</script>

<style lang="scss" scoped>
.foot {
  flex: 0 0 50px;
  width: 100%;
  background-color:rgba(	176,196,222, 0.8);
}

.el-pagination {
  margin-top: 10px;
  float: right;
}
</style>