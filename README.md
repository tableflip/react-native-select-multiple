# react-native-select-multiple

[![Build Status](https://travis-ci.org/tableflip/react-native-select-multiple.svg?branch=master)](https://travis-ci.org/tableflip/react-native-select-multiple)
[![dependencies Status](https://david-dm.org/tableflip/react-native-select-multiple/status.svg)](https://david-dm.org/tableflip/react-native-select-multiple)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> A customiseable FlatList that allows you to select multiple rows.

![select-multiple](https://cloud.githubusercontent.com/assets/152863/20929245/3569a3c6-bbc1-11e6-9d80-7f13e4c532c5.gif)

## Install

```sh
npm install react-native-select-multiple
```

## Usage

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
export default App

```

## Customize label

```js
import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import SelectMultiple from 'react-native-select-multiple'

const fruits = ['Apples', 'Oranges', 'Pears']
// --- OR ---
// const fruits = [
//   { label: 'Apples', value: 'appls' },
//   { label: 'Oranges', value: 'orngs' },
//   { label: 'Pears', value: 'pears' }
// ]

const renderLabel = (label, style) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image style={{width: 42, height: 42}} source={{uri: 'https://dummyimage.com/100x100/52c25a/fff&text=S'}} />
      <View style={{marginLeft: 10}}>
        <Text style={style}>{label}</Text>
      </View>
    </View>
  )
}

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
          renderLabel={renderLabel}
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
| keyExtractor | `index` | `func` | [keyExtractor](https://facebook.github.io/react-native/docs/flatlist.html#keyextractor) for the `FlatList` |
| checkboxSource | [image](images/icon-checkbox.png) | `object` | [Image source](https://facebook.github.io/react-native/docs/image.html#source) for the checkbox (unchecked). |
| selectedCheckboxSource | [image](images/icon-checkbox-checked.png) | `object` | [Image source](https://facebook.github.io/react-native/docs/image.html#source) for the checkbox (checked). |
| flatListProps | {} | `object` | Additional props for the flat list |
| style | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/scrollview.html#style) for the `FlatList` container. |
| rowStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/view.html#style) for the row container. |
| checkboxStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/image.html#style) for the checkbox image. |
| labelStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/text.html#style) for the text label. |
| selectedRowStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/view.html#style) for the row container when selected. |
| selectedCheckboxStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/image.html#style) for the checkbox image when selected. |
| selectedLabelStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/text.html#style) for the text label when selected. |
| renderLabel | null | `func` | Function for render label. |
| maxSelect | null | `int` | Maximum number of selected items|

## Contribute

Feel free to dive in! [Open an issue](https://github.com/tableflip/react-native-select-multiple/issues/new) or submit PRs.

## License

[ISC](LICENSE) © TABLEFLIP

----

A [(╯°□°）╯︵TABLEFLIP](https://tableflip.io) side project.
