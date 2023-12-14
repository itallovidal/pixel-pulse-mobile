import React from 'react';
import {Input, Text, useTheme, VStack} from "native-base";
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import SelectDropdown from "react-native-select-dropdown";
import Button from "./Button";
import {GENRES} from "../@types/apiTypes";




const schema = z.object({
    favoriteGen1: z.enum(GENRES, {
        required_error: "Escolha os gêneros, por favor."
    }),
    favoriteGen2: z.enum(GENRES, {
        required_error: "Escolha os gêneros, por favor."
    }),
    gamesLife: z.string({
        required_error: "Qual jogo mais te marcou?"
    }).min(4)
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

function ChangeGenres() {
    const {control, handleSubmit, setValue, formState: {errors}} = useForm<ISchema>({
        resolver: zodResolver(schema)
    })
    const theme = useTheme()

    function changeGenres(data : ISchema){
        console.log(data)
    }

    return (
        <VStack my={8}>
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

            <Button>Modificar Informações.</Button>
        </VStack>
    );
}

export default ChangeGenres;