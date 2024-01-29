import React from 'react';
import {Image, VStack, Text, ScrollView, Center, useTheme, HStack} from "native-base";
import placeholderprofile from '../assets/placeholderprofile.jpg'
import placeholder from '../assets/fotoplaceholder.png'
import Button from "../components/Button";
import SelectDropdown from "react-native-select-dropdown";
import ChangeGenres from "../components/changeGenres";
import ChangePassword from "../components/changePassword";
import ChangeProfileInfo from "../components/changeProfileInfo";
import {ImageBackground} from "react-native";
import {LinearGradient} from "expo-linear-gradient";



function Profile() {
    const [selected, setSelected] = React.useState(0)

    const theme = useTheme()
    return (
        <ScrollView bg={theme.colors['gray']['700']}>
            <VStack bg={theme.colors['gray']['700']}>
                <ImageBackground
                    style={{width : '100%', height: '100%', maxHeight: 200}}
                    source={placeholder}>

                    <LinearGradient
                        colors={['rgba(0,0,0,0)', theme.colors['gray']['700']]}
                        style={{height : '100%', width : '100%'}}/>

                </ImageBackground>
                <Center>
                    <Image mb={8} borderRadius={"full"} mt={-60} h={120} w={120} source={placeholderprofile}/>

                    <Text color={"white"} fontWeight={"bold"} fontSize={20}>Nome da Pessoa</Text>
                    <Text color={"white"}> FPS | RPG</Text>


                    <Center px={8} w={"full"} my={8} justifyContent={"center"}>

                        <SelectDropdown
                            data={['Modificar Infos', 'Trocar Gêneros', 'Trocar Senha', 'Modificar Perfil']}
                            buttonStyle={{
                                backgroundColor: theme.colors["gray"]["400"],
                                borderRadius: 4,
                                width: "50%",
                                marginBottom: 12
                            }}
                            buttonTextStyle={{color: "white"}}
                            dropdownStyle={{
                                marginTop: "-10%",
                                backgroundColor: 'white',
                                borderRadius: 4,
                            }}
                            defaultValueByIndex={0}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, )
                                console.log(index )
                                setSelected(index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        />

                        {
                            selected === 1
                                ? <ChangeGenres/>
                                : selected === 2
                                ? <ChangePassword/>
                                : selected === 3
                                ? <ChangeProfileInfo/> : null
                        }

                    </Center>
                    <Button> Voltar </Button>
                </Center>
            </VStack>
        </ScrollView>
    );
}

export default Profile;

