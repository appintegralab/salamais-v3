import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'
import quasarLang from 'quasar/lang/pt-BR'
import { plugin, defaultConfig } from '@formkit/vue'
import { pt } from '@formkit/i18n'


// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import '@formkit/themes/genesis'

import './index.css'
import './fonts.css'

import App from './App.vue'
import router from "./router.js"

const app = createApp(App)

app
    .use(router)
    .use(createPinia())
    .use(Quasar, {
        plugins: { Notify }, // import Quasar plugins and add here
        lang: quasarLang,
    })
    .use(plugin, defaultConfig({
        // Define additional locales
        locales: { pt },
        // Define the active locale
        locale: 'pt'
    }))
    

app.mount('#app')
