import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/home'
import Profile from '../screens/profile'
import { IAPPRoute } from './routes'
import { Button, Image, useTheme } from 'native-base'
import menuIcon from '../assets/menuIcon.png'
import Catalogue from "../screens/catalogue";

const { Navigator, Screen } = createDrawerNavigator<IAPPRoute>()
function AppRoutes() {
  const theme = useTheme()

  return (
    <Navigator
      screenOptions={({ navigation }) => {
        return {
          headerShown: true,
          drawerStyle: {
            backgroundColor: theme.colors.gray['700'],
          },
          drawerLabelStyle: {
            color: 'white',
          },
          drawerActiveTintColor: theme.colors.gray['700'],
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => {
            return (
              <Button
                variant={'unstyled'}
                onPress={() => navigation.toggleDrawer()}
              >
                <Image alt={'menu icon'} source={menuIcon} />
              </Button>
            )
          },
        }
      }}
    >
      <Screen name={'home'} component={Home} />
      <Screen name={'profile'} component={Profile} />
      <Screen name={'catalogue'} component={Catalogue} />
    </Navigator>
  )
}

export default AppRoutes
