import {
  Button,
  Center,
  Input,
  Text,
  VStack,
  Image,
  Box,
  View,
  ScrollView,
  useTheme,
  useToast,
} from 'native-base'
import { ImageBackground } from 'react-native'
import React, { useCallback, useEffect } from 'react'

import placeholder from '../assets/fotoplaceholder.png'
import { LinearGradient } from 'expo-linear-gradient'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { TAuthRouteNavigatorProps } from '../routes/routes'
import ErrorText from '../components/ErrorText'
import { Api } from '../utilities/axios'
import { GlobalContext } from '../components/context/globalContextProvider'
import { AxiosError } from 'axios'
import { LoginDataException } from '../exceptions/LoginDataException'
import { resolve } from 'react-native-svg/lib/typescript/lib/resolve'

const schema = z.object({
  email: z
    .string({
      required_error: 'Digite o email, por favor.',
    })
    .min(5, {
      message: 'Email deve conter mais de 5 caracteres.',
    })
    .email({
      message: 'Email inválido!',
    }),
  password: z
    .string({
      required_error: 'Por favor, digite a senha!',
    })
    .min(8, {
      message: 'Senha deve conter mais de 8 caracteres.',
    }),
})

type ISchema = z.infer<typeof schema>

function Login() {
  const { setNewUserToken, showToast, theme } = React.useContext(GlobalContext)
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISchema>({
    resolver: zodResolver(schema),
  })
  const navigation = useNavigation<TAuthRouteNavigatorProps>()
  const { params } = useRoute()
  const { userCreated } = params as { userCreated: boolean }

  useEffect(() => {
    if (userCreated) {
      console.log('foi!')
      showToast({
        bg: 'green.700',
        title: 'Bem vindo! Faça o login abaixo.',
        placement: 'top',
      })
    }
  }, [userCreated])

  async function login({ password, email }: ISchema) {
    try {
      const response = await Api.post('/users/login', {
        password,
        email,
      })

      if (response.status === 404 || response.status === 403) {
        throw new LoginDataException(response.data)
      }

      if (response.status !== 200) {
        throw new Error('ops')
      }

      await setNewUserToken(response.data)
    } catch (e) {
      if (e instanceof LoginDataException) {
        setError(e.Field() as keyof ISchema, {
          message: e.Message(),
        })
      } else {
        showToast({
          placement: 'top',
          title: 'Estamos em Manutenção. Tente novamente mais tarde.',
          bg: 'red.700',
        })
      }
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <VStack bg={'gray.700'} flex={1}>
        <View position={'absolute'} w={'full'} h={'60%'}>
          <ImageBackground
            style={{ width: '100%', height: '100%' }}
            source={placeholder}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0)', theme.colors.gray['700']]}
              style={{ height: '100%', width: '100%' }}
            />
          </ImageBackground>
        </View>

        <VStack px={10} pt={'56'}>
          <Text
            fontSize={32}
            color={'white'}
            fontWeight={'bold'}
            textAlign={'center'}
          >
            {' '}
            Login{' '}
          </Text>

          <Text color={'white'} mb={2} fontSize={16}>
            {' '}
            Email{' '}
          </Text>

          <Controller
            control={control}
            name={'email'}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder={'email@gmail.com'}
                mb={4}
                bg={'gray.400'}
                color={'white'}
                borderWidth={0}
                _focus={{
                  bgColor: 'gray.600',
                }}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          {errors.email?.message && <ErrorText error={errors.email?.message} />}

          <Text color={'white'} mb={2} fontSize={16}>
            {' '}
            Senha{' '}
          </Text>

          <Controller
            control={control}
            name={'password'}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder={'*******'}
                secureTextEntry={true}
                bg={'gray.400'}
                mb={4}
                color={'white'}
                borderWidth={0}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                _focus={{
                  bgColor: 'gray.600',
                }}
              />
            )}
          />

          {errors.password?.message && (
            <ErrorText error={errors.password?.message} />
          )}

          <Center mb={8}>
            <Button
              _pressed={{
                bg: 'red.500',
              }}
              onPress={handleSubmit(login)}
              bg={'white'}
              mt={4}
              w={'60%'}
            >
              <Text color={'gray.700'}>Login</Text>
            </Button>
          </Center>
        </VStack>

        <VStack px={10} pb={10} justifyContent={'flex-end'} flex={1}>
          <Center>
            <Text color={'white'} mb={2} fontSize={16}>
              {' '}
              Não possui conta?{' '}
            </Text>
            <Button
              _pressed={{
                bg: 'red.500',
              }}
              onPress={() => {
                navigation.navigate('signup')
              }}
              bg={'gray.500'}
              w={'60%'}
            >
              <Text color={'white'}>Junte-se!</Text>
            </Button>
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}

export default Login
