const addSlash = (address: string) => {
  return address.endsWith('/') ? address : `${address}/`
}

const config = {
  BACKEND_ADDRESS: addSlash((window as any)._env_.BACKEND_ADDRESS),
  WS_ADDRESS: (window as any)._env_.WS_ADDRESS,
  DEFAULT_USER: (window as any)._env_.DEFAULT_USER as string | undefined,
  MODE: (window as any)._env_.MODE as string | undefined
}

export default config
