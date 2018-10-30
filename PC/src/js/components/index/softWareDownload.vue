<template>
    <div class="content">
        <div class="banner">
            <div class="banner_p">
                <div style="width:445px;margin:0 auto;">
                    <div class="qw">
                        <ul>
                            <li class="qw_1">
                                中恒期权 BEST&amp;INVEST
                            </li>
                            <li class="qw_2">
                                中 流 砥 柱 <span>日 升 月 恒</span>
                            </li>
                            <li class="qw_3">
                                中恒期权管理   &nbsp;&nbsp;基金  &nbsp;&nbsp;股票  &nbsp;&nbsp;股权  &nbsp;&nbsp;咨询  &nbsp;&nbsp;策划
                            </li>
                            <ul>
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="downlist">
            <ul>
                <li v-for="(item,index) in downList" @click="download(item)" :key="index" :style="{cursor : item.url?'pointer':'auto'}">
                    <div :class="item.class">

                    </div>
                    <p>
                        {{item.info}}
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" scoped type="text/less">
    @import "../../../css/common.less";
    @import "../../../css/config.less";
    .content{
        .banner{
            min-width: @width;
            height: 350px;
            background: url("../../../assets/test2.jpg") no-repeat center;
            background-size: cover;
            position: relative;
            .banner_p{
                width: @width;
                margin: auto;
                position:absolute;top:0px;left:120px;height:390px;z-index:100;
                /*横幅*/
                .qw{
                    background:url("../../../assets/border_1.png") no-repeat 0 8px;height:96px;margin-top:80px;
                    >ul{
                        padding-top: 7px;
                    }
                }
                .qw_1{margin:0px;padding:0px;padding-left:120px;color:white;font-size:13px;}
                .qw_2{padding-left:40px;font-size:33px;font-weight:bold;color:#EA3939;margin-top: 7px;}
                .qw_2 span{color:black;padding-left:20px;}
                .qw_3{color:white;padding-left:50px;font-size:13px;margin-top: 6px;}
            }
        }
        .logo{
            background-image: url("../../../assets/logo_1.png");
        }
        .QR{
            background-image: url("../../../assets/app-01.png");
        }
        .QR_ios{
            background-image: url("../../../assets/ios-01.jpg");
        }
        .downlist{
            width: @width;
            margin: auto;
            padding: 50px 0;
            >ul{
                .clear();
                li{
                    padding: 25px 10px;
                    float: left;
                    width: 23%;
                    margin-right: 15%;
                    box-shadow: 1px 1px 8px 3px #eee;
                    transition: all 0.3s;
                    &:hover{
                        /*box-shadow: 1px 1px 8px 3px #EA6B60;*/
                        box-shadow: 1px 1px 8px 3px #ccc;
                    }
                    &:nth-child(3n){
                        margin-right: 0;
                    }
                    border: 1px solid #ccc;
                    >div{
                        height: 320px;
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: center;
                    }
                    >P{
                        margin-top: 15px;
                        text-align: center;
                        height: 30px;
                        line-height: 30px;
                    }
                }
            }
        }
    }
</style>
<script>
    export default{
        data (){
            return {
                downList : [
//                    {
//                        info : "中恒期权MINI版安装包",
//                        url : "http://47.93.42.162:8082/中恒期权MINI版安装包.exe",
//                        class : "logo"
//                    },
                    {
                        info : "中恒期权标准版安装包",
                        url : "http://47.93.42.162:8082/中恒期权标准版安装包.exe",
                        class : "logo"
                    },
                    {
                        info : "",
                        url : "",
                        class : "QR"
                    },
                    {
                        info : "",
                        url : "",
                        class : "QR_ios"
                    },
                ]
            }
        },
        methods : {
            download(item){
                if(item.url){
                    location.href = item.url
                }
            }
        }
    }
</script>