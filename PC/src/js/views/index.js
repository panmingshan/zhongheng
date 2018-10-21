import Vue from 'vue';
import vueRouter from "vue-router"
import IndexVue from "js/components/index"
import router from "../router/indexRouter"

Vue.use(vueRouter)

Vue.config.devtools = process.env.NODE_ENV != 'production';

export default class IndexView {
    onstructor() {
        this.options = {
            el: '',
            v_version: ''
        };
    }

    init(data) {
        //初始化Render
        this.options = data || this.options;
        var vindex = new Vue({
            el: this.options.el,
            router,
            render: h => h(IndexVue)
        });
    }
}

var indexView = new IndexView();
indexView.init({ el: '#app' });
