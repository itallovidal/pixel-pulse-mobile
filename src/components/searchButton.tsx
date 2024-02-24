import { HStack, Icon } from 'native-base'
import { MagnifyingGlass } from 'phosphor-react-native'
import Button from './Button'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatedInput } from './AnimatedComponents'
import { Layout } from 'react-native-reanimated'
import { Keyboard, TextInput } from 'react-native'
import { ISearchSchema, searchSchema } from '../schemas/searchSchema'
import { GlobalContext } from './context/globalContextProvider'

export function SearchButton() {
  const {
    navigation: { navigate },
  } = React.useContext(GlobalContext)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearchSchema>({
    resolver: zodResolver(searchSchema),
  })
  const [isOpen, setIsOpen] = React.useState(false)
  const inputRef = React.useRef<TextInput>(null)
  isOpen && inputRef.current && inputRef.current.focus()
  Keyboard.addListener('keyboardDidHide', () => setIsOpen(false))

  function handleSubmitSearch({ text }: ISearchSchema) {
    navigate('search', {
      q: text,
    })
  }

  return (
    <HStack
      w={'5/6'}
      flex={0}
      position={'absolute'}
      zIndex={10}
      top={49}
      left={0}
      roundedRight={6}
    >
      <Controller
        control={control}
        name={'text'}
        render={({ field: { onChange, onBlur, value } }) => (
          <AnimatedInput
            ref={inputRef}
            layout={Layout.duration(500)}
            // isDisabled={isReviewLoading}
            flex={isOpen ? 1 : 0}
            w={isOpen ? 1 : 0}
            _disabled={{
              opacity: 0.4,
            }}
            _focus={{
              borderColor: errors.text ? `red.600` : `gray.700`,
            }}
            borderRadius={0}
            borderColor={errors.text ? `red.600` : `gray.700`}
            variant={'unstyled'}
            placeholder={'Pesquise um Jogo.'}
            borderBottomWidth={errors.text ? 3 : 0}
            bgColor={'gray.400'}
            color={'white'}
            onChangeText={onChange}
            onBlur={() => {
              onBlur()
              setIsOpen(false)
            }}
            value={value}
          />
        )}
      />
      <Button
        onPress={() =>
          !isOpen ? setIsOpen(true) : handleSubmit(handleSubmitSearch)()
        }
        _pressed={{
          opacity: 0.4,
        }}
        bg={'gray.700'}
        pl={6}
        roundedLeft={0}
      >
        <Icon as={MagnifyingGlass} color={'white'} />
      </Button>
    </HStack>
  )
}
