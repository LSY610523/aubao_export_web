<template>
    <el-dialog title="添加商品" 
        v-loading="loading"
        @open="load" 
        :visible.sync="visible" 
        width="55%" 
        append-to-body
        :destroy-on-close="true">
        <el-form class="form-block" :label-width="formLabelWidth" :model="form" :rules="rules" ref="ruleForm">
            <el-form-item label="商品">
                <el-select v-model="form.id" placeholder="请选择">
                    <el-option
                    v-for="item in goodsList"
                    :key="item.id"
                    :label="item.itemname"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规格"  >
                <el-input v-model="form.specification"></el-input>
            </el-form-item>
            <el-form-item label="申报数量"  >
                <el-input-number controls-position="right" v-model="form.quantity" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="申报单位"  >
                <el-input v-model="form.unit"></el-input>
            </el-form-item>
            <el-form-item label="法定数量"  >
                <el-input-number controls-position="right" v-model="form.legal_quantity" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="法定单位"  >
                <el-input v-model="form.legal_unit"></el-input>
            </el-form-item>
            <el-form-item label="第二数量"  >
                <el-input-number controls-position="right" v-model="form.second_quantity" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="第二单位"  >
                <el-input v-model="form.second_unit"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="medium" @click="visible = false" >取 消</el-button>
            <el-button size="medium" type="primary" @click="addgoodsItem">添加</el-button>
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
            form: {
                specification: null,
                id: null,
                quantity: 0,
                unit: null,
                legal_quantity: 0,
                legal_unit: null,
                second_quantity: 0,
                second_unit: null,
            },
            rules: {},
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
                console.log('res goods', res)
                res.data && (this.goodsList = res.data.list);

            }catch(e) {
                throw e;
            }
            this.loading = false;
        },
        addgoodsItem() {
            if(Object.keys(this.form).every(key => this.form[key])) {
                const goods = this.goodsList.filter(key => key.id === this.form.id);
                const data = {
                    ...this.form,
                    name: goods['itemname'],
                };
                this.$emit('addGoodsItem',data);
                this.visible = false;
            }
           
        }
    },
    created() {
        console.log('visible',this.visibleGoods);
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