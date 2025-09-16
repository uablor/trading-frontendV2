import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/reset.css'
import './styles/antd-theme.less';
import "@assets/main.css";
import { registerPlugins } from "./common/configurations";

const app = createApp(App);
registerPlugins(app);
app.use(Antd);
app.mount("#app");
