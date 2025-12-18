export enum ETagType {
  H2,
  H1,
  PanelCaption,
  PeriodCaption
}

export interface ICaption {
  title: string
  tagType: ETagType
}
