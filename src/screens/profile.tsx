import React from 'react';
import {Image, VStack, Text, ScrollView, Center, useTheme, HStack} from "native-base";
import placeholderprofile from '../assets/placeholderprofile.jpg'
import placeholder from '../assets/fotoplaceholder.png'
import Button from "../components/Button";
import SelectDropdown from "react-native-select-dropdown";
import ChangeGenres from "../components/changeGenres";
import ChangePassword from "../components/changePassword";
import ChangeProfileInfo from "../components/changeProfileInfo";



function Profile() {

    const theme = useTheme()
    return (
        <ScrollView bg={theme.colors['gray']['400']}>
            <VStack bg={{
                    linearGradient: {
                        colors: [theme.colors['gray']['900'], theme.colors['gray']['400']],
                    }
                }}>
                <Image maxH={200} w={"full"} resizeMode={"cover"} source={placeholder}/>
                <Center>
                    <Image mb={8} borderRadius={"full"} mt={-60} h={120} w={120} source={placeholderprofile}/>

                    <Text color={"white"} fontWeight={"bold"} fontSize={20}>Nome da Pessoa</Text>
                    <Text color={"white"}> FPS | RPG</Text>


                    <Center  my={8} justifyContent={"center"}>

                        <SelectDropdown
                            data={['Trocar Gêneros', 'Trocar Jogo Favorito', 'Trocar Senha e Nick']}
                            buttonStyle={{
                                backgroundColor: theme.colors["gray"]["400"],
                                borderRadius: 4,
                                width: "50%",
                                marginBottom: 12
                            }}
                            buttonTextStyle={{color: "white"}}
                            dropdownStyle={{
                                marginTop: -50,
                                backgroundColor: 'white',
                                borderRadius: 4
                            }}
                            defaultButtonText={'Modificar Infos'}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        />

                        {/*<ChangeGenres/>*/}
                        {/*<ChangePassword/>*/}
                        <ChangeProfileInfo/>
                    </Center>

                    <Button> Voltar </Button>
                </Center>
            </VStack>
        </ScrollView>
    );
}

export default Profile;

