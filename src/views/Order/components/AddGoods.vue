<template>
    <el-dialog title="添加商品" 
        v-loading="loading"
        @open="load" 
        @close="closeDialog"
        :visible.sync="visible" 
        width="55%" 
        append-to-body
        :destroy-on-close="true">
        <el-form class="form-block" :label-width="formLabelWidth" :model="form" :rules="rules" ref="ruleForm">
            <el-form-item label="商品" prop="id">
                <el-select v-model="form.id" placeholder="请选择">
                    <el-option
                    v-for="item in goodsList"
                    :key="item.id"
                    :label="item.gname"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="规格"  prop="specification">
                <el-input v-model="form" disabled></el-input>
            </el-form-item> -->
            <el-form-item label="申报数量"  prop="qty">
                <el-input-number controls-position="right" v-model="form.qty" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="申报单位"  prop="unit">
                <el-select v-model="form.unit" value-key="code" placeholder="请选择">
                    <el-option
                    v-for="item in unitList"
                    :key="item.code"
                    :label="item.name"
                    :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="法定数量" prop="qty1">
                <el-input-number controls-position="right" v-model="form.qty1" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="法定单位" prop="unit1">
                <el-select v-model="form.unit1" value-key="code" placeholder="请选择">
                    <el-option
                    v-for="item in unitList"
                    :key="item.code"
                    :label="item.name"
                    :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="第二数量" prop="qty2">
                <el-input-number controls-position="right" v-model="form.qty2" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="第二单位" prop="unit2">
                <el-select v-model="form.unit2" value-key="code" placeholder="请选择">
                    <el-option
                    v-for="item in unitList"
                    :key="item.code"
                    :label="item.name"
                    :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="medium" @click="visible = false" >取 消</el-button>
            <el-button size="medium" type="primary" :loading="submitLoading" @click="addgoodsItem">添加</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { getGoodsList } from '@/api/goods.ts';
import { getUnitList } from '@/api/dict.ts';

export default {
    props: {
        visibleGoods: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            loading: true,
            visible: false,
            goodsList: [],
            unitList: [],
            formLabelWidth: '120px',
            submitLoading: false,
            form: {
                 id: null,
                qty: null,
                unit: null,
                    
            },
            rules: {
                
                id: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                qty: [
                    { required: true, message: '请填入', trigger: 'blur' },
                ],
                unit: [
                    { required: true, message: '请填入', trigger: 'blur' },
                ] 
                
            },
        }
    },
    watch: {
        visibleGoods(val) {
            this.visible = val
        }
    },
    methods: {
        async load() {
            try{
                const res = await getGoodsList({page: 1, pageSize: 10});
                res.data && (this.goodsList = res.data.list);
                const { data } = await getUnitList();
                data && (this.unitList = data);
            }catch(e) {
                throw e;
            }
            this.loading = false;
        },
        closeDialog() {
            this.$emit('update:visibleGoods',false);
        },
        addgoodsItem() {
            this.submitLoading = true;
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    const goods = this.goodsList.find(key => key.id === this.form.id);
                    this.submitLoading = false;
                    this.$emit('addGoodsItem',{...this.form,...goods});
                    Object.keys(this.form).forEach(key => this.form[key] = null);
                    this.visible = false;
                    this.$emit('update:visibleGoods', false);
                } else {
                    this.submitLoading = false;
                    return false;
                }
            });
        }
    },
    created() {
        this.visible = this.visibleGoods;
    }
}
</script>

<style lang="scss" scoped>
.form-block {
    display: flex;
    flex-wrap: wrap;
}
</style>