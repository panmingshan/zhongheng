<template>
    <div id="chart" :class="show?'show':''">
        <div class="bg">

        </div>
        <div class="chartContent">
            <div class="side" @click="change">
                <span>
                    联
                </span>
                <span>
                    系
                </span>
                <span>
                    我
                </span>
                <span>
                    们
                </span>
                <span v-text="show?'>>':'<<'">

                </span>

            </div>
            <div class="content">
                <ul>
                    <li class="telWrap">
                        <i class="tel">
                        </i>
                        <div>
                            <p>
                                财富热线
                            </p>
                            <p>
                                0760-22517081
                            </p>
                        </div>
                    </li>
                    <li class="qqWrap">
                        <i class="qq">
                        </i>
                        <div>
                            <p>
                                在线客服
                            </p>
                            <p>
                                <span>大勇</span>
                                <a href="tencent://message/?uin=1326082784&Site=sc.chinaz.com&Menu=yes">
                                    <i class="qqchart"></i>
                                </a>
                            </p>
                        </div>
                    </li>
                    <li class="timeWrap">
                        <div>
                            <p>
                                服务时间：
                            </p>
                            <p>
                                周一至周六 9:00 - 18:00
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped type="text/less">
    @import "../../../css/common.less";
    @import "../../../css/config.less";
    #chart{
        position: relative;
        z-index: 6666;
        .bg{
            position: fixed;
            top : 0;
            left : 0;
            width: 100%;
            height: 100%;
            visibility: hidden;
            transition: all 0.3s;
            z-index: 33;
            opacity: 0;
            background-color: black;
        }
        .chartContent{
            position: fixed;
            top : 0;
            right: -230px;
            height: 100%;
            width: 230px;
            z-index: 44;
            background-color: #535353;
            transition: all 0.3s;
            .side{
                position: absolute;
                box-shadow: 1px 1px 3px 1px #39A1EA;
                height: 130px;
                cursor: pointer;
                width: 30px;
                left : -32px;
                top : 50%;
                margin-top: -65px;
                border-radius: 4px;
                background-color: #39A1EA;
                font-size: 14px;
                color: white;
                text-align: center;
                >span:first-child{
                    display: block;
                    margin-top: 20px;
                }
            }
            .content{
                position: absolute;
                top : 50%;
                left : 0;
                margin-top: -180px;
                width: 100%;
                >ul{
                    padding: 0 20px;
                    li{
                        padding: 37px 0;
                        .clear();
                        >i{
                            float: left;
                            background-repeat: no-repeat;
                            background-position: center;
                            background-size: contain;
                            display: block;
                            width: 31px;
                            height: 31px;
                        }
                        >div{
                            float: right;
                            width: 150px;
                            padding-top: 6px;
                            color: white;
                            >p{
                                &:first-child{
                                    margin-bottom: 10px;
                                }
                                font-size: 14px;
                            }
                        }
                        &:not(:last-child){
                            border-bottom: 1px solid #6a6a6a
                        }
                    }
                    .telWrap{
                        >i{
                            background-image: url("../../../assets/tel.png");
                        }
                    }
                    .qqWrap{
                        >i{
                            background-image: url("../../../assets/zxkfqq.png");
                        }
                        .qqchart{
                            vertical-align: middle;
                            display: inline-block;
                            margin-left: 3px;
                            width: 77px;
                            cursor: pointer;
                            height: 22px;
                            background-image: url("../../../assets/button_111.gif");
                        }
                    }
                    .timeWrap{
                        width: 100%;
                        >div{
                            >P{
                                &:first-child{
                                    font-weight: bold;
                                    margin-bottom: 5px;
                                }
                            }
                            float: none;
                            width: auto;
                            padding: 20px;
                            background-color: #2f2f2f;

                        }
                    }
                }
            }
        }

        &.show{
            .bg{
                opacity: 0.3;
                visibility: visible;
            }
            .chartContent{
                right: 0;
            }
        }
    }
</style>
<script>
    export default{
        data (){
            return {
                show : false,
            }
        },
        methods : {
            change(){
                this.show = !this.show;
            }
        }
    }
</script>