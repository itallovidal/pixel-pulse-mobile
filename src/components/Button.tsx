import React from 'react';
import {Button as NativeBaseButton, IButtonProps, Text} from "native-base";

interface IMyButton extends IButtonProps{
    children: string
}

function Button({children, ...props} : IMyButton ) {
    return (
        <NativeBaseButton {...props}  _pressed={{
                                bg: "red.500"
                            }}

                           bg={"gray.500"}

        >
            <Text color={"white"}>{children}</Text>
        </NativeBaseButton>
    );
}

export default Button;