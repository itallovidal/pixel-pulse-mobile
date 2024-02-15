import React, { ReactNode } from 'react'
import { ITheme, useTheme, useToast } from 'native-base'
import { IShowToast, IToken } from '../../@types/globalContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TAuthRouteNavigatorProps } from '../../routes/routes'

interface IGlobalContext {
  setNewUserToken: (token: IToken) => Promise<void>
  userToken: IToken | undefined
  theme: ITheme
  showToast: (info: IShowToast) => void
  logout: () => void
  navigation: TAuthRouteNavigatorProps
}

export const GlobalContext = React.createContext({} as IGlobalContext)
export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [userToken, setUserToken] = React.useState<IToken>()
  const theme = useTheme()
  const toast = useToast()
  const navigation = useNavigation<TAuthRouteNavigatorProps>()

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

    setTimeout(() => {
      toast.closeAll()
    }, 2000)
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
      value={{
        navigation,
        setNewUserToken,
        userToken,
        theme,
        showToast,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
