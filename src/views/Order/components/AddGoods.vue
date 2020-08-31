<template>
    <el-dialog title="添加商品" 
        v-loading="loading"
        @open="load" 
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
            <el-form-item label="规格"  prop="specification">
                <el-input v-model="form.specification"></el-input>
            </el-form-item>
            <el-form-item label="申报数量"  prop="qty">
                <el-input-number controls-position="right" v-model="form.qty" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="申报单位"  prop="unit">
                <el-input v-model="form.unit"></el-input>
            </el-form-item>
            <el-form-item label="法定数量" prop="qty1">
                <el-input-number controls-position="right" v-model="form.qty1" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="法定单位" prop="unit1">
                <el-input v-model="form.unit1"></el-input>
            </el-form-item>
            <el-form-item label="第二数量" prop="qty2">
                <el-input-number controls-position="right" v-model="form.qty2" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="第二单位" prop="unit2">
                <el-input v-model="form.unit2"></el-input>
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
            formLabelWidth: '120px',
            submitLoading: false,
            form: {
                specification: null,
                id: null,
                qty: 0,
                unit: null,
                qty1: 0,
                unit1: null,
                qty2: 0,
                unit2: null,
            },
            rules: {
                specification: [
                    { required: true, message: '请输入规格', trigger: 'blur' },
                ],
                id: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                qty: [
                    { required: true, message: '请填入', trigger: 'blur' },
                ],
                unit: [
                    { required: true, message: '请填入', trigger: 'blur' },
                ],
                qty1: [
                    { required: true, message: '请填入', trigger: 'blur' },
                ],
                unit1: [
                    { required: true, message: '请填入', trigger: 'blur' },
                ],
                qty2: [
                    { required: true, message: '请填入', trigger: 'blur' },
                ],
                unit2: [
                    { required: true, message: '请填入', trigger: 'blur' },
                ],
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
            }catch(e) {
                throw e;
            }
            this.loading = false;
        },
        addgoodsItem() {
            this.submitLoading = true;
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    const goods = this.goodsList.find(key => key.id === this.form.id);
                    const data = {
                        ...this.form,
                        ...goods,
                    }
                    this.submitLoading = false;
                    this.$emit('addGoodsItem',data);
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