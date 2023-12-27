import "@/assets/styles/styles.scss";
import "../firebase";

import { createApp } from "vue";
import { createVuestic } from "vuestic-ui";
import { createPinia } from "pinia";


import router from "./router";

import App from "./App.vue";
import "vuestic-ui/css";

const app = createApp(App);

app.use(createPinia());
app.use(createVuestic());
app.use(router);

app.mount("#app");
