import config from '@/app/config'
import {
  EOpModeCode,
  type IPowerChangeEvent,
  type IProductAddEvent,
  type IStateChangeEvent,
  type IWsData,
  type IWsEvent
} from './types'
import { errorNotification } from '../notification'
import type { IRegistrar } from '../api/getRegistrars'

const reconnectTime = 10000

export class WsClient {
  ws: WebSocket | null
  subscribedRegIds: number[]
  reconnectTimer: number
  stateChangeHandler: ((props: IStateChangeEvent) => void) | null
  productAddHandler: ((props: IProductAddEvent) => void) | null
  powerChangeHandler: ((props: IPowerChangeEvent) => void) | null
  constructor() {
    this.ws = null
    this.subscribedRegIds = []
    this.reconnectTimer = 0
    this.stateChangeHandler = null
    this.productAddHandler = null
    this.powerChangeHandler = null
  }
  setStateChangeHandler(stateChangeHandler: (props: IStateChangeEvent) => void) {
    this.stateChangeHandler = stateChangeHandler
  }
  setProductAddHandler(productAddHandler: (props: IProductAddEvent) => void) {
    this.productAddHandler = productAddHandler
  }
  setPowerChangeHandler(powerChangeHandler: (props: IPowerChangeEvent) => void) {
    this.powerChangeHandler = powerChangeHandler
  }
  async connect(): Promise<void> {
    this.ws = new WebSocket(config.WS_ADDRESS)
    return new Promise((resolve, reject) => {
      if (this.ws) {
        this.ws.onerror = this.onerror.bind(this, reject)
        this.ws.onmessage = this.onmessage.bind(this)
        this.ws.onopen = () => {
          resolve()
        }
      }
    })
  }
  disconnect() {
    this.reconnectClear()
    if (!this.ws) return
    this.ws.onerror = () => {}
    this.ws.onmessage = () => {}
    this.ws.onopen = () => {}
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(this.getWsRequest())
      this.ws.close(1000, 'disconnect')
    }
    this.ws = null
  }
  onerror(reject: (err: Error) => void) {
    errorNotification('Websocket connect failed')
    reject(Error('Websocket connect failed'))
    this.ws = null
  }
  onmessage(event: IWsEvent) {
    let wsData: IWsData | null = null
    try {
      wsData = JSON.parse(event.data) as IWsData
    } catch (err) {
      /* empty */
    }

    if (!wsData) return
    if (wsData.result === 'Invalid token') {
      this.disconnect()
      this.makeSubscribe()
    }
    if (wsData.result === 'Unknown registrar id or permission denied') {
      errorNotification('Подключение в режиме online не удалось')
    }
    if (wsData.topic) {
      if (wsData.topic.includes('stateChange')) {
        try {
          const payload = wsData.payload
          if (
            payload &&
            payload.registrarid !== undefined &&
            payload.opMode !== undefined &&
            payload.downtimeReason !== undefined &&
            payload.ts !== undefined
          ) {
            if (this.stateChangeHandler)
              this.stateChangeHandler({
                registrarid: payload.registrarid,
                opModeCode: payload.opMode,
                downtimeReasonCode: payload.downtimeReason,
                itemid: payload.itemid,
                ts: payload.ts
              })
          }
        } catch (err) {
          /* empty */
        }
      }
      if (wsData.topic.includes('loginout')) {
        try {
          const payload = wsData.payload
          if (
            payload &&
            payload.registrarid !== undefined &&
            payload.login !== undefined &&
            payload.id !== undefined &&
            payload.loginType !== undefined &&
            payload.ts !== undefined
          ) {
            if (this.stateChangeHandler)
              this.stateChangeHandler({
                registrarid: payload.registrarid,
                opModeCode: payload.loginType >= 0 ? EOpModeCode.Uptime : EOpModeCode.Off,
                downtimeReasonCode: 0,
                ts: payload.ts,
                username: payload.login,
                userId: payload.id
              })
          }
        } catch (err) {
          /* empty */
        }
      }
      if (wsData.topic.includes('itemsProduced')) {
        try {
          const payload = wsData.payload
          if (
            payload &&
            payload.registrarid !== undefined &&
            payload.itemCount !== undefined &&
            payload.ts !== undefined
          ) {
            if (this.productAddHandler)
              this.productAddHandler({
                registrarid: payload.registrarid,
                itemCount: payload.itemCount,
                defectiveItemCount: payload.defectiveItemCount,
                energyConsumed: payload.energyConsumed,
                userid: payload.userid,
                ts: payload.ts
              })
          }
        } catch (err) {
          /* empty */
        }
      }
      if (wsData.topic.includes('inputData')) {
        try {
          const payload = wsData.payload
          if (
            payload &&
            payload.registrarid !== undefined &&
            payload.current !== undefined &&
            payload.ts !== undefined
          ) {
            if (this.powerChangeHandler)
              this.powerChangeHandler({
                registrarid: payload.registrarid,
                current: payload.current,
                power: payload.power,
                energy: payload.energy,
                ts: payload.ts
              })
          }
        } catch (err) {
          /* empty */
        }
      }
    }
  }
  async subscribe(registrars: IRegistrar[]) {
    this.subscribedRegIds = registrars.map((registrar) => registrar.randomid)
    if (this.subscribedRegIds.length === 0) {
      this.disconnect()
    } else {
      this.makeSubscribe()
    }
  }
  reconnectClear() {
    if (this.reconnectTimer) {
      clearInterval(this.reconnectTimer)
      this.reconnectTimer = 0
    }
  }
  async makeSubscribe() {
    try {
      if (!this.ws) await this.connect()
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) throw Error('Connection not open')
      this.ws?.send(this.getWsRequest())
      this.reconnectClear()
    } catch (err) {
      this.reconnectTimer = setTimeout(this.makeSubscribe.bind(this), reconnectTime)
    }
  }
  getWsRequest(): string {
    const req = {
      topics: ['online', 'loginout', 'stateChange', 'inputData', 'itemsProduced'],
      registrars: this.subscribedRegIds
    }
    return JSON.stringify(req)
  }
}
