export interface IConfirm {
  show: boolean
  title: string
  body: string
  btnConfirmTitle: string
  onAction: () => void
  onClose: () => void
}

export interface IConfirmStore {
  confirm: IConfirm
}
