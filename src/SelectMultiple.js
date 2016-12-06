import React, { Component, PropTypes } from 'react'
import { View, ListView, Text, TouchableWithoutFeedback, Image } from 'react-native'
import styles from './SelectMultiple.styles'
import checkbox from '../images/icon-checkbox.png'
import checkboxChecked from '../images/icon-checkbox-checked.png'

const itemType = PropTypes.oneOfType(
  PropTypes.string,
  PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })
)

const styleType = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.number,
  PropTypes.array
])

const sourceType = PropTypes.oneOfType([PropTypes.object, PropTypes.number])

// A customiseable ListView that allows you to select multiple rows
export default class SelectMultiple extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(itemType).isRequired,
    selectedItems: PropTypes.arrayOf(itemType),

    onSelectionsChange: PropTypes.func.isRequired,

    checkboxSource: sourceType,
    selectedCheckboxSource: sourceType,

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
    checkboxSource: checkbox,
    checkboxCheckedSource: checkboxChecked
  }

  constructor (props) {
    super(props)

    const rows = this.getRowData(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.value !== r2.value || r1.selected !== r2.selected
    }).cloneWithRows(rows)

    this.state = { dataSource }
  }

  componentWillReceiveProps (nextProps) {
    const rows = this.getRowData(nextProps)
    const dataSource = this.state.dataSource.cloneWithRows(rows)
    this.setState({ dataSource })
  }

  getRowData ({ items, selectedItems }) {
    return items.map((item) => {
      const selected = selectedItems.some((i) => i === item)

      if (Object.prototype.toString.call(item) === '[object String]') {
        return { label: item, value: item, selected }
      } else {
        return { label: item.label, value: item.value, selected }
      }
    })
  }

  onRowPress (row) {
    row = Object.assign({}, row)

    let { selectedItems } = this.props

    // Map all to { label, value }
    selectedItems = selectedItems.map((item) => {
      if (Object.prototype.toString.call(item) === '[object String]') {
        return { label: item, value: item }
      } else {
        return { label: item.label, value: item.value }
      }
    })

    const index = selectedItems.findIndex((selectedItem) => selectedItem.value === row.value)

    if (index > -1) {
      selectedItems = selectedItems.filter((selectedItem) => selectedItem.value !== row.value)
    } else {
      selectedItems = selectedItems.concat(row)
    }

    this.props.onSelectionsChange(selectedItems, row)
  }

  mergeStyles (styles1, styles2) {
    styles1 = styles1 == null ? [] : styles1
    styles1 = Array.isArray(styles1) ? styles1 : [styles1]
    return styles2 == null ? styles1 : styles1.concat(styles2)
  }

  render () {
    const { dataSource } = this.state
    const { style } = this.props
    const { renderItemRow } = this
    return <ListView style={style} dataSource={dataSource} renderRow={renderItemRow} />
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

    const { mergeStyles } = this

    if (row.selected) {
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
      <TouchableWithoutFeedback onPress={() => this.onRowPress(row)}>
        <View style={rowStyle}>
          <Image style={checkboxStyle} source={checkboxSource} />
          <Text style={labelStyle}>{row.label}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
