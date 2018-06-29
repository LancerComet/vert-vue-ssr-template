import { App, Injector } from '@vert/core'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'

import RootComponent from './root-component.vue'
import { createRouter } from './router'
import { createStore } from './store'

import { GreetingService } from './service/greeting'
import { UserService } from './service/user'

initVue()
initService()

function initVue () {
  Vue.use(VueRouter)
  Vue.use(Vuex)
}

function initService () {
  const Services = [
    GreetingService, UserService
  ]
  const injector = Injector.create(...Services)
  Services.forEach((Service: any) => {
    App.addSingleton(Service, injector.get(Service))
  })
}

function createApp () {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render (h) {
      return h(RootComponent)
    }
  })

  return {
    app,
    router,
    store
  }
}

export {
  createApp
}
