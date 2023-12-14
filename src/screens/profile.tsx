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
    const [selected, setSelected] = React.useState(0)

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

