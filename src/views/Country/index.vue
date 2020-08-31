<template>
    <div>
        <el-select v-model="value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.code">
            </el-option>
        </el-select>

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
import { getCountryList } from '@/api/dict.ts';
import { Component, Prop, Vue } from 'vue-property-decorator'

export default class CountryDict extends Vue {
  @Prop() private total!: number
  pageSize:number = 15
  options:Array<Object> = []

   public handleCurrentChange(val) {
    let page = val
    this.getCountry({page:page, pageSize:this.pageSize})
  }

  private mounted(){
      this.getCountry({page:1, pageSize:this.pageSize})
  }
  public getCountry(val){
          getCountryList({page:val.page, pageSize:val.pageSize}).then(res =>{
            console.log(res);
            this.options = res.data.list;
            this.total = res.data.total;
          })

  }
    // data() {
    //     return {
    //         options: [],
    //         value: null,
    //     }
    // },

    // async mounted() {
    //     try {
    //         const res = await getCountryList({page: 1, pageSize: 10});
    //         console.log('res',res);
    //         this.options = res.data.list;
    //     }catch(e) {
    //         throw e;
    //     }
    // }
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