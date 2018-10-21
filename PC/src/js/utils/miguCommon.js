const allVideoType  = {
    TV_PLAY : {
        value : "TV_PLAY",
        name : "电视剧"
    },
    VARIETY_SHOW : {
        value : "VARIETY_SHOW",
        name : "综艺"
    },
    OTHER : {
        value : "OTHER",
        name : "其他"
    },
    MOVIE : {
        value : "MOVIE",
        name : "电影"
    },
}
/**
 * 全局事件
 */
const globalEvent = {
    imgUpdate : {
        type : "图片更新事件",
        value : "imgUpdated"
    },
	compClick : {
		type : "组件内部的点击事件",
		value : "compClick"
	}
}

//首页tab默认pageid
const navBarDefault = "9aa6465a8b41451e85e4a292bf01ec87"

export {
    globalEvent,
    allVideoType,
    navBarDefault
}