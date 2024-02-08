import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthRoutes from './AuthRoutes'
import { GlobalContext } from '../components/context/globalContextProvider'
import AppRoutes from './AppRoutes'

function IndexRoutes() {
  const { userToken } = React.useContext(GlobalContext)

  return (
    <NavigationContainer>
      {userToken ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}

export default IndexRoutes
