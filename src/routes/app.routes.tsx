import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/home'
import { IAPPRoute } from './routes'
import { Button, Image, useTheme } from 'native-base'
import menuIcon from '../assets/menuIcon.png'
import Catalogue from '../screens/catalogue'
import Profile from '../screens/profile'

const { Navigator, Screen } = createDrawerNavigator<IAPPRoute>()
function AppRoutes() {
  const theme = useTheme()

  return (
    <Navigator
      screenOptions={({ navigation }) => {
        return {
          headerShown: true,
          headerLeft: () => null,
          drawerPosition: 'right',
          headerRight: () => {
            return (
              <Button
                variant={'unstyled'}
                onPress={() => navigation.toggleDrawer()}
              >
                <Image
                  alt={'menu icon'}
                  style={{
                    transform: [{ rotateY: '180deg' }],
                  }}
                  source={menuIcon}
                />
              </Button>
            )
          },
          drawerStyle: {
            backgroundColor: theme.colors.gray['700'],
          },
          drawerLabelStyle: {
            color: 'white',
          },
          drawerActiveTintColor: theme.colors.gray['700'],
          headerTransparent: true,
          headerTitle: '',
        }
      }}
    >
      <Screen
        options={{
          drawerLabel: `Home`,
        }}
        initialParams={{
          gameToEdit: {
            gameID: 0,
            stars: 0,
            id: '',
          },
        }}
        name={'home'}
        component={Home}
      />
      <Screen
        options={{
          drawerLabel: `Perfil`,
        }}
        name={'profile'}
        component={Profile}
      />
      <Screen
        options={{
          drawerLabel: `Meu Catálogo`,
        }}
        name={'catalogue'}
        component={Catalogue}
      />
    </Navigator>
  )
}

export default AppRoutes
