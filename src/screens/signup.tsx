import {Button, Center, Input, Text, VStack, Image, Box, View, ScrollView, useTheme} from 'native-base'
import {ImageBackground} from 'react-native';
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'

import placeholder from '../assets/fotoplaceholder.png'
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";
import {TAuthRouteNavigatorProps} from "../routes/RouteTypes";
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {GENRES} from "../@types/apiTypes";




const schema = z.object({
    email: z.string({
        required_error: "Prencha o email, por favor."
    }).min(5, {
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
        required_error: "Por favor, confirme a senha!"
    }).min(8, {
        message: "Senha deve conter mais de 8 caracteres."
    }),
    favoriteGen1: z.enum(GENRES, {
        required_error: "Escolha os gêneros, por favor."
    }),
    favoriteGen2: z.enum(GENRES, {
        required_error: "Escolha os gêneros, por favor."
    }),

    gamesLife: z.string({
        required_error: "Qual jogo mais te marcou?"
    }).min(4)
}).refine(({password, passwordConfirmation})=>{
    if(password === passwordConfirmation){
        return true
    }
    return false
}, {
    message: "Senhas não coincidem",
    path: ['passwordConfirmation']
}).refine(({favoriteGen1, favoriteGen2})=>{
    if(favoriteGen1 === favoriteGen2){
        return false
    }

    return true
}, {
    message: "Os gêneros não podem ser iguais!",
    path: ['favoriteGen2']
})

interface ISchema extends z.infer<typeof schema>{}

function Signup(){
    const navigation = useNavigation<TAuthRouteNavigatorProps>()
    const {control, handleSubmit, setValue, formState: {errors}} = useForm<ISchema>({
        resolver: zodResolver(schema)
    })
    const theme = useTheme()


    function signup(data : ISchema){
        console.log(data)
    }

    return (

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <VStack bg={"gray.700"} flex={1}>

                <View position={"absolute"} w={"full"} h={"60%"}>
                    <ImageBackground
                        style={{width : '100%', height: '100%'}}
                        source={placeholder}>

                        <LinearGradient
                            colors={['rgba(0,0,0,0)', theme.colors['gray']['400']]}
                            style={{height : '100%', width : '100%'}}/>

                    </ImageBackground>
                </View>

                <VStack px={10} pt={"20"}>
                    <Text fontSize={32}
                          color={"white"}
                          fontWeight={"bold"}
                          textAlign={"center"}> Junte-se à </Text>

                    <Text fontSize={32}
                          mt={-4}
                          mb={4}
                          color={"white"}
                          fontWeight={"bold"}
                          textAlign={"center"}> nossa comunidade! </Text>

                    <Text color={"white"} mb={2} fontSize={16}> Email </Text>


                    <Controller control={control}
                                name={"email"}
                                render={({field: {onChange, onBlur, value}})=> (
                                    <Input placeholder={"email@gmail.com"}
                                           mb={2}
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

                    {
                        errors.email?.message && <Text mb={8} color={"red.500"}>{errors?.email?.message}</Text>
                    }

                    <Text color={"white"} mb={2} fontSize={16}> Senha </Text>

                    <Controller control={control}
                                name={"password"}
                                render={({field: {onChange, onBlur, value}})=> (
                                    <Input placeholder={"*******"} secureTextEntry={false}
                                           bg={"gray.400"}
                                           mb={2}
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

                    {
                        errors.password?.message && <Text mb={8} color={"red.500"}>{errors?.password?.message}</Text>
                    }

                    <Text color={"white"} mb={2} fontSize={16}> Confirme a senha </Text>

                    <Controller control={control}
                                name={"passwordConfirmation"}
                                render={({field: {onChange, onBlur, value}})=> (
                                    <Input placeholder={"*******"} secureTextEntry={false}
                                           bg={"gray.400"}
                                           color={"white"}
                                           mb={2}
                                           borderWidth={0}
                                           _focus={{
                                               bgColor: "gray.600"
                                           }}
                                           onChangeText={onChange}
                                           onBlur={onBlur}
                                           value={value}
                                    />
                                )} />

                    {
                        errors.passwordConfirmation?.message && <Text mb={8} color={"red.500"}>{errors?.passwordConfirmation?.message}</Text>
                    }

                    <Text color={"white"} mb={2} fontSize={16}> Gêneros Favoritos </Text>

                    <SelectDropdown
                        data={['RPG', 'FPS']}
                        buttonStyle={{
                            backgroundColor: theme.colors["gray"]["400"],
                            borderRadius: 4,
                            width: "100%",
                            marginBottom: 8
                        }}
                        buttonTextStyle={{color: "white"}}
                        dropdownStyle={{
                            marginTop: -50,
                            backgroundColor: 'white',
                            borderRadius: 4
                        }}
                        defaultButtonText={'Selecione o gênero.'}
                        onSelect={(selectedItem, index) => {
                            setValue('favoriteGen1', selectedItem, {
                                shouldDirty: true,
                                shouldValidate: true
                            })
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />

                    <SelectDropdown
                        data={['RPG', 'FPS']}
                        buttonStyle={{
                            backgroundColor: theme.colors["gray"]["400"],
                            borderRadius: 4,
                            width: "100%",
                            marginBottom: 12
                        }}
                        buttonTextStyle={{color: "white"}}
                        dropdownStyle={{
                            marginTop: -50,
                            backgroundColor: 'white',
                            borderRadius: 4
                        }}
                        defaultButtonText={'Selecione o gênero.'}
                        onSelect={(selectedItem, index) => {
                            setValue('favoriteGen2', selectedItem, {
                                shouldDirty: true,
                                shouldValidate: true
                            })
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />

                    {
                        errors.favoriteGen1?.message && <Text mb={8} color={"red.500"}>{errors?.favoriteGen1?.message}</Text>
                    }

                    {
                        errors.favoriteGen2?.message && <Text mb={8} color={"red.500"}>{errors?.favoriteGen2?.message}</Text>
                    }

                    <Text color={"white"} mt={4} mb={2} fontSize={16}> Jogo da Vida </Text>
                    <Controller control={control}
                                name={"gamesLife"}
                                render={({field: {onChange, onBlur, value}})=> (
                                    <Input placeholder={"*******"}
                                           mb={2}
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

                    {
                        errors.gamesLife?.message && <Text mb={8} color={"red.500"}>{errors?.gamesLife?.message}</Text>
                    }

                    <Center>
                        <Button _pressed={{
                                     bg: "red.500"
                                }} bg={"white"}
                                mt={4}
                                w={"60%"}
                                onPress={handleSubmit(signup)}
                        >

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



