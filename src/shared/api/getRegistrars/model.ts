export const checkAutoLogin = (rowData: Record<string, any>): Record<string, any> => {
  if (rowData.autologinuserid === -1) rowData.autologinuserid = null
  return rowData
}
