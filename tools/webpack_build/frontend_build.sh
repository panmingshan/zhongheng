#!/bin/sh
echo
echo ::前端自动化构建搭建工具 v1.0.0
temp=./temp
while :
do
    echo
    read -p "::请输入项目根目录【譬如：D:/XXX/.../project || /Users/XXX/.../project】：" dirs
    if test -z $dirs
    then
        continue
    else
        break
    fi
done
echo
read -p "::请输入构建入口文件目录【譬如：./src/js/views/】：" entry
if test -z $entry
then
    entry=./src/js/views/
fi
echo
echo 启用目录：$entry
echo
echo  1 ReactJS —— [ES6版]
echo  2 VueJS ———— [ES6版]
echo  3 CommonJS — [ES6版]
echo
function choice() {
    read -p "::请输入你要选择框架序号：" level
    echo
    case $level in
        1)
        echo "::React ES6版本基础构建开始 *********************************"
        node mgbuild.js react $entry $temp
        ;;
        2)
        echo "::Vue ES6版本基础构建开始 ***********************************"
        node mgbuild.js vue $entry $temp
        ;;
        3)
        echo "::CommonJS ES6版基础构建开始 ********************************"
        echo
        errorlevel=
        function selectDll() {
            read -p "::是否需要创建第三方dll库文件【Y/N】" dll
            case $dll in
                Y|y)
                errorlevel=1
                ;;
                N|n)
                errorlevel=2
                ;;
                *)
                selectDll
                ;;
            esac
        }
        selectDll
        node mgbuild.js common $entry $temp $errorlevel
        ;;
        *)
        choice
        ;;
    esac
}
choice
echo
echo "::配置数据数据完毕  ***********************************"
# 删除项目根目录并重新创建
rm -rf $dirs
mkdir $dirs
# 拷贝temp目录下生成的文件至项目根目录
cp -rp $temp/. $dirs
# 删除temp目录
rm -rf ./temp
echo
echo "::该项目基础构建完毕，可以进行具体业务逻辑开发"