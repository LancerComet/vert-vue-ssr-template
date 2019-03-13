import { Component } from '@vert/core'
import Vue from 'vue'

import { GreetingService } from '../../service/greeting'
import { IUser, UserService } from '../../service/user'

@Component
export default class AppIndex extends Vue {
  pageName: string = ''
  userList: IUser[] = []

  async created () {
    this.greetingSrv.greet('Index')
    this.userList = await this.userSrv.getUserList()
  }

  constructor (
    private greetingSrv: GreetingService,
    private userSrv: UserService
  ) {
    super()
  }
}
