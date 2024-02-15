interface IHeaderToggleActions {
  type: 'description' | 'platform'
}

interface IHeaderReducerState {
  descriptionToggle: boolean
  platformsToggle: boolean
}

export function toggleReducer(
  state: IHeaderReducerState,
  action: IHeaderToggleActions,
) {
  if (action.type === 'description')
    return {
      descriptionToggle: !state.descriptionToggle,
      platformsToggle: state.platformsToggle,
    }

  if (action.type === 'platform')
    return {
      descriptionToggle: state.descriptionToggle,
      platformsToggle: !state.platformsToggle,
    }

  return {
    descriptionToggle: false,
    platformsToggle: false,
  }
}
