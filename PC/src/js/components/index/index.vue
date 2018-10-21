<template>
    <div class="content">
        <div class="banner">
            <!--<banner-pendant></banner-pendant>-->
        </div>
        <div class="msg">
            <div class="slogan">
                <ul>
                    <li>
                        <div>
                            <span class="one"></span>
                            <div class="rightWrap">
                                <div>灵活快捷</div>
                                <p>闪电提现，十分钟到账保证金到账即可交易</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span class="two"></span>
                            <div class="rightWrap">
                                <div>超低费用</div>
                                <p>最低3000起投，最高10倍杠杆</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span class="three"></span>
                            <div class="rightWrap">
                                <div>100%真实安全</div>
                                <p>行情软件可见委托挂单、成交数据资金第三方，易宝支付监管</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span class="four"></span>
                            <div class="rightWrap">
                                <div>交易保障</div>
                                <p>采用恒生电子（上市公司，阿里控股）专业股票交易软件</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="msgItem">
                <dl>
                    <dt>
                        文章资讯
                    </dt>
                    <dd>
                        <ul>
                            <li>
                                <p>科恒股份：实控人与江门国资平台达成支持扶助意向 将获流动性支持</p>
                                <span>10-21</span>
                            </li>
                            <li>
                                <p>神州长城或面临投资者索赔 参与增持员工也有索赔权</p>
                                <span>10-21</span>
                            </li>
                            <li>
                                <p>宜华健康：子公司达孜赛勒康拟引入战投 金额8亿元至20亿元</p>
                                <span>10-21</span>
                            </li>
                            <li>
                                <p>郑州银行：前三季度净利34亿元 同比增2.51%</p>
                                <span>10-21</span>
                            </li>
                            <li>
                                <p>网宿科技：拟回购2亿元至4亿元股份</p>
                                <span>10-21</span>
                            </li>
                            <li>
                                <p>姜超：让减税来的更猛烈些吧！为何说减税是通往繁荣之路？</p>
                                <span>10-21</span>
                            </li>
                        </ul>
                    </dd>
                </dl>

                <dl>
                    <dt>
                        网站公告
                    </dt>
                    <dd>

                        <ul>
                            <li>
                                <p>证监会出新规鼓励并购重组 被否IPO企业再重组上市间隔由3年变6个月</p>
                                <span>10-21</span>
                            </li>
                            <li>
                                <p>深圳国资驰援上市公司锁定三大标准</p>
                                <span>10-21</span>
                            </li>
                            <li>
                                <p>证监会松绑借壳上市 A股小市值公司能否率先“迎春”</p>
                                <span>10-21</span>
                            </li>
                            <li>
                                <p>国务院金稳会：深入研究有利于资本市场长期健康发展重大改革举措</p>
                                <span>10-21</span>
                            </li>
                            <li>
                                <p>国务院：鼓励长期资金入市等5方面政策要快速落实到位</p>
                                <span>10-21</span>
                            </li>
                            <li>
                                <p>海通宏观姜超：个税专项抵扣减税规模约千亿元</p>
                                <span>10-21</span>
                            </li>
                        </ul>
                    </dd>
                </dl>
            </div>
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
            background: url("../../../assets/test1.jpg") no-repeat center;
            background-position: center 0px;
        }
        .msg{
            width: @width;
            padding: 30px 0;
            margin: auto;
            .slogan{
                >ul{
                    .clear();
                    >li{
                        float: left;
                        width: 23%;
                        &:hover>div{
                            transform: translateY(-10px);
                            >.rightWrap{
                                >P{
                                    color: #39A1EA;
                                }
                            }
                        }
                        &:not(:first-child){
                            margin-left:32px;
                        }
                        >div{
                            transition: all 0.4s;
                            .clear();
                            >span{
                                display: block;
                                float: left;
                                width: 50px;
                                height: 50px;
                                background-size: auto 100%;
                                background-position: left 0;
                                background-repeat: no-repeat;
                                background-image: url("../../../assets/slogan.png");
                                &.one{
                                    background-position:4px 0;
                                }
                                &.two{
                                    background-position:-62px 0;
                                }
                                &.three{
                                    background-position:-116px 0;
                                }
                                &.four{
                                    background-position:-170px 0;
                                }
                            }
                            >.rightWrap{
                                float: right;
                                width: 205px;
                                >div{
                                    font-size: 22px;
                                    color: #333;
                                }
                                >P{
                                    font-size: 12px;
                                    margin-top: 8px;
                                    color: #999;
                                    transition: all 0.3s;
                                }
                            }
                        }
                    }
                }
            }
            .msgItem{
                margin-top: 30px;
                .clear();
                >dl{
                    &:first-child{
                        margin-right: 2%;
                    }
                    display: block;
                    width: 48%;
                    float: left;
                    >dt{
                        background-color: #fbfbfb;
                        padding: 10px 15px;
                        color: #333;
                        font-size: 15px;
                        border:1px solid #ccc;
                    }
                    >dd{
                        color: #555;
                        padding: 10px;
                        border: 1px solid #ccc;
                        border-top: none;
                        >ul{
                            li{
                                .clear();
                                cursor: pointer;
                                &:hover{
                                    color: #39A1EA;
                                }
                                &:not(:first-child){
                                    margin-top: 10px;
                                }
                                >p{
                                    float: left;
                                    width: 450px;
                                }
                                >span{
                                    width: 100px;
                                    float: right;
                                    color: #878787;
                                    text-align: right;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<script>
    import bannerPendant from "../common/bannerPendant.vue"
    export default{
        data (){
            return {}
        },
        components :{
            bannerPendant
        }
    }
</script>