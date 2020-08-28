<template>
    <div class="menu-page">
        
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo my-menu"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse">

            <div class="collapse" @click="isCollapse = !isCollapse">
                <img v-if="isCollapse" src="@/assets/trangle_right.png">
                <img v-else src="@/assets/trangle_left.png">
            </div>

            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>电子订单管理</span>
                </template>
                <el-menu-item-group>
                    <!-- <template slot="title">分组一</template> -->
                    <el-menu-item index="1-1">电子订单列表</el-menu-item>
                    <el-menu-item index="1-2">产品明细列表</el-menu-item>
                </el-menu-item-group>
                <!-- <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu> -->
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>出口清单管理</span>
                </template>
                <el-menu-item-group>
                    <!-- <template slot="title">分组一</template> -->
                    <el-menu-item index="2-1">出口清单列表</el-menu-item>
                    <el-menu-item index="2-2">清单产品明细</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: false,
        }
    },
    methods: {
        handleOpen() {},
        handleClose() {},
    }
}
</script>

<style lang="scss" scoped>
.menu-page {
    height: 100%;
    display: flex;
    

    .my-menu {
        position: relative;
        padding-top: 20px;
        .collapse {
            position: absolute;
            top: 5px;
            right: 5px;
            z-index: 100;

            img {
                width: 16px;
                height: 16px;
            }
        }
    }

    
}
</style>