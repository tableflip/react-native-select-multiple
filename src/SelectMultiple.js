import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ListView, Text, TouchableWithoutFeedback, Image } from 'react-native'
import styles from './SelectMultiple.styles'
import checkbox from '../images/icon-checkbox.png'
import checkboxChecked from '../images/icon-checkbox-checked.png'

const itemType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })
])

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

    listViewProps: PropTypes.any,

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
    selectedCheckboxSource: checkboxChecked
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
    items = items.map(this.toLabelValueObject)
    selectedItems = (selectedItems || []).map(this.toLabelValueObject)

    items.forEach((item) => {
      item.selected = selectedItems.some((i) => i.value === item.value)
    })

    return items
  }

  onRowPress (row) {
    const { label, value } = row
    let { selectedItems } = this.props

    selectedItems = (selectedItems || []).map(this.toLabelValueObject)

    const index = selectedItems.findIndex((selectedItem) => selectedItem.value === value)

    if (index > -1) {
      selectedItems = selectedItems.filter((selectedItem) => selectedItem.value !== value)
    } else {
      selectedItems = selectedItems.concat({ label, value })
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

  mergeStyles (styles1, styles2) {
    styles1 = styles1 == null ? [] : styles1
    styles1 = Array.isArray(styles1) ? styles1 : [styles1]
    return styles2 == null ? styles1 : styles1.concat(styles2)
  }

  render () {
    const { dataSource } = this.state
    const { style, listViewProps } = this.props
    const { renderItemRow } = this
    return <ListView style={style} dataSource={dataSource} renderRow={renderItemRow} {...(listViewProps || {})} />
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
