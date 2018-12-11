<template>
    <div class="content">
        <div class="banner">
            <div class="banner_p">
                <div style="width:445px;margin:0 auto;">
                    <div class="qw">
                        <ul>
                            <li class="qw_1">
                                中恒50 BEST&amp;INVEST
                            </li>
                            <li class="qw_2">
                                中 流 砥 柱 <span>日 升 月 恒</span>
                            </li>
                            <li class="qw_3">
                                中恒50管理   &nbsp;&nbsp;基金  &nbsp;&nbsp;股票  &nbsp;&nbsp;股权  &nbsp;&nbsp;咨询  &nbsp;&nbsp;策划
                            </li>
                            <ul>
                            </ul>
                        </ul>
                    </div>
                </div>
                <!--<div class="fg_dh">-->
                    <!--<span>咨询电话</span> <span>0760-22517081</span>-->
                <!--</div>-->
            </div>
        </div>
        <div class="downlist">
            <div class="materialDown">
                资料下载
            </div>
            <ul>
                <li v-for="(item,index) in downList" @click="download(item)" :key="index">
                    <i :class="item.class">

                    </i>
                    <div>
                        {{item.info}}
                    </div>
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
                .fg_dh{
                    font-size: 0;
                    background:url("../../../assets/softDownloadBg_1.png") no-repeat;
                    height:32px;width:212px;
                    margin:0 auto;
                    margin-top:50px;color:white;
                    font-size:14px;
                    padding-top:6px;
                    padding-left:20px;
                    &>span{
                        display: inline-block;
                        font-size: 13px;
                        &:last-child{
                            margin-left: 31px;
                        }
                    }
                }
            }
        }
        .word{
            background-image: url("../../../assets/word.jpg");
        }
        .ppt{
            background-image: url("../../../assets/pptx.jpg");
        }
        .exe{
            background-image: url("../../../assets/exe.png");
        }
        .downlist{
            width: @width;
            margin: auto;
            padding: 50px 0;
            .materialDown{
                position: relative;
                padding-left: 30px;
                font-size: 18px;
                font-weight: bold;
                color: #333;
                &:before{
                    position: absolute;
                    display: block;
                    content: "";
                    left : 0;
                    top : 0;
                    width: 5px;
                    background-color: #39A1EA;
                    height: 100%;
                }
            }
            >ul
            {
                margin-top: 20px;
                >li{
                    cursor: pointer;
                    padding: 5px 0;
                    padding-left: 20px;
                    /*border-bottom: 1px solid #ccc;*/
                    >*{
                        display: inline-block;
                        vertical-align: middle;
                    }
                    >i{
                        width: 40px;
                        height: 40px;
                        margin-right: 10px;
                        background-size: contain;
                        background-position: center;
                        background-repeat: no-repeat;
                    }
                    &:hover{
                        color: #EA3939;
                        /*box-shadow: 1px 1px 8px 3px #ccc;*/
                    }
                    >div:hover{
                        text-decoration: underline;
                    }
                    &:not(:first-child){
                        margin-top: 10px;
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
//                        info : "中恒50ETF基础知识.doc",
//                        url : "https://zhonghengqiquan.oss-cn-beijing.aliyuncs.com/%E4%B8%AD%E6%81%9250ETF%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.doc",
//                        class : "word"
//                    },
//                    {
//                        info : "中恒50使用说明（标准版）.doc",
//                        url : "https://zhonghengqiquan.oss-cn-beijing.aliyuncs.com/%E4%B8%AD%E6%81%9250%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E%EF%BC%88%E6%A0%87%E5%87%86%E7%89%88%EF%BC%89.doc",
//                        class : "word"
//                    },
                      {
                        info : "支付宝支付.pptx",
                        url : "https://zhonghengqiquan.oss-cn-beijing.aliyuncs.com/%E6%94%AF%E4%BB%98%E5%AE%9D%E6%94%AF%E4%BB%98.pptx",
                        class : "ppt"
                      },
                      {
                        info : "中恒50模拟客户端安装包.exe",
                        url : "http://zhonghengqiquan.oss-cn-beijing.aliyuncs.com/%E4%B8%AD%E6%81%9250%E6%A8%A1%E6%8B%9F%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AE%89%E8%A3%85%E5%8C%85.exe",
                        class : "exe"
                      },
//                    {
//                        info : "资管说明书.doc",
//                        url : "https://zhonghengqiquan.oss-cn-beijing.aliyuncs.com/%E8%B5%84%E7%AE%A1%E8%AF%B4%E6%98%8E%E4%B9%A6.doc",
//                        class : "word"
//                    },
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