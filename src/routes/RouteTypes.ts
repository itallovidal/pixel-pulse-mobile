import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export type IAuthRoute = {
    login: {
        userCreated: boolean
    },
    signup: undefined,
}

export type TAuthRouteNavigatorProps = NativeStackNavigationProp<IAuthRoute>


import {DrawerNavigationProp} from "@react-navigation/drawer";

export type IAPPRoute = {
    home: undefined,
    profile: undefined
}

export type TAPPNavigatorProps = DrawerNavigationProp<IAPPRoute>




