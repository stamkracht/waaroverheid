import React from 'react'

import Icon from './Icon'
import Button from './Button'
import SearchBox from './SearchBox'
import InputRange from 'react-input-range'
import TypesList from './TypesList'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

import 'react-input-range/lib/css/index.css'
import '../styles/filters.css'
import '../styles/inputRange.css'


class Filters extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      active: false,
      range: this.props.service.filters.range,
    }
  }

  toggleFilters() {
    this.setState({active: !this.state.active})
  }

  setLabel = (value, type) => {
    if ( type === 'min' ) {
      return 'From'
    } else if ( type === 'max' ) {
      return 'To'
    }
  }

  handleOnSubmit() {
    this.setState({active: false})
    this.props.submit()
  }

  handleOnType(search) {
    this.props.service.filters.search = search
  }

  handleOnChangeRange(range) {
    this.setState({range}, () => {
      this.props.service.filters.range = range
    })
  }

  renderTypes() {
    return this.props.service.filters.types.map((types, i) => {
      let active = !!types.items.find(item => item.active)
      return (
        <TypesList
          key={i}
          active={active}
          text={types.name}
          list={types.items} />
      )
    })
  }

  renderFilters = () => {
    return (
      <div className='filtersDropdown'>
        <div className='filtersHeader'
          onClick={this.toggleFilters.bind(this)}>
          <Icon icon='close' width='20' height='20'/>
        </div>
        <SearchBox
          onType={this.handleOnType.bind(this)}
          onSubmit={this.handleOnSubmit.bind(this)}/>
        <DateRangePicker/>
        <div className='typesContainer'>
          {this.renderTypes()}
        </div>
        <Button text='Search'
          onClick={() => this.handleOnSubmit()} />
      </div>
    )
  }

  render() {
    return (
      <div className='c-filters'>
        <div className='buttonContainer'>
          <Button text='Filters' icon='arrow'
            onClick={this.toggleFilters.bind(this)} />
        </div>
        {this.state.active && this.renderFilters()}
      </div>
    )
  }
}

Filters.defaultProps = {
  service: {},
  submit: undefined,
}

export default Filters
