/**
 * Created by pms on 2018/10/21.
 */
import vueRouter from "vue-router";
export default new vueRouter({
    routes : [
        {
            path: "/",
            name: "首页",
            component: (resolve) => require(['../components/index/index.vue'], resolve)
        },
        {
            path: "/softWareDownload",
            name: "软件下载",
            component: (resolve) => require(['../components/index/softWareDownload.vue'], resolve)
        },
        {
            path: "/aboutUs",
            name: "关于我们",
            component: (resolve) => require(['../components/index/connect.vue'], resolve)
        },
        {
            path: "/materialDown",
            name: "关于我们",
            component: (resolve) => require(['../components/index/materialDown.vue'], resolve)
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
})