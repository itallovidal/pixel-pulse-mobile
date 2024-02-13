import React, { ReactNode } from 'react'
import { ITheme, useTheme, useToast } from 'native-base'
import { IShowToast, IToken } from '../../@types/globalContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IGlobalContext {
  setNewUserToken: (token: IToken) => Promise<void>
  userToken: IToken | undefined
  theme: ITheme
  showToast: (info: IShowToast) => void
  logout: () => void
}

export const GlobalContext = React.createContext({} as IGlobalContext)
export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [userToken, setUserToken] = React.useState<IToken>()
  const theme = useTheme()
  const toast = useToast()

  React.useEffect(() => {
    getStoredToken()
  }, [])

  async function getStoredToken() {
    const data = await AsyncStorage.getItem('token')
    if (data) {
      const token = JSON.parse(data)
      setUserToken(token)
    }
  }

  async function logout() {
    await AsyncStorage.clear()
    setUserToken(undefined)
  }

  function showToast({ placement, bg, title }: IShowToast) {
    toast.show({
      placement,
      bg,
      title,
    })
  }

  async function storeToken(token: IToken) {
    const data = JSON.stringify(token)
    await AsyncStorage.setItem('token', data)
  }

  async function setNewUserToken(token: IToken) {
    await storeToken(token)
    setUserToken(token)
  }

  return (
    <GlobalContext.Provider
      value={{ setNewUserToken, userToken, theme, showToast, logout }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
