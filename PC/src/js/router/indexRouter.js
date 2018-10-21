/**
 * Created by pms on 2018/10/21.
 */
import vueRouter from "vue-router";

import index from'../components/index/index.vue'
import softWareDownload from '../components/index/softWareDownload.vue'
import connect from '../components/index/connect.vue'
import materialDown from '../components/index/materialDown.vue'
export default new vueRouter({
    routes : [
        {
            path: "/",
            name: "首页",
            // component: (resolve) => require(['../components/index/index.vue'], resolve)
            component: index
        },
        {
            path: "/softWareDownload",
            name: "软件下载",
            component: softWareDownload
        },
        {
            path: "/aboutUs",
            name: "关于我们",
            component: connect
        },
        {
            path: "/materialDown",
            name: "材料下载",
            component: materialDown
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
})