import React from 'react'
import {Text, VStack} from 'native-base'
import { formatListOfContents } from '../../utilities/methods'
import { AnimatedText } from '../AnimatedComponents'
import { FadeIn } from 'react-native-reanimated'
import { toggleReducer } from '../../utilities/reducers/headerToggleReducer'
import { ReviewContext } from '../context/ReviewContext'

function GameDescription() {
  const {
    state: { game },
  } = React.useContext(ReviewContext)
  const [state, dispatch] = React.useReducer(toggleReducer, {
    descriptionToggle: false,
    platformsToggle: false,
  })

  return (
    <VStack mb={4}>
      <Text
        pl={2}
        numberOfLines={2}
        fontSize={24}
        color={'white'}
        fontWeight={'bold'}
        marginLeft={-2}
      >
        {game.info.name}
      </Text>

      <Text fontSize={16} mb={2} color={'white'}>
        {game.info.releaseDate}
      </Text>

      <Text
        color={state.platformsToggle ? 'white' : 'gray.300'}
        numberOfLines={state.platformsToggle ? 99 : 1}
        onPress={() => {
          dispatch({ type: 'platform' })
        }}
        fontSize={16}
      >
        {formatListOfContents(game.info.genres)}
      </Text>
      <Text
        color={state.platformsToggle ? 'white' : 'gray.300'}
        numberOfLines={state.platformsToggle ? 99 : 1}
        onPress={() => {
          dispatch({ type: 'platform' })
        }}
        fontSize={16}
      >
        {formatListOfContents(game.info.platforms)}
      </Text>

      <AnimatedText
        layout={FadeIn.duration(800)}
        fontSize={16}
        mt={4}
        color={state.descriptionToggle ? 'gray.50' : 'gray.300'}
        numberOfLines={state.descriptionToggle ? 99 : 3}
        onPress={() => {
          dispatch({ type: 'description' })
        }}
      >
        {game.info.summary}
      </AnimatedText>
    </VStack>
  )
}

export default GameDescription
