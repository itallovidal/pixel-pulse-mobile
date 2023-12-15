import React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import Home from "../screens/home";
import Profile from "../screens/profile";
import {IAPPRoute} from "./RouteTypes";

const {Navigator, Screen} = createDrawerNavigator<IAPPRoute>()

function AppRoutes() {
    return (
        <Navigator screenOptions={{
            headerShown: false
        }}>
            <Screen name={'home'} component={Home}/>
            <Screen name={'profile'} component={Profile}/>
        </Navigator>
    );
}

export default AppRoutes;