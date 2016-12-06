# react-native-select-multiple [![dependencies Status](https://david-dm.org/tableflip/react-native-select-multiple/status.svg)](https://david-dm.org/tableflip/react-native-select-multiple)

A customiseable ListView that allows you to select multiple rows.

## Example

```js
import React, { Component } from 'react'
import { View } from 'react-native'
import SelectMultiple from 'react-native-select-multiple'

const fruits = ['Apples', 'Oranges', 'Pears']
// --- OR ---
// const fruits = [
//   { label: 'Apples', value: 'appls' },
//   { label: 'Oranges', value: 'orngs' },
//   { label: 'Pears', value: 'pears' }
// ]

class App extends Component {
  state = { selectedFruits: [] }

  onSelectionsChange = (selectedFruits) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedFruits })
  }

  render () {
    return (
      <View>
        <SelectMultiple
          items={fruits}
          selectedItems={this.state.selectedFruits}
          onSelectionsChange={this.onSelectionsChange} />
      </View>
    )
  }
}
```

## Properties

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| items | - | `array` | All items available in the list (array of `string` or `{ label, value }`) |
| selectedItems | `[]` | `array` | The currently selected items (array of `string` or `{ label, value }`) |
| onSelectionsChange | - | `func` | Callback called when a user selects or de-selects an item, passed `(selections, item)` |
| checkboxSource | [image](images/icon-checkbox.png) | `object` | [Image source](https://facebook.github.io/react-native/docs/image.html#source) for the checkbox (unchecked). |
| selectedCheckboxSource | [image](images/icon-checkbox-checked.png) | `object` | [Image source](https://facebook.github.io/react-native/docs/image.html#source) for the checkbox (checked). |
| style | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/scrollview.html#style) for the `ListView` container. |
| rowStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/view.html#style) for the row container. |
| checkboxStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/image.html#style) for the checkbox image. |
| labelStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/text.html#style) for the text label. |
| selectedRowStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/view.html#style) for the row container when selected. |
| selectedCheckboxStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/image.html#style) for the checkbox image when selected. |
| selectedLabelStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/text.html#style) for the text label when selected. |

---

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
