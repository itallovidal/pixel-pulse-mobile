import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { GlobalContext } from '../context/globalContextProvider'
import { FunnelSimple } from 'phosphor-react-native'
import { ReviewContext } from '../context/ReviewContext'

function SelectFilter() {
  const { theme } = React.useContext(GlobalContext)
  const {
    changeFilterState,
    state: { filter },
  } = React.useContext(ReviewContext)

  return (
    <SelectDropdown
      data={[`Discover`, `Meus Gêneros`]}
      buttonStyle={{
        backgroundColor: theme.colors.gray['600'],
        borderRadius: 4,
        width: 'auto',
      }}
      rowTextStyle={{
        fontSize: 12,
      }}
      buttonTextStyle={{ fontSize: 0, display: 'none' }}
      dropdownStyle={{
        marginTop: -20,
        backgroundColor: 'white',
        borderRadius: 4,
        width: 100,
        marginLeft: -50,
      }}
      defaultValueByIndex={filter === `discover` ? 0 : 1}
      onSelect={(selectedItem, index) => {
        if (index === 0) {
          changeFilterState(`discover`)
        } else {
          changeFilterState(`forme`)
        }
      }}
      buttonTextAfterSelection={() => ''}
      renderDropdownIcon={() => <FunnelSimple color={`white`} />}
      dropdownIconPosition={'right'}
    />
  )
}

export default SelectFilter
