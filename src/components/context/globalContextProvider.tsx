import React, { ReactNode } from 'react'
import { ITheme, useTheme, useToast } from 'native-base'
import { IShowToast, IToken } from '../../@types/ContextTypes'
import { Api } from '../../utilities/axios'
import { IGame } from '../../@types/apiTypes'

interface IGlobalContext {
  setNewUserToken: (token: IToken) => void
  userToken: IToken | undefined
  theme: ITheme
  showToast: (info: IShowToast) => void
  logout: () => void
  getGame: () => Promise<IGame>
}

export const GlobalContext = React.createContext({} as IGlobalContext)
export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [userToken, setUserToken] = React.useState<IToken>()
  const theme = useTheme()
  const toast = useToast()

  async function getGame() {
    try {
      const { data } = await Api.get('/games/random')
      return data
    } catch (e) {
      console.log(e)
    }
  }
  function showToast({ placement, bg, title }: IShowToast) {
    toast.show({
      placement,
      bg,
      title,
    })
  }

  function setNewUserToken(token: IToken) {
    setUserToken(token)
  }

  function logout() {
    setUserToken(undefined)
  }

  return (
    <GlobalContext.Provider
      value={{ setNewUserToken, userToken, theme, showToast, logout, getGame }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
