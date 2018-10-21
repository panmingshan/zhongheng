<template>
    <div id="footerWrap">
        <div id="footer">
            <div class="top">
                <p>
                    版权所有 © 中恒期权公司 保留一切权利
                </p>
                <p>
                    业务咨询QQ：1610988580
                </p>
            </div>
            <p class="bottom">
                中恒期权 版权所有 Copyright ©2017-2018</a>
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
                padding: 30px 0;
                .clear;
                >p{
                    float: left;
                    width: 50%;
                    text-align: center;
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