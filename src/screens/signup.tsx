import {Button, Center, Input, Text, VStack, Image, Box, View, ScrollView, useTheme} from 'native-base'
import {ImageBackground} from 'react-native';
import React from 'react'

import RNPickerSelect from 'react-native-picker-select';

import placeholder from '../assets/fotoplaceholder.png'
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";
import {TAuthRouteNavigatorProps} from "../routes/RouteTypes";
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";


const genres = ['FPS', 'RPG'] as const


const schema = z.object({
    email: z.string().min(5, {
        message: "Email deve conter mais de 5 caracteres."
    }).email({
        message: "Email inválido!"
    }),
    password: z.string({
        required_error: "Por favor, digite a senha!"
    }).min(8, {
        message: "Senha deve conter mais de 8 caracteres."
    }),
    passwordConfirmation: z.string({
        required_error: "Por favor, digite a senha!"
    }).min(8, {
        message: "Senha deve conter mais de 8 caracteres."
    }),
    favoriteGen1: z.enum(genres),
    favorteGen2: z.enum(genres),

    gamesLife: z.string().min(4)
})

interface ISchema extends z.infer<typeof schema>{}

function Signup(){
    const navigation = useNavigation<TAuthRouteNavigatorProps>()
    const {control} = useForm<ISchema>()
    const theme = useTheme()

    return (

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <VStack bg={"gray.700"} flex={1}>

                <View position={"absolute"} w={"full"} h={"60%"}>
                    <ImageBackground
                        style={{width : '100%', height: '100%'}}
                        source={placeholder}>

                        <LinearGradient
                            colors={['rgba(0,0,0,0)', '#121214']}
                            style={{height : '100%', width : '100%'}}/>

                    </ImageBackground>
                </View>



                <VStack px={10} pt={"20"}>
                    <Text fontSize={32}
                          color={"white"}
                          fontWeight={"bold"}
                          textAlign={"center"}> Junte-se à </Text>

                    <Text fontSize={32}
                          color={"white"}
                          fontWeight={"bold"}
                          textAlign={"center"}> nossa comunidade! </Text>

                    <Text color={"white"} mb={2} fontSize={16}> Email </Text>


                    <Controller control={control}
                                name={"email"}
                                render={({field: {onChange, onBlur, value}})=> (
                                    <Input placeholder={"email@gmail.com"}
                                           mb={4}
                                           bg={"gray.400"}
                                           color={"white"}
                                           borderWidth={0}
                                           _focus={{
                                               bgColor: "gray.600"
                                           }}
                                           onChangeText={onChange}
                                           onBlur={onBlur}
                                           value={value}
                                    />
                                )} />

                    <Text color={"white"} mb={2} fontSize={16}> Senha </Text>

                    <Controller control={control}
                                name={"email"}
                                render={({field: {onChange, onBlur, value}})=> (
                                    <Input placeholder={"*******"} secureTextEntry={true}
                                           bg={"gray.400"}
                                           color={"white"}
                                           borderWidth={0}
                                           _focus={{
                                               bgColor: "gray.600"
                                           }}
                                           onChangeText={onChange}
                                           onBlur={onBlur}
                                           value={value}
                                    />
                                )} />


                    <Text color={"white"} my={2} fontSize={16}> Confirme a senha </Text>

                    <Controller control={control}
                                name={"passwordConfirmation"}
                                render={({field: {onChange, onBlur, value}})=> (
                                    <Input placeholder={"*******"} secureTextEntry={true}
                                           bg={"gray.400"}
                                           color={"white"}
                                           borderWidth={0}
                                           _focus={{
                                               bgColor: "gray.600"
                                           }}
                                           onChangeText={onChange}
                                           onBlur={onBlur}
                                           value={value}
                                    />
                                )} />

                    <Text color={"white"} mt={4} mb={2} fontSize={16}> Gêneros Favoritos </Text>
                    {/*<Input placeholder={"FPS"}*/}
                    {/*       mb={4}*/}
                    {/*       bg={"gray.400"}*/}
                    {/*       color={"white"}*/}
                    {/*       borderWidth={0}*/}
                    {/*       _focus={{*/}
                    {/*           bgColor: "gray.600"*/}
                    {/*       }}*/}
                    {/*/>*/}

                    {/*<Input placeholder={"RPG"}*/}
                    {/*       mb={4}*/}
                    {/*       bg={"gray.400"}*/}
                    {/*       color={"white"}*/}
                    {/*       borderWidth={0}*/}
                    {/*       _focus={{*/}
                    {/*           bgColor: "gray.600"*/}
                    {/*       }}*/}
                    {/*/>*/}

                    <RNPickerSelect
                        placeholder={"Escolha seu gênero"}
                        style={{inputAndroid: {
                                color: 'white',
                                backgroundColor: theme.colors["gray"]["400"],
                                borderRadius: 5
                            }
                        }}
                        onValueChange={(value) => console.log("")}
                        items={[
                            { label: 'Football', value: 'football' },
                            { label: 'Baseball', value: 'baseball' },
                            { label: 'Hockey', value: 'hockey' },
                        ]}
                    />

                    <Text color={"white"} mt={4} mb={2} fontSize={16}> Jogo da Vida </Text>
                    <Controller control={control}
                                name={"gamesLife"}
                                render={({field: {onChange, onBlur, value}})=> (
                                    <Input placeholder={"*******"}
                                           mb={4}
                                           bg={"gray.400"}
                                           color={"white"}
                                           borderWidth={0}
                                           _focus={{
                                               bgColor: "gray.600"
                                           }}
                                           onChangeText={onChange}
                                           onBlur={onBlur}
                                           value={value}
                                    />
                                )} />


                    <Center>
                        <Button _pressed={{
                                     bg: "red.500"
                                }} bg={"white"}
                                mt={4}
                                w={"60%"}>

                            <Text color={"gray.700"}>Registrar</Text>
                        </Button>
                    </Center>
                </VStack>

                <Center px={10} pb={10} mt={8} justifyContent={"flex-end"}  flex={1}>
                    <Text color={"white"} mb={2} fontSize={16}> Já possui conta? </Text>
                    <Button
                        _pressed={{
                            bg: "red.500"
                        }}
                        onPress={()=> {
                            navigation.goBack()
                        }}
                        bg={"gray.500"} w={"60%"}><Text color={"white"}>Entrar!</Text></Button>
                </Center>
            </VStack>
        </ScrollView>
    )
}

export default Signup



