import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ListView, Text, TouchableWithoutFeedback, Image } from 'react-native'
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

// A customiseable ListView that allows you to select multiple rows
export default class SelectMultiple extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(itemType).isRequired,
    selectedItems: PropTypes.arrayOf(itemType),

    onSelectionsChange: PropTypes.func.isRequired,

    checkboxSource: sourceType,
    renderCheckbox: PropTypes.func,
    selectedCheckboxSource: sourceType,
    renderLabel: PropTypes.func,
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
    selectedCheckboxSource: checkboxChecked,
    renderLabel: null
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

  render () {
    const { dataSource } = this.state
    const { style, listViewProps } = this.props
    const { renderItemRow } = this
    return <ListView style={style} dataSource={dataSource} renderRow={renderItemRow} {...(listViewProps || {})} />
  }

  renderLabel = (row) => {
    const {labelStyle, selectedLabelStyle} = this.props
    const labelStyleToRender = row.selected 
      ? mergeStyles(styles.label, labelStyle, selectedLabelStyle) 
      : mergeStyles(styles.label, labelStyle);

    if (this.props.renderLabel) {
      return this.props.renderLabel(row.label, labelStyleToRender, row.selected)
    }
    return (
      <Text style={labelStyleToRender}>{row.label}</Text>
    )
  }

  getCheckboxStyle = (row) => {
    const {renderCheckbox, selectedCheckboxStyle, checkboxStyle} = this.props

    if (row.selected) {
      return mergeStyles(styles.checkbox, checkboxStyle, selectedCheckboxStyle)
    } else {
      return mergeStyles(styles.checkbox, checkboxStyle)
    }
  }

  getRowStyle = (row) => {
    const {rowStyle, selectedRowStyle} = this.props;

    if (row.selected) {
      return mergeStyles(styles.row, rowStyle, selectedRowStyle)
    } else {
      return mergeStyles(styles.row, rowStyle)
    }
  }

  renderItemRow = (row) => {
    const {
      checkboxSource,
      renderCheckbox,
      selectedCheckboxSource
    } = this.props

    return (
      <TouchableWithoutFeedback onPress={() => this.onRowPress(row)}>
        <View style={this.getRowStyle(row)}>
          {renderCheckbox 
            ? renderCheckbox(row.selected)
            : <Image style={this.getCheckboxStyle(row)} source={row.selected ? selectedCheckboxSource : checkboxSource} />
          }
          {this.renderLabel(row)}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
