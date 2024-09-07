// plugins/vuetify.js

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',  // Custom primary color
          secondary: '#424242', // Custom secondary color
          accent: '#82B1FF',    // Custom accent color
          success: '#4CAF50',
          error: '#FF5252',
          warning: '#FFC107',
          info: '#2196F3',
          pnq:'#00000',
        },
      },
      dark: {
        colors: {
          primary: '#BB86FC',
          secondary: '#03DAC6',
          accent: '#FF4081',
          success: '#00E676',
          error: '#CF6679',
          warning: '#FBC02D',
          info: '#0288D1',
        },
      },
    },
  },
})
