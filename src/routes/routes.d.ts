import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { DrawerNavigationProp } from '@react-navigation/drawer'

export type IAuthRoute = {
  login: {
    userCreated: boolean
  }
  signup: undefined
}

export type TAuthRouteNavigatorProps = NativeStackNavigationProp<IAuthRoute>

export interface IGameToEdit {
  gameID: number
  stars: number
  id: string
}

export type IAPPRoute = {
  home:
    | {
        id: string
        isEditing: boolean
        gameID: number
        isWishListed: boolean
        isSearched: boolean
      }
    | undefined
  profile: undefined
  catalogue: undefined
  wishList: undefined
  search: {
    q: string
  }
}

export type TAPPNavigatorProps = DrawerNavigationProp<IAPPRoute>
