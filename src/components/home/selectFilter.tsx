import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { GlobalContext } from '../context/globalContextProvider'
import { FunnelSimple } from 'phosphor-react-native'
import { ReviewContext } from '../context/ReviewContext'

function SelectFilter() {
  const { theme } = React.useContext(GlobalContext)
  const { changeFilterState, filter } = React.useContext(ReviewContext)

  return (
    <SelectDropdown
      data={[`Discover`, `Meus Gêneros`]}
      buttonStyle={{
        backgroundColor: theme.colors.gray['600'],
        borderRadius: 4,
        width: `50%`,
      }}
      rowTextStyle={{
        fontSize: 16,
      }}
      buttonTextStyle={{ color: 'white' }}
      dropdownStyle={{
        marginTop: -20,
        backgroundColor: 'white',
        borderRadius: 4,
      }}
      defaultValueByIndex={filter === `discover` ? 0 : 1}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index)
        if (index === 0) {
          changeFilterState(`discover`)
        } else {
          changeFilterState(`forme`)
        }
      }}
      renderDropdownIcon={() => <FunnelSimple color={`white`} />}
      dropdownIconPosition={'left'}
    />
  )
}

export default SelectFilter
