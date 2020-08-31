<template>
  <el-dialog title="添加商品" 
    v-loading="loading"
    @open="load" 
    :visible.sync="dialogFormVisible" 
    v-dialogDrag 
    width="55%" 
    :destroy-on-close="true">
    <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="商品名称" :label-width="formLabelWidth" prop="gname">
        <el-input v-model="form.gname" autocomplete="off" class="formItem" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品编码" :label-width="formLabelWidth" prop="gcode">
        <el-input v-model="form.gcode" autocomplete="off" class="formItem" placeholder="请输入商品编码"></el-input>
      </el-form-item>
      <el-form-item label="商品条码" :label-width="formLabelWidth" prop="barcode">
        <el-input v-model="form.barcode" autocomplete="off" class="formItem" placeholder="请输入商品条码"></el-input>
      </el-form-item>
      <el-form-item label="规格型号" :label-width="formLabelWidth" prop="gmodel">
        <el-select v-model="form.gmodel" placeholder="请选择币种">
            <el-option
              v-for="item in units"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="企业商品货号" :label-width="formLabelWidth" prop="itemno">
        <el-input
          v-model="form.itemno"
          autocomplete="off"
          class="formItem"
          placeholder="请输入企业商品货号（SKU）"
        ></el-input>
      </el-form-item>
      <el-form-item label="企业商品名称" :label-width="formLabelWidth">
        <el-input
          v-model="form.itemname"
          autocomplete="off"
          class="formItem"
          placeholder="请输入企业商品名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="原产国" :label-width="formLabelWidth" prop="country">
        <!-- <el-input v-model="form.country" autocomplete="off" class="formItem" placeholder="请输入商品原产国"></el-input> -->
        <el-select v-model="form.country" placeholder="请选择原产国">
            <el-option
              v-for="item in options"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select> 
      </el-form-item>
      <el-form-item label="币种" :label-width="formLabelWidth" prop="currency">
        <el-input v-model="form.currency" autocomplete="off" class="formItem" placeholder="人民币" :disabled="true"></el-input>

         <!-- -->
      </el-form-item>
      <el-form-item label="单价" :label-width="formLabelWidth" prop="price">
        <el-input v-model="form.price" autocomplete="off" class="formItem" placeholder="请输入单价"></el-input>
      </el-form-item>
      <el-form-item label="备注 " :label-width="formLabelWidth">
        <el-input v-model="form.note" autocomplete="off" class="formItem" placeholder></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
      <el-button size="medium" type="primary" @click="saveGoods" :loading="btnLoading">添加</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import service from "@/service/index";
import { addGoods } from "@/api/goods.ts";
import { getCurrencyList, getUnitList } from '@/api/dict.ts';

interface Add {
  form: Object;
  formLabelWidth: String;
  dialogFormVisible: Boolean;
}

@Component
export default class AddAdmin extends Vue implements Add {
  @Prop() private visible!: Boolean;
  loading: boolean = true;
  btnLoading: boolean = false;

  data() {
    return {
      ruleForm: {
        gname: "",
        gcode: "",
        barcode: "",
        gmodel: "",
        itemno: "",
        country: "",
        currency: "142",
        price: "",
      },
      rules: {
        gname: [
          { required: true, message: "请输入商品名称", trigger: "change" },
        ],
        gcode: [
          { required: true, message: "请输入商品编码", trigger: "change" },
        ],
        barcode: [
          { required: true, message: "请输入商品条码", trigger: "change" },
        ],
        gmodel: [
          { required: true, message: "请输入商品规格型号", trigger: "change" },
        ],
        itemno: [
          {
            required: true,
            message: "请输入企业商品货号（SKU）",
            trigger: "change",
          },
        ],
        itemname: [
          { required: true, message: "请输入企业商品名称", trigger: "change" },
        ],
        country: [
          { required: true, message: "请输入商品原产国", trigger: "change" },
        ],
        currency: [
          {
            type: "string",
            required: true,
            message: "请输入币种",
            trigger: "change",
          },
        ],
        price: [{ required: true, message: "请输入单价", trigger: "change" }],
      },
    };
  }

  form = {
    gname: "",
    gcode: "",
    barcode: "",
    gmodel: "",
    itemno: "",
    country: "",
    currency: "",
    price: "",
  };

  formLabelWidth = "120px";
  dialogFormVisible = this.visible;

  options = [];
  units = [];

  @Watch("visible")
  onVisibleChange(val: Boolean, oldVal: Boolean) {
    this.dialogFormVisible = val;
    for (let key in this.form) {
      this.form[key] = "";
    }
  }

  @Watch("dialogFormVisible")
  onDialogFormVisibleChange(val: Boolean, oldVal: Boolean) {
    if (!val) {
      this.$emit("getChildData", val);
    }
  }

  // public addAdmin() {
  //   service.postAdminList(this.form).then((res) => {
  //     this.dialogFormVisible = false;
  //     let { code, msg } = res.data;
  //     if (code == 0) {
  //       this.$message({
  //         message: msg,
  //         type: "success",
  //       });
  //     }
  //     this.$emit("getAdmin");
  //   });
  // }

  async saveGoods() {
    this.btnLoading = true;
    try {
      await addGoods(this.form);
      this.dialogFormVisible = false;
      this.$emit("getAdmin");
      this.$message({
        message: '保存成功',
        type: "success"
      })
    }catch(e) {
      throw e;
      this.$message({
        message: '保存失败',
        type: "error"
      })
    }
    this.btnLoading = false;
  }

  async load() {
    try {
      const res = await getCurrencyList();
      this.options = res.data;
      this.loading = false;
      const res1 = await getUnitList();
      this.units = res1.data;
      console.log('res currency',res);
    }catch(e) {
      throw e;
    }
  }

   
}
</script>

<style lang="less" scoped>
.formItem {
  width: 200px;
  float: left;
}
</style>