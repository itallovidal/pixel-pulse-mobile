import React from 'react';
import {
    FlatList,
    HStack,
    TextArea,
    VStack
} from "native-base";

import Button from "../components/Button";
import Comment from "../components/comment";
import HeaderHome from "../components/headerHome";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";


const data = [
    {
        id: 1
    },
    {
        id: 2
    },

]

const AnimatedVStack = Animated.createAnimatedComponent(VStack)


function Home() {
    const [show, setShow] = React.useState(false)


    return (
            <VStack bg={"gray.700"}  flex={1}>
                <FlatList
                    onScroll={({nativeEvent: {contentOffset}})=>{
                        console.log(contentOffset)
                        if(contentOffset.y > 0){
                            setShow(true)
                        }

                        if(contentOffset.y === 0){
                            setShow(false)
                        }
                    }}

                    ListHeaderComponent={<HeaderHome/>}
                    data={data}
                    renderItem={()=>{
                        return <Comment/>
                    }}/>

                {
                    show ? (
                        <AnimatedVStack entering={FadeIn} exiting={FadeOut} p={4}  bg={"gray.700"} w={"full"} my={6}>
                            <TextArea autoCompleteType variant={"unstyled"}
                                      placeholder={"Digite um breve comentário."}
                                      borderWidth={0}
                                      bgColor={"gray.400"}
                                      mb={4}
                                      p={4}
                                      color={"white"}/>
                            <HStack justifyContent={"flex-end"}>
                                <Button buttonTheme={"unstyled"}>Sem comentários..</Button>
                                <Button buttonTheme={"whiteTheme"}>Postar</Button>
                            </HStack>
                        </AnimatedVStack>
                    )
                        : null
                }

            </VStack>
    );
}

export default Home;