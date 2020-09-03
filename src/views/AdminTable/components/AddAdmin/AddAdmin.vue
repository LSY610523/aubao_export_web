<template>
  <el-dialog title="添加订单" 
    v-loading="loading"
    @open="load" 
    :visible.sync="dialogFormVisible" 
    width="65%" 
    :destroy-on-close="true">
    <el-form class="form-block" :label-width="formLabelWidth" :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="报送类型">
         <el-select v-model="form.submission_type" placeholder="请选择">
            <el-option
              v-for="item in submissionList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="业务状态"  >
         <el-select v-model="form.business_status" placeholder="请选择">
            <el-option
              v-for="item in businessList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="申报海关"  >
         <el-select v-model="form.customs_import" placeholder="请选择">
            <el-option
              v-for="item in customsList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="口岸海关"  >
         <el-select v-model="form.customs_export" placeholder="请选择">
            <el-option
              v-for="item in customsList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="申报类型"  >
         <el-select v-model="form.declare_type" placeholder="请选择">
            <el-option
              v-for="item in declareList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="件数"  >
         <el-input-number controls-position="right" v-model="form.quantity" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="毛重"  >
         <el-input v-model="form.gross_weight"></el-input>
      </el-form-item>
      <el-form-item label="净重"  >
         <el-input v-model="form.net_weight"></el-input>
      </el-form-item>
    </el-form>

    <div class="goods-select">
      <div class="title">
        <span>商品</span>
        <el-button type="primary" size="mini" @click="changeVisible">选择商品</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="商品id">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="specification"
          label="规格">
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="申报数量">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="申报单位">
        </el-table-column>
        <el-table-column
          prop="legal_quantity"
          label="法定数量">
        </el-table-column>
        <el-table-column
          prop="legal_unit"
          label="法定单位">
        </el-table-column>
        <el-table-column
          prop="second_quantity"
          label="第二数量">
        </el-table-column>
        <el-table-column
          prop="second_unit"
          label="第二单位">
        </el-table-column>
      </el-table>
    </div>

    <add-goods :visibleGoods="visibleGoods" @addGoodsItem="addGoodsItem"/>

    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="dialogFormVisible = false" >取 消</el-button>
      <el-button size="medium" type="primary" @click="addAdmin">添加</el-button>
    </div>
  </el-dialog>
  
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import service from '@/service/index'
import { getCustomsList } from '@/api/dict.ts';
import AddGoods from '../AddGoods.vue';

interface Add {
  form: Object
  formLabelWidth: String
  dialogFormVisible: Boolean
}

@Component({
  components: {
    AddGoods,
  }
})
export default class AddAdmin extends Vue implements Add{
  @Prop() private visible!: Boolean
  

  submissionList: Array<any> = [
    {value: 1, label: '新增'},
    {value: 2, label: '变更'},
    {value: 3, label: '删除'}
  ];

  businessList: Array<any> = [
    {value: 1, label: '暂存'},
    {value: 2, label: '申报'},
  ];

  customsList: Array<any> = [];

  declareList: Array<any> = [
    {value: 'A', label: '简化申报'},
    {value: 'B', label: '汇总申报'},
  ]

  tableData: Array<any> = [];

  form = {
    submission_type: 1,
    business_status: 1,
    customs_import: null,
    customs_export: null,
    declare_type: null,
    quantity: 0,
    gross_weight: 0,
    net_weight: 0,
  }
  formLabelWidth = '120px'
  rules: Object = {
    submission_type: [
      { required: true, message: '请选择', trigger: 'blur' },
    ]
  }
  dialogFormVisible = this.visible
  loading: boolean = false
  visibleGoods: boolean = false;


  @Watch('visible')
  onVisibleChange(val: Boolean, oldVal: Boolean) {
    this.dialogFormVisible = val
    // for (let key in this.form) {
    //   this.form[key] = ''
    // }
  }

  @Watch('dialogFormVisible')
  onDialogFormVisibleChange(val: Boolean, oldVal: Boolean) {
    if (!val) {
      this.$emit('getChildData', val)
    }
  }

  changeVisible() {
    console.log('click me');
    this.visibleGoods = true;
  }

  addGoodsItem(val) {
    this.tableData.push(val);
  }

  public addAdmin() {
    service.postAdminList(this.form).then(res => {
      this.dialogFormVisible = false
      let { code, msg } = res.data
      if (code == 0) {
        this.$message({
          message: msg,
          type: 'success'
        })
      }
      this.$emit('getAdmin')
    })
  }

  async load() {
    // this.loading = false;
    try{
      await getCustomsList();
    }catch(e) {
      throw e;
    }
  }
}
</script>

<style lang="less" scoped>
.form-block {
  display: flex;
  flex-wrap: wrap;
}

.goods-select {
  margin: 5px 20px;

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    span {
      padding-right: 10px;
    }
  }
}
</style>