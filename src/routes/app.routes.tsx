import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/home'
import { IAPPRoute } from './routes'
import { Button, Image, useTheme } from 'native-base'
import menuIcon from '../assets/menuIcon.png'
import Catalogue from '../screens/catalogue'
import Profile from '../screens/profile'
import { WishList } from '../screens/wishList'
import {
  House,
  ListChecks,
  ListPlus,
  Person,
  UserCircle,
} from 'phosphor-react-native'

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
          drawerActiveTintColor: theme.colors.red['200'],
          headerTransparent: true,
          headerTitle: '',
        }
      }}
    >
      <Screen
        options={{
          drawerLabel: `Home`,
          drawerIcon: () => <House color={'white'} />,
        }}
        initialParams={undefined}
        name={'home'}
        component={Home}
      />
      <Screen
        options={{
          drawerLabel: `Perfil`,
          drawerIcon: () => <UserCircle color={'white'} />,
        }}
        name={'profile'}
        component={Profile}
      />
      <Screen
        options={{
          drawerLabel: `Meu Catálogo`,
          drawerIcon: () => <ListChecks color={'white'} />,
        }}
        name={'catalogue'}
        component={Catalogue}
      />

      <Screen
        options={{
          drawerLabel: `Wish List`,
          drawerIcon: () => <ListPlus color={'white'} />,
        }}
        name={'wishList'}
        component={WishList}
      />
    </Navigator>
  )
}

export default AppRoutes
