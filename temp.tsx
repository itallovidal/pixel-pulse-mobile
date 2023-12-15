import React from 'react';
import {Button, Center, Text, VStack} from "native-base";
import {ThumbsDown, ThumbsUp} from "phosphor-react-native";

function Temp() {
    // const [like, setLike] = React.useState(false)
    // const [dislike, setDislike] = React.useState(false)

    const [menage, setMenage] = React.useState({
        like: false,
        dislike: false
    })


    return (
        <Center flex={1}>
            <Button onPress={()=>{
                setMenage((prevState)=>{
                    return {
                        ...prevState,
                        dislike: !prevState.dislike
                    }
                })
            }} variant={"unstyled"}>
                <ThumbsDown mirrored={true} size={32} weight={ menage.dislike ? "fill" : "regular"} />
            </Button>

            <Button onPress={()=>{
                setMenage((prevState)=>{
                    return {
                        ...prevState,
                        like: !prevState.like
                    }
                })
            }} variant={"unstyled"} >
                <ThumbsUp  size={32} weight={menage.like ? "fill" : "regular"} />
            </Button>
        </Center>
    );
}

export default Temp;