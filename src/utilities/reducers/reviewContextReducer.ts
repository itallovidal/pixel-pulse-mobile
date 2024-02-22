import { IComment, IGame } from '../../@types/game'

enum EActions {
  'SET_GAME',
  'SET_RATING',
  'SET_FILTER',
  'SET_COMMENTARIES',
  'SET_WISHLIST_INFO',
}
type TEnum = keyof typeof EActions
export interface IReviewReducerActions {
  type: TEnum
  payload: any
}

export interface IReviewReducerState {
  game: IGame
  rating: number
  filter: `discover` | `forme`
  commentaries: IComment[] | null[]
}

export function reviewContextReducer(
  state: IReviewReducerState,
  action: IReviewReducerActions,
) {
  if (action.type === 'SET_WISHLIST_INFO') {
    const { wishList, ...props } = state.game
    return {
      ...state,
      game: {
        ...props,
        wishList: action.payload as { id: string; isListed: boolean },
      },
    }
  }

  if (action.type === 'SET_GAME') {
    return {
      ...state,
      game: action.payload as IGame,
    }
  }

  if (action.type)
    if (action.type === 'SET_FILTER') {
      return {
        ...state,
        filter: action.payload as `discover` | `forme`,
      }
    }

  if (action.type === 'SET_RATING') {
    return {
      ...state,
      rating: action.payload as number,
    }
  }

  if (action.type === 'SET_COMMENTARIES') {
    return {
      ...state,
      commentaries: action.payload as IComment[] | null[],
    }
  }

  return state
}
