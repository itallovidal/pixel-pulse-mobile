import React from 'react'
import { Divider, HStack, Icon, Pressable } from 'native-base'
import { GameController, Star } from 'phosphor-react-native'
import { GlobalContext } from '../context/globalContextProvider'
import { ReviewContext } from '../context/ReviewContext'
import { addToWishPlay } from '../../utilities/api/addToWishPlay'
import { removeFromWishPlay } from '../../utilities/api/removeFromWishPlay'

function StarReview() {
  const { theme, userToken, showToast } = React.useContext(GlobalContext)
  const {
    state: { rating, game },
    updateRating,
    isReviewLoading,
    homeRouteParams,
    handleUpdateWishList,
  } = React.useContext(ReviewContext)

  async function handleAddToWishList() {
    const wishListInfo = await addToWishPlay(
      userToken!.accessToken,
      game.info.id,
    )

    console.log('->>>')
    console.log(wishListInfo)

    handleUpdateWishList(wishListInfo)

    showToast({
      bg: 'green.700',
      placement: 'top',
      title: 'Game adicionado à sua playlist!',
    })
  }

  async function handleRemoveFromWishList() {
    await removeFromWishPlay(userToken!.accessToken, game.wishList.id)

    handleUpdateWishList({
      isListed: false,
      id: '',
    })
    showToast({
      bg: 'green.700',
      placement: 'top',
      title: 'Game Removido da sua playlist!',
    })
  }

  const stars = []

  for (let i = 1; i < 6; i++) {
    stars.push(
      <Pressable
        isDisabled={isReviewLoading || game.wishList.isListed}
        key={i}
        onPress={() =>
          updateRating(rating === i && !homeRouteParams?.gameID ? 0 : i)
        }
        variant={'unstyled'}
        _disabled={{
          opacity: 0.3,
        }}
      >
        <Star
          size={48}
          color={theme.colors.yellow[600]}
          weight={rating >= i ? 'fill' : 'thin'}
        />
      </Pressable>,
    )
  }

  return (
    <HStack alignItems={'center'} justifyContent={'center'}>
      <Pressable
        onPress={() =>
          game.wishList.isListed
            ? handleRemoveFromWishList()
            : handleAddToWishList()
        }
        isDisabled={rating > 0}
        _pressed={{ opacity: 0.6 }}
      >
        <Icon
          opacity={rating > 0 ? 0.4 : 1}
          as={GameController}
          size={40}
          color={game.wishList.isListed ? `red.600` : 'white'}
        />
      </Pressable>
      <Divider mx={5} bg={'white'} orientation={'vertical'} />

      <HStack>{stars}</HStack>
    </HStack>
  )
}

export default StarReview
