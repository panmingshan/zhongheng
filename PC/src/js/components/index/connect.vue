<template>
    <div class="contentWrap">
        <div class="content">
            <div class="left">
                <dl>
                    <dt>
                        关于我们
                    </dt>
                    <dd @click="toDetail(item)" v-for="(item,index) in infoList" :key="index">
                        {{item.title}}
                    </dd>
                </dl>
            </div>
            <div class="right" v-if="detail">
                <div>
                    <h6 v-text="detail.title">

                    </h6>
                    <p v-text="detail.time">

                    </p>
                    <div class="detail">
                        {{detail.info}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped type="text/less">
    @import "../../../css/common.less";
    @import "../../../css/config.less";
    .contentWrap{
        background-color: #f5f5f5;
        .content{
            width: @width;
            margin: auto;
            padding: 10px 0;
            min-height: 600px;
            .clear;
            .left{
                border: 1px solid #d3d3d3;
                float: left;
                width: 192px;
                >dl>*{
                    padding: 12px 0;
                    &:not(:first-child){
                        border-top: 1px solid #d3d3d3;
                        padding: 7px 0;
                        background-color: white;
                        text-indent: 15px;
                    }
                }
                dt{
                    font-size: 16px;
                    color: #333;
                    text-indent: 7px;
                    background: #f1f1f1;
                }
                dd{
                    cursor: pointer;
                    &:hover{
                        color: #39A1EA;
                    }
                }
            }
            .right{
                float: right;
                width: 990px;
                background-color: white;
                padding: 30px 40px;
                >div{
                    h6{
                        font-size: 16px;
                        color: #333;
                        text-align: center;
                        font-weight: bold;
                    }
                    >p{
                        text-align: center;
                        padding: 20px 0 10px 0;
                        border-bottom: 1px solid #ccc;
                    }
                    .detail{
                        text-indent: 2em;
                        padding: 25px 5px;
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
                detail : "",
                infoList : [
                    {
                        title : "公司简介",
                        info : "公司简介公司简介公司简介公司简介公司简介公司简介公司简介",
                        time : "2018-10-20"
                    },
                    {
                        title : "免责条款",
                        info : "免责条款免责条款免责条款免责条款免责条款免责条款",
                        time : "2018-10-20"
                    },
                    {
                        title : "免责条款",
                        info : "免责条款免责条款免责条款免责条款免责条款免责条款",
                        time : "2018-10-20"
                    },
                    {
                        title : "免责条款",
                        info : "免责条款免责条款免责条款免责条款免责条款免责条款",
                        time : "2018-10-20"
                    },
                    {
                        title : "免责条款",
                        info : "免责条款免责条款免责条款免责条款免责条款免责条款",
                        time : "2018-10-20"
                    },
                    {
                        title : "免责条款",
                        info : "免责条款免责条款免责条款免责条款免责条款免责条款",
                        time : "2018-10-20"
                    },
                    {
                        title : "免责条款",
                        info : "免责条款免责条款免责条款免责条款免责条款免责条款",
                        time : "2018-10-20"
                    },
                ]
            }
        },
        created(){
            this.detail = this.infoList[0];
        },
        methods : {
            toDetail(item){
                this.detail = item;
            }
        }
    }
</script>