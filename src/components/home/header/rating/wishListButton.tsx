import React from 'react'
import { ReviewContext } from '../../../context/ReviewContext'
import RemoveFromWishListButton from './removeFromWishListButton'
import AddToWishListButton from './addToWishListButton'

function WishListButton() {
  const {
    state: { game },
  } = React.useContext(ReviewContext)

  return game.wishList.isListed ? (
    <RemoveFromWishListButton />
  ) : (
    <AddToWishListButton />
  )
}

export default WishListButton
