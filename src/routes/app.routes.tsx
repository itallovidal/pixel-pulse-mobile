import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/home'
import { IAPPRoute } from './routes'
import { Button, Icon, Image, useTheme } from 'native-base'
import menuIcon from '../assets/menuIcon.png'
import Catalogue from '../screens/catalogue'
import Profile from '../screens/profile'
import { WishList } from '../screens/wishList'
import {
  House,
  List,
  ListChecks,
  ListPlus,
  MagnifyingGlass,
  Person,
  UserCircle,
} from 'phosphor-react-native'
import { Search } from '../screens/search'

const { Navigator, Screen } = createDrawerNavigator<IAPPRoute>()
function AppRoutes() {
  const theme = useTheme()

  return (
    <Navigator
      screenOptions={({ navigation }) => {
        return {
          headerShown: true,
          headerStyle: {
            height: 0,
          },
          headerTitleStyle: {
            display: 'none',
          },
          headerLeft: () => null,
          drawerPosition: 'right',
          headerRight: () => {
            return (
              <Button
                top={6}
                position={'absolute'}
                variant={'unstyled'}
                onPress={() => navigation.toggleDrawer()}
                right={0}
                pr={6}
                roundedLeft={4}
                bg={'gray.700'}
                roundedRight={0}
              >
                <Icon as={List} color={'white'} />
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
      <Screen
        options={{
          drawerLabel: ``,
          drawerItemStyle: {
            display: 'none',
            padding: 0,
            margin: 0,
          },
          drawerIcon: () => null,
        }}
        name={'search'}
        component={Search}
      />
    </Navigator>
  )
}

export default AppRoutes
