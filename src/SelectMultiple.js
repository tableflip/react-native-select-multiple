import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, Text, TouchableWithoutFeedback, Image } from 'react-native'
import styles from './SelectMultiple.styles'
import checkbox from '../images/icon-checkbox.png'
import checkboxChecked from '../images/icon-checkbox-checked.png'
import { mergeStyles } from './style'

const itemType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({ label: PropTypes.any, value: PropTypes.any })
])

const styleType = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.number,
  PropTypes.array
])

const sourceType = PropTypes.oneOfType([PropTypes.object, PropTypes.number])

// A customizable FlatList that allows you to select multiple rows
export default class SelectMultiple extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(itemType).isRequired,
    selectedItems: PropTypes.arrayOf(itemType),
    maxSelect: PropTypes.number,
    onSelectionsChange: PropTypes.func.isRequired,
    keyExtractor: PropTypes.func,

    checkboxSource: sourceType,
    selectedCheckboxSource: sourceType,
    renderLabel: PropTypes.func,
    flatListProps: PropTypes.any,
    style: styleType,
    rowStyle: styleType,
    checkboxStyle: styleType,
    labelStyle: styleType,

    selectedRowStyle: styleType,
    selectedCheckboxStyle: styleType,
    selectedLabelStyle: styleType
  }

  static defaultProps = {
    selectedItems: [],
    style: {},
    rowStyle: {},
    checkboxStyle: {},
    checkboxCheckedStyle: {},
    labelStyle: {},
    maxSelect: null,
    checkboxSource: checkbox,
    selectedCheckboxSource: checkboxChecked,
    renderLabel: null
  }

  items = undefined
  selectedItems = undefined
  rowData = []

  getRowData (items, selectedItems) {
    if (items !== this.items || selectedItems !== this.selectedItems) {
      this.items = items
      this.selectedItems = selectedItems
      this.rowData = items.map(this.toLabelValueObject)
      selectedItems = (selectedItems || []).map(this.toLabelValueObject)

      this.rowData.forEach((item) => {
        item.selected = selectedItems.some((i) => i.value === item.value)
      })
    }

    return this.rowData
  }

  onRowPress (row) {
    const { label, value } = row
    let { selectedItems, maxSelect } = this.props

    selectedItems = (selectedItems || []).map(this.toLabelValueObject)

    const index = selectedItems.findIndex((selectedItem) => selectedItem.value === value)

    if (index > -1) {
      selectedItems = selectedItems.filter((selectedItem) => selectedItem.value !== value)
    } else {
      if (maxSelect != null && selectedItems.length >= maxSelect) {
        return
      } else {
        selectedItems = selectedItems.concat({ label, value })
      }
    }

    this.props.onSelectionsChange(selectedItems, { label, value })
  }

  toLabelValueObject (obj) {
    if (Object.prototype.toString.call(obj) === '[object String]') {
      return { label: obj, value: obj }
    } else {
      return { label: obj.label, value: obj.value }
    }
  }

  keyExtractor = (item, index) => index.toString()

  render () {
    const { style, flatListProps, keyExtractor, items, selectedItems } = this.props
    const dataSource = this.getRowData(items, selectedItems)
    return (
      <FlatList
        style={style}
        keyExtractor={keyExtractor || this.keyExtractor}
        data={dataSource}
        renderItem={this.renderItemRow}
        {...flatListProps}
      />
    )
  }

  renderLabel = (label, style, selected) => {
    if (this.props.renderLabel) {
      return this.props.renderLabel(label, style, selected)
    }
    return (
      <Text style={style}>{label}</Text>
    )
  }

  renderItemRow = (row) => {
    let {
      checkboxSource,
      rowStyle,
      labelStyle,
      checkboxStyle
    } = this.props

    const {
      selectedCheckboxSource,
      selectedRowStyle,
      selectedCheckboxStyle,
      selectedLabelStyle
    } = this.props

    if (row.item.selected) {
      checkboxSource = selectedCheckboxSource
      rowStyle = mergeStyles(styles.row, rowStyle, selectedRowStyle)
      checkboxStyle = mergeStyles(styles.checkbox, checkboxStyle, selectedCheckboxStyle)
      labelStyle = mergeStyles(styles.label, labelStyle, selectedLabelStyle)
    } else {
      rowStyle = mergeStyles(styles.row, rowStyle)
      checkboxStyle = mergeStyles(styles.checkbox, checkboxStyle)
      labelStyle = mergeStyles(styles.label, labelStyle)
    }

    return (
      <TouchableWithoutFeedback onPress={() => this.onRowPress(row.item)}>
        <View style={rowStyle}>
          <Image style={checkboxStyle} source={checkboxSource} />
          {this.renderLabel(row.item.label, labelStyle, row.item.selected)}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
