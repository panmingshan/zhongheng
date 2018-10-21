<template>
    <div id="header">
        <div class="logo">

        </div>
        <div class="nav">
            <ul>
                <li router-link="/adf">
                    <router-link to="/" tag="li" exact-active-class = "headerBarActive">
                        首页
                    </router-link>
                </li>
                <li>
                    <router-link to="/softWareDownload" tag="li" exact-active-class = "headerBarActive">
                        软件下载
                    </router-link>
                </li>
                <li>
                    <router-link to="/aboutUs" tag="li" exact-active-class = "headerBarActive">
                        联系我们
                    </router-link>
                </li>
                <li>
                    <router-link to="/materialDown" tag="li" exact-active-class = "headerBarActive">
                        资料下载
                    </router-link>
                </li>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" scoped type="text/less">
    @import "../../../css/common.less";
    @import "../../../css/config.less";
    #header{
        width: @width;
        display: block;
        margin: auto;
        padding: 5px 0;
        .clear;
        .logo{
            float: left;
            width : 300px;
            background: url("../../../assets/header/logo.png") no-repeat center;
            background-size: contain;
            height: 80px;
        }
        .nav{
            float: right;
            font-size: 16px;
            text-align: center;
            margin-top: 25px;
            >ul{
                >li{
                    float: left;
                    height: 30px;
                    line-height: 30px;
                    width: 100px;
                    cursor: pointer;
                    color: #555;
                    transition: all 0.3s;
                    &:hover{
                        color: @colorRed;
                    }
                }
            }
        }
    }
</style>
<script>
    export default{
        data (){
            return {}
        }
    }
</script>