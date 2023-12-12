import { StatusBar } from 'expo-status-bar';
import {NativeBaseProvider} from "native-base";
import {Theme} from "./src/style/theme";
import {NavigationContainer} from "@react-navigation/native";
import AuthRoutes from "./src/routes/AuthRoutes";


export default function App() {
  return (
      <NativeBaseProvider theme={Theme}>
        <StatusBar/>
          <NavigationContainer>
              <AuthRoutes/>
          </NavigationContainer>
      </NativeBaseProvider>
  );
}




