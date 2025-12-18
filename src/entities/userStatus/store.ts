import { reactive } from 'vue'
import { type IUserRegistrarsResponse, type IUserStatusStore } from './types'
import { errorNotification } from '@/shared/notification'
import { errorAnswer, type IErrorAnswer } from '@/shared/errorAnswer'
import { getUsersRequest } from '@/shared/api/getUsers'
import type { IUsersResponse } from '../users/types'
import { getUserRegistrarsRequest } from '@/shared/api/getRegistrars/getUserRegistrars'
import { getIntervalTotalsRequest } from '@/shared/api/getIntervalTotals'
import { registrarStatusStore } from '../registrarStatus/store'
import { getUserTimelineRequest } from '@/shared/api/getUserTimeline'
import moment from 'moment'
import type { IGetLogMachineTimelineResponse } from '../registrar/types'
import { pushStatesToData } from '../registrar/chartModel'
import type { IIntervalTotalsResponse } from '@/shared/api/getIntervalTotals/types'
import { userStore } from '@/entities/user/store'

export const userStatusStore = reactive<IUserStatusStore>({
  user: null,
  userId: -1,
  userRegistrars: [],
  isLoading: false,
  userStatistic: { totalDetails: 0 },
  userPerformance: [],
  shiftData: new Map(),
  serverDeltaTime: 0,
  async setUserId(userId) {
    try {
      this.isLoading = true
      this.userId = userId
      const usersResponse = (await getUsersRequest(
        null,
        'id',
        `&id=eq.${userId}`
      )) as unknown as IUsersResponse
      if (usersResponse.data.length === 1) this.user = usersResponse.data[0]
      this.isLoading = false
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
    }
  },
  async getUserRegistrars() {
    try {
      this.isLoading = true
      const userRegistrarsResponse = (await getUserRegistrarsRequest(
        this.userId
      )) as unknown as IUserRegistrarsResponse
      this.userRegistrars = userRegistrarsResponse.data
      this.isLoading = false
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
    }
  },
  clearData() {
    this.userPerformance = []
    this.shiftData.clear()
    this.userId = -1
  },
  setUserPerformance(userPerformance) {
    this.shiftData.clear()
    this.userPerformance = userPerformance
    this.userStatistic.totalDetails = 0
    Promise.all(
      this.userPerformance.map((performance) => {
        return this.getTotals(performance)
      })
    ).then(() => {
      this.userStatistic.totalDetails = this.userPerformance.reduce((acc, performance) => {
        return acc + (performance.totals?.items_produced ?? 0)
      }, 0)
    })
  },
  async getTotals(shift) {
    try {
      this.isLoading = true
      const duration = registrarStatusStore.getDuration(shift.shift_duration)
      const intervalTotalsResponse = (await getIntervalTotalsRequest(
        this.userId,
        shift.regid,
        shift.shift_start,
        `${duration}S`
      )) as unknown as IIntervalTotalsResponse
      shift.totals = intervalTotalsResponse.data
      this.isLoading = false
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
    }
  },
  async dataStatistic(shift, statusSeries) {
    this.shiftData.set(shift, statusSeries)
    await this.getStatusData(shift)
  },
  async getStatusData(shift) {
    try {
      this.isLoading = true
      const duration = registrarStatusStore.getDuration(shift.shift_duration)
      const endTime = moment(shift.shift_start).add(duration, 's').format('YYYY-MM-DDTHH:mm:ss')
      const userTimelineResponse = (await getUserTimelineRequest(
        this.userId,
        shift.regid,
        moment(shift.shift_start).format('YYYY-MM-DDTHH:mm:ss'),
        endTime
      )) as unknown as IGetLogMachineTimelineResponse
      const nowMoment = moment().add(this.serverDeltaTime, 'milliseconds').unix() * 1000
      if (this.shiftData.has(shift)) {
        const statusSeries = this.shiftData.get(shift)
        if (statusSeries) pushStatesToData(userTimelineResponse.data, nowMoment, statusSeries, true)
      }
      this.isLoading = false
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
    }
  },
  setServerDeltaTime(serverDeltaTime) {
    this.serverDeltaTime = serverDeltaTime
  }
})
