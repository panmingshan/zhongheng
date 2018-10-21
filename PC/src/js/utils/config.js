//图片
const IMG = {
    miguLogo : require('@/header/miguLogo.png'),
    userPic : require('@/header/userPic.png'),
    searchBtn: require('@/header/searchBtn.png'),
    loadImg : require('@/common/loading3.gif'),
    defaultImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUCB1jYAACAAAFAAGNu5vzAAAAAElFTkSuQmCC" // 1 * 1 的空白图片
}

//常量
const CONSTS = {
    localStorageKey : {
        userId : "userId",
        userInfo : "userInfo",
        userToken : "userToken",
    }
}

export {IMG,CONSTS}