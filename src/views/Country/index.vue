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
       
    </div>
</template>

<script>
import { getCountryList } from '@/api/dict.ts';

export default {
    data() {
        return {
            options: [],
            value: null,
        }
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

<style lang="scss" scoped>

</style>