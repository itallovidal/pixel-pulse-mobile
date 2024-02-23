import { StatusBar } from 'expo-status-bar'
import { Box, NativeBaseProvider, VStack } from 'native-base'
import { Theme } from './src/utilities/theme'
import { LinearGradient } from 'expo-linear-gradient'
import IndexRoutes from './src/routes/index.routes'
import { GlobalContextProvider } from './src/components/context/globalContextProvider'
import { NavigationContainer } from '@react-navigation/native'

const config = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
}

export default function App() {
  return (
    <NativeBaseProvider config={config} theme={Theme}>
      <StatusBar backgroundColor={Theme.colors.red['700']} style={'light'} />
      <NavigationContainer>
        <GlobalContextProvider>
          <Box flex={1} bg={'gray.700'}>
            <IndexRoutes />
          </Box>
        </GlobalContextProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
