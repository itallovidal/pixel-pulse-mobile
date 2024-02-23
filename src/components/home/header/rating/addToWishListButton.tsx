import React from 'react'
import { Icon, Pressable } from 'native-base'
import { GameController } from 'phosphor-react-native'
import { GlobalContext } from '../../../context/globalContextProvider'
import { ReviewContext } from '../../../context/ReviewContext'
import { addToWishPlay } from '../../../../utilities/api/addToWishPlay'
import { removeFromWishPlay } from '../../../../utilities/api/removeFromWishPlay'

function AddToWishListButton() {
  const { userToken, showToast } = React.useContext(GlobalContext)
  const {
    state: { rating, game },
    handleUpdateWishList,
  } = React.useContext(ReviewContext)

  async function handleAddToWishList() {
    const wishListInfo = await addToWishPlay(
      userToken!.accessToken,
      game.info.id,
    )

    handleUpdateWishList(wishListInfo)

    showToast({
      bg: 'green.700',
      placement: 'top',
      title: 'Game adicionado à sua lista de interesses!',
    })
  }

  return (
    <Pressable
      onPress={() => handleAddToWishList()}
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
  )
}

export default AddToWishListButton
