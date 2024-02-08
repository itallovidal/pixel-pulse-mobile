import { StatusBar } from 'expo-status-bar';
import {Box, NativeBaseProvider, VStack} from "native-base";
import {Theme} from "./src/style/theme";
import {LinearGradient} from "expo-linear-gradient";
import IndexRoutes from "./src/routes/index.routes";
import {GlobalContextProvider} from "./src/components/context/globalContextProvider";


const config = {
    dependencies: {
        'linear-gradient': LinearGradient
    }
};

export default function App() {
  return (
      <NativeBaseProvider config={config} theme={Theme}>
        <StatusBar/>
          <GlobalContextProvider>
              <Box flex={1} bg={"gray.700"}>
                <IndexRoutes/>
              </Box>
          </GlobalContextProvider>
      </NativeBaseProvider>
  );
}




