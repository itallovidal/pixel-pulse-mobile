import {Button, Center, Input, Text, VStack, Image, Box, View, ScrollView, useTheme, useToast} from 'native-base'
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
import {Api} from "../utilities/axios";
import ErrorText from "../components/ErrorText";
import {AnimatedVstack} from "../components/AnimatedComponents";




const schema = z.object({
    name: z.string().min(5),
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
    favGenre1: z.number({
        required_error: "Por favor, escolha seu gênero favorito 1!"
    }).refine((arg)=>{
        return GENRES.some((genre)=>{
            return genre.id === arg;
        })
    }),
    favGenre2: z.number({
        required_error: "Por favor, escolha seu gênero favorito 2!"
    }).refine((arg)=>{
        return GENRES.some((genre)=>{
            return genre.id === arg;
        })
    }),

    favoriteGame: z.string({
        required_error: "Qual jogo mais te marcou?"
    }).min(4)
}).refine(({password, passwordConfirmation})=>{
    return password === passwordConfirmation;

}, {
    message: "Senhas não coincidem",
    path: ['passwordConfirmation']
}).refine(({favGenre1, favGenre2})=>{
    console.log(favGenre1, favGenre2)
    return favGenre1 !== favGenre2;


}, {
    message: "Os gêneros não podem ser iguais!",
    path: ['favGenre2']
})

interface ISchema extends z.infer<typeof schema>{}

function Signup(){
    const navigation = useNavigation<TAuthRouteNavigatorProps>()
    const {control, handleSubmit, setValue, formState: {errors}} = useForm<ISchema>({
        resolver: zodResolver(schema)
    })
    const theme = useTheme()
    const [isLoading, setIsLoading] = React.useState(false)
    const toast = useToast()

    console.log(errors)

    async function signup(formData : ISchema){
        setIsLoading(true)

        try{
            const {data} = await Api.post('users/signup', formData, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: 'application/json'
                }
            })

            console.log(data)

            navigation.navigate("login", {
                userCreated: true
            })}
        catch (e){
            console.log(e)
            toast.show({
                bgColor: "red.700",
                title: "Não foi possível criar o usuário!",
                placement: "bottom"
            })
            setIsLoading(false)
        }
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <VStack bg={"gray.700"} flex={1}>

                <View position={"absolute"} w={"full"} h={"60%"}>
                    <ImageBackground
                        style={{width : '100%', height: '100%'}}
                        source={placeholder}>

                        <LinearGradient
                            colors={['rgba(0,0,0,0)', theme.colors['gray']['700']]}
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
                        errors.email?.message && <ErrorText error={errors.email?.message}/>
                    }

                    <Controller control={control}
                                name={"name"}
                                render={({field: {onChange, onBlur, value}})=> (
                                    <Input placeholder={"coloque seu nick!"}
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
                        errors.name?.message && <ErrorText error={errors.name?.message}/>
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
                        errors.password?.message && <ErrorText error={errors.password?.message}/>
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
                        errors.passwordConfirmation?.message && <ErrorText error={errors.passwordConfirmation?.message}/>
                    }

                    <Text color={"white"} mb={2} fontSize={16}> Gêneros Favoritos </Text>

                    <SelectDropdown
                        data={GENRES}
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
                            setValue('favGenre1', selectedItem.id, {
                                shouldDirty: true,
                                shouldValidate: true
                            })
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.brName
                        }}
                        rowTextForSelection={(item, index) => {
                            return item.brName
                        }}
                    />

                    <SelectDropdown
                        data={GENRES}
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
                            setValue('favGenre2', selectedItem.id, {
                                shouldDirty: true,
                                shouldValidate: true
                            })
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.brName
                        }}
                        rowTextForSelection={(item, index) => {
                            return item.brName
                        }}
                    />

                    {
                        errors.favGenre1?.message && <ErrorText error={errors.favGenre1?.message}/>
                    }

                    {
                        errors.favGenre2?.message && <ErrorText error={errors.favGenre2?.message}/>
                    }

                    <Text color={"white"} mt={4} mb={2} fontSize={16}> Jogo da Vida </Text>
                    <Controller control={control}
                                name={"favoriteGame"}
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
                        errors.favoriteGame?.message && <ErrorText error={errors.favoriteGame?.message}/>
                    }

                    <Center>
                        <Button _pressed={{
                                     bg: "red.500"
                                }} bg={"white"}
                                mt={4}
                                w={"60%"}
                                isLoading={isLoading}
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
                            navigation.navigate("login",  {
                                userCreated: false
                            })
                        }}
                        bg={"gray.500"} w={"60%"}><Text color={"white"}>Entrar!</Text></Button>
                </Center>
            </VStack>
        </ScrollView>
    )
}

export default Signup



