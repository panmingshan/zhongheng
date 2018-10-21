const status = process.env.NODE_ENV == 'production';
const getway = '/gateway';
const agent = status ? '' : '/ngx';
const apis = status ? getway : '/api';
const base = location.origin;
const sta = status ? '' : '/static';
const detail = '/detail';
let prefix = apis;

const Common = {
    MSITE_VERSION: 'miguvideo mobile-' + '2.0.0.0'
};
const API = {
    // 获取页面布局
    pageLayout: prefix + '/display/v1/layout/pages/', // /display/v1/layout/pages/pageid
    // 获取group的数据
    groupData: prefix + '/display/v1/data/groups/', // /display/v1/data/groups/groupid
    // 获取comp的数据
    compData: prefix + '/display/v1/data/comps/', // /display/v1/data/comps/compid
    // 获取热点数据
    recommendData: prefix + '/recommend/search/v1/recommendFeed/', // ?idfa=1&reqNum=10&location=上海&ctinfo=1.0.1&channel=hotspot-life

    settingsFrame: prefix + '/common/v1/settings/INIT_FRAME',
    // 预告 花絮
    AdvanceTidbits:
        prefix +
        '/search/v1/open-search/advanceName/1?contDisplayType=&isTonkenSearch=0&packId=1002581,1002601&pageSize=10&mediaShape=预告',
    // 为你推荐  --- programType(长短视频)
    RecommendToYou: prefix + '/recommend/search/v1/recommend-related-long/',
    // 获取影片信息
    programDes: prefix + '/program/v1/cont/content-info/',
    // 获取评论  http://{门户的域名}/interaction/v1/comment/${isLongcomment}/${pageidx}/${pagesize}/${mId}?parentId=${parentId}&contentType=${contentType}
    comments: prefix + '/interaction/v1/comment/0/1/5/:cid?parentId=0',
    getPlayTime: prefix + '/playtimes/v1/play-times/',
    hotkeyword: prefix + '/display/v1/search/hot-keyword/70002534',
    epiIds: prefix + '/program/v1/cont/episode-infos?epsIDS=',
    openSearch: prefix + '/search/v1/open-search/',
    tipKeyword: prefix + '/search/v1/tip-keyword/',
    //直播节目信息
    liveProgramInfo: prefix + '/live/v2/nowAndNextPlaybill/',
    //直播节目单列表
    livePlayBillsInfo: prefix + '/live/v2/tv-programs-data/',
    liveTvListInfo: prefix + '/live/v2/tv-data/',
    //播放流
    playUrlH5: `${agent}${getway}/playurl/v1/play/playurlh5`,
    //收藏
    favorites: prefix + '/uic/v1/user-favorites/',
    // 获取配置的comp的数据 ----> 精彩热播 --->79cbb92738b44fe59ccc885caff81eee
    customComp: prefix + '/display/v1/data/comps/',
    //获取会员信息
    memberInfo: `${agent}${getway}/user/v1/member-info/`,
    // 频道筛选信息
    channelSelect: `${prefix}/search/v1/category`,
    // 获取用户信息
    userInfo: `${agent}${getway}/user/v1/user-info/`,
    //历史记录
    HISTORY_URL: `${agent}${getway}/uic/v1/user-play-history/`,
    //收藏记录
    COLLECT_URL: `${agent}${getway}/uic/v1/user-favorites/`,
    //批价
    SALES_PRICING: `${agent}${getway}/order/v1/sales-pricing/`,
    //乐高批价信息
    PRICING_ANDROID: `/display/common/v1/settings/PRICING_ANDROID`,
    //批价接口根据code移除一部分
    SALES_PRICING_CODE: 'MiGuShiPinZuanShiHuiYuanBaoYueHuaFei_6BVJV5M1DHC',
    //非移动用户乐高批价根据code移除
    PRICING_ANDROID_CODE: 'MiGuShiPinZuanShiHuiYuanBaoYueHuaFei_36T1GYV7RVO',
    //获取详情页基础信息
    DETAIL_PAGE_INFO: `${agent}${getway}/common/v1/settings/H5_DetailPage`,
    //微信二次分享
    GET_WECHAT_CFG: `${base}${sta}/getWechatAccessToken.msp`,
    //详情页无cid情况下根据mgdbid获取cid
    GET_CID: `${agent}${getway}/vms-match/v2/basic-data/basic-data/`
};

export { Common, API, API as default };
