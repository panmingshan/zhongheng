//发布-订阅者模式/观察者模式/消息队列模式
var _messageList = {};
//注册
function register(type,fn) {
    if(_messageList[type]){
        if(_messageList[type] instanceof  Array){
            _messageList[type].push(fn);
        }
        else {
            throw new Error("错误的消息列表");
        }
    }
    else{
        _messageList[type] = [fn];
    }
}
//取消注册
function unregister(type,fn) {
    if(_messageList[type] instanceof Array){
        for(var i = 0,length = _messageList[type].length ; i < length; i++ ){
            if(_messageList[type][i]  === fn){
                _messageList[type].splice(i,1)
            }
        }
    }
    else {
        return;
    }
}
//发送消息
function fire(type,data) {
    if(_messageList[type] instanceof Array){
        for(var i = 0 , len = _messageList[type].length;  i < len; i ++){
            _messageList[type][i].call(this,data);
        }
    }
}

export {
    unregister as off,
    fire as emit,
    register as on
}
