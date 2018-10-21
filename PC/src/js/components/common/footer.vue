<template>
    <div id="footerWrap">
        <div id="footer">
            <div class="top">
                <div class="top_left">
                    <p>
                        版权所有 © XXXXX公司 保留一切权利
                    </p>
                    <p>
                        业务咨询电话：0760-22517081 / 0760-22517082
                    </p>
                </div>
                <div class="top_right">
                    <div class="QR_img">

                    </div>
                    <div class="QR_info">
                        扫描二维码  下载安装包
                    </div>
                </div>
            </div>
            <p class="bottom">
                中恒期权 版权所有 Copyright ©20017-2018</a>
            </p>
        </div>
    </div>
</template>
<style lang="less" scoped type="text/less">
    @import "../../../css/common.less";
    @import "../../../css/config.less";
    #footerWrap{
        background: #999;
        color: white;
        #footer{
            letter-spacing: 1px;
            width: @width;
            display: block;
            margin: auto;
            padding: 30px 0;
            .top{
                margin-bottom: 20px;
                .clear;
                .top_left{
                    float: left;
                    width: 600px;
                    >p{
                        margin-top: 35px;
                    }
                }
                .top_right{
                    float: right;
                    width: 400px;
                    .QR_img{
                        width: 140px;
                        height: 140px;
                        background: url("../../../assets/ewm.jpg") no-repeat center;
                        background-size: contain;
                        display: inline-block;
                    }
                    .QR_info{
                        display: inline-block;
                        vertical-align: bottom;
                        margin-left: 5px;
                        line-height: 30px;
                    }
                }
            }
            .bottom {
                font-size: 16px;
                text-align: center;
                margin-top: 25px;
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