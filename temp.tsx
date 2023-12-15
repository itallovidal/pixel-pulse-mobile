import React from 'react';
import {Button, Text} from "native-base";

function Temp() {
    return (
        // <Text propriedade={}>teste</Text>
        <Button onPress={()=>{
            console.log('oi')
        }}></Button>
    );
}

export default Temp;