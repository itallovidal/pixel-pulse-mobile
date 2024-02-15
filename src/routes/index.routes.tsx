import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthRoutes from './auth.routes'
import { GlobalContext } from '../components/context/globalContextProvider'
import AppRoutes from './app.routes'

function IndexRoutes() {
  const { userToken } = React.useContext(GlobalContext)

  return userToken ? <AppRoutes /> : <AuthRoutes />
}

export default IndexRoutes
