<template>
    <div class="login-page">
        <div class="login-form">
            <img class="logo-img" src="@/assets/login.gif" alt="">
            <el-form :model="loginForm" :rules="rules" ref="ruleForm" label-position="left" label-width="80px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="loginForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" class="login-btn" style="width: 100%">登录</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                name: '',
                password: '',
            },
             rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
             }
        }
    }
}
</script>

<style lang="scss" scoped>
.login-page {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, rgb(147, 217, 220), rgb(224, 226, 226));
    display: flex;
    justify-content: center;
    align-items: center;

    .login-form {
        position: absolute;
        background-color: white;
        padding: 30px 100px;
        border-radius: 5px;
        box-shadow: 6px 8px 10px rgb(201, 201, 201);

        .logo-img {
            margin-bottom: 20px;
        }

        .login-btn {
            background: rgb(49, 203, 206);
            border: 0;
        }
    }
}
</style>