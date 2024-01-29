import { StatusBar } from 'expo-status-bar';
import {NativeBaseProvider} from "native-base";
import {Theme} from "./src/style/theme";
import {NavigationContainer} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import AppRoutes from "./src/routes/AppRoutes";
import AuthRoutes from "./src/routes/AuthRoutes";


const config = {
    dependencies: {
        'linear-gradient': LinearGradient
    }
};

export default function App() {
  return (
      <NativeBaseProvider config={config} theme={Theme}>
        <StatusBar/>
          <NavigationContainer>
              <AuthRoutes/>
              {/*<AppRoutes/>*/}
          </NavigationContainer>

          {/*<Temp/>*/}
      </NativeBaseProvider>
  );
}




