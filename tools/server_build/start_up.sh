#!/bin/sh
echo
echo ::欢迎使用前端开发调试本地服务
echo
{
platform="uname -s"
if [ "$platform"=="Darwin" ]
then
    sudo babel-node mgserver
else
    babel-node mgserver
fi
} || {
    babel-node mgserver
}