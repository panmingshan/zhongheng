<template>
    <div class="contentWrap">
        <div class="content">
            <div class="left">
                <dl>
                    <dt>
                        关于我们
                    </dt>
                    <dd @click="toDetail(item,index)" :class="{active : (index == activeIndex)}" v-for="(item,index) in infoList" :key="index">
                        {{item.title}}
                    </dd>
                </dl>
            </div>
            <div class="right" v-if="detail">
                <img :src="detail.imgUrl" style="width: 100%;display: block;">
                <!--<div>-->
                    <!--<h6 v-text="detail.title">-->

                    <!--</h6>-->
                    <!--<p v-text="detail.time">-->

                    <!--</p>-->
                    <!--<div class="detail">-->
                        <!--{{detail.info}}-->
                    <!--</div>-->
                <!--</div>-->
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
                    &:hover,&.active{
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
                activeIndex : 0,
                infoList : [
                    {
                        title : "公司简介",
                        imgUrl : "https://zhonghengqiquan.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E5%8F%B8%E6%A6%82%E5%86%B5.png?Expires=1540129410&OSSAccessKeyId=TMP.AQGVn-sfrwHwk5_OSgVJoCPzN-AJcRwimGmdxx4N01ZgKqm3BZErlZ9obyT3ADAtAhRfEJwLMsc9f5NNwI0058n8orxEVAIVANciNXM9tA8HLCbCCGS8RBqR-FnD&Signature=Wweuw8VF2EOVD2L2qmAoHQ0Gc2c%3D",
                        time : "2018-10-20"
                    },
                    {
                        title : "公司宗旨",
                        imgUrl : "https://zhonghengqiquan.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E5%8F%B8%E5%AE%97%E6%97%A8.png?Expires=1540129441&OSSAccessKeyId=TMP.AQGVn-sfrwHwk5_OSgVJoCPzN-AJcRwimGmdxx4N01ZgKqm3BZErlZ9obyT3ADAtAhRfEJwLMsc9f5NNwI0058n8orxEVAIVANciNXM9tA8HLCbCCGS8RBqR-FnD&Signature=jDVX0nSyq6JyMYw4%2BD2rR1PPyCI%3D",
                        time : "2018-10-20"
                    },
                    {
                        title : "企业文化",
                        imgUrl : "https://zhonghengqiquan.oss-cn-beijing.aliyuncs.com/%E4%BC%81%E4%B8%9A%E6%96%87%E5%8C%96.png?Expires=1540129471&OSSAccessKeyId=TMP.AQGVn-sfrwHwk5_OSgVJoCPzN-AJcRwimGmdxx4N01ZgKqm3BZErlZ9obyT3ADAtAhRfEJwLMsc9f5NNwI0058n8orxEVAIVANciNXM9tA8HLCbCCGS8RBqR-FnD&Signature=qUH%2FjGL8HxNStey7qJt%2BZVQMl1E%3D",
                        time : "2018-10-20"
                    },
                    {
                        title : "产品特色",
                        imgUrl : "https://zhonghengqiquan.oss-cn-beijing.aliyuncs.com/%E4%BA%A7%E5%93%81%E7%89%B9%E8%89%B2.png?Expires=1540129507&OSSAccessKeyId=TMP.AQGVn-sfrwHwk5_OSgVJoCPzN-AJcRwimGmdxx4N01ZgKqm3BZErlZ9obyT3ADAtAhRfEJwLMsc9f5NNwI0058n8orxEVAIVANciNXM9tA8HLCbCCGS8RBqR-FnD&Signature=S1fYlzK2Ma3uEL59f1DXi7gqy2g%3D",
                        time : "2018-10-20"
                    },
                    {
                        title : "团队介绍",
                        imgUrl : "https://zhonghengqiquan.oss-cn-beijing.aliyuncs.com/%E5%9B%A2%E9%98%9F%E4%BB%8B%E7%BB%8D.png?Expires=1540129522&OSSAccessKeyId=TMP.AQGVn-sfrwHwk5_OSgVJoCPzN-AJcRwimGmdxx4N01ZgKqm3BZErlZ9obyT3ADAtAhRfEJwLMsc9f5NNwI0058n8orxEVAIVANciNXM9tA8HLCbCCGS8RBqR-FnD&Signature=gFYMumPsWOSTlp6DMmtF%2Fg3aO1Q%3D",
                        time : "2018-10-20"
                    },
                    {
                        title : "服务与运营",
                        imgUrl : "https://zhonghengqiquan.oss-cn-beijing.aliyuncs.com/%E6%9C%8D%E5%8A%A1%E4%B8%8E%E8%BF%90%E8%90%A5.png?Expires=1540129546&OSSAccessKeyId=TMP.AQGVn-sfrwHwk5_OSgVJoCPzN-AJcRwimGmdxx4N01ZgKqm3BZErlZ9obyT3ADAtAhRfEJwLMsc9f5NNwI0058n8orxEVAIVANciNXM9tA8HLCbCCGS8RBqR-FnD&Signature=si3f3zcui7MT1Kqi46O%2Fsv6CtXM%3D",
                        time : "2018-10-20"
                    },
                ]
            }
        },
        created(){
            this.detail = this.infoList[0];
        },
        methods : {
            toDetail(item,index){
                this.detail = item;
                this.activeIndex = index;
            }
        }
    }
</script>