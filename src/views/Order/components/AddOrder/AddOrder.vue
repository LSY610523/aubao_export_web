<template>
  <el-dialog title="添加订单" 
    v-loading="loading"
    @open="load" 
    :visible.sync="dialogFormVisible" 
    width="65%" 
    :destroy-on-close="true">
    <el-form class="form-block" :label-width="formLabelWidth" :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="报送类型" prop="apptype">
         <el-select v-model="form.apptype" placeholder="请选择">
            <el-option
              v-for="item in submissionList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="业务状态" prop="appstatus">
         <el-select v-model="form.appstatus" placeholder="请选择">
            <el-option
              v-for="item in businessList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="报关模式" prop="appstatus">
         <el-select v-model="form.applyType" placeholder="请选择">
            <el-option
              v-for="item in applyTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <!-- <el-form-item label="申报海关"  >
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
      </el-form-item> -->
      <el-form-item label="订单个数">
        <el-input-number v-model="form.orderNum" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="毛重" prop="grossweight">
         <el-input v-model="form.grossweight"></el-input>
      </el-form-item>
      <el-form-item label="净重" prop="netweight">
         <el-input v-model="form.netweight"></el-input>
      </el-form-item>
      <!-- <el-form-item label="订单个数" prop="orderNum">
        <el-input-number  controls-position="right"   v-model="from.orderNum" :min="1"></el-input-number>
      </el-form-item> -->
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
          prop="gname"
          label="名称">
        </el-table-column>
  
        <el-table-column
          prop="qty"
          label="申报数量">
        </el-table-column>
        <el-table-column
          prop="unit.name"
          label="申报单位">
        </el-table-column>
        <el-table-column
          prop="qty1"
          label="法定数量">
        </el-table-column>
        <el-table-column
          prop="unit1.name"
          label="法定单位">
        </el-table-column>
        <el-table-column
          prop="qty2"
          label="第二数量">
        </el-table-column>
        <el-table-column
          prop="unit2.name"
          label="第二单位">
        </el-table-column>
      </el-table>
    </div>

    <add-goods :visibleGoods.sync="visibleGoods" @addGoodsItem="addGoodsItem"/>

    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="dialogFormVisible = false" >取 消</el-button>
      <el-button size="medium" type="primary" @click="addAdmin" :loading="addLoading">添加</el-button>
    </div>
  </el-dialog>
  
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import service from '@/service/index'
import { getCustomsList } from '@/api/dict.ts';
import AddGoods from '../AddGoods.vue';
import { addOrder } from '@/api/order.ts';

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
export default class AddOrder extends Vue implements Add{
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

  applyTypeList:Array<any> = [
    {value:1, label: '清单模式'},
    {value:2, label: '报关单模式'}
  ]

  customsList: Array<any> = [];

  declareList: Array<any> = [
    {value: 'A', label: '简化申报'},
    {value: 'B', label: '汇总申报'},
  ]

  tableData: Array<any> = [];

  form = {
    apptype: 1,
    appstatus: 1,
    // customs_import: null,
    // customs_export: null,
    // declare_type: null,
    // quantity: 0,
    grossweight: null,
    netweight: null,
    orderNum:null
    
  }
  formLabelWidth = '120px'
  rules: Object = {
    apptype: [
      { required: true, message: '请选择', trigger: 'blur' },
    ],
    appstatus: [
      { required: true, message: '请选择', trigger: 'blur' },
    ],
    grossweight: [
      { required: true, message: '请填入', trigger: 'blur' },
    ],
    netweight: [
      { required: true, message: '请填入', trigger: 'blur' },
    ],
  }
  dialogFormVisible = this.visible
  loading: boolean = true
  visibleGoods: boolean = false;
  addLoading: boolean = false;


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
    this.visibleGoods = true;
  }

  addGoodsItem(val) {
    this.tableData.push(val);
  }

  async addAdmin() {
    this.addLoading = true;
    try {
      (this.$refs['ruleForm'] as any).validate(async (valid) => {
        if (valid) {
          const goods = this.tableData.map(item => {
            return {
              ...item,
              unit: item.unit ? item.unit.code : null,
              unit1: item.unit1 ? item.unit1.code : null,
              unit2: item.unit2 ? item.unit2.code : null,
            }
          })
          const data = {
            ...this.form,
            goods,
          };
          this.dialogFormVisible = false;
          this.form = {
            apptype: 1,
            appstatus: 1,
            grossweight: null,
            netweight: null,
            orderNum:null
          };
          this.tableData = [];
          await addOrder(data);
          this.addLoading = false;
          this.$emit('getAdmin')
        } else {
          this.addLoading = false;
          return false;
        }
      });
    }catch(e) {
      throw e;
    }
  }

  async load() {
    try{
      await getCustomsList();
    }catch(e) {
      throw e;
    }
    this.loading = false;
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