import React from 'react'

import Icon from './Icon'
import Button from './Button'
import SearchBox from './SearchBox'
import TypesList from './TypesList'
import { DateRangePicker } from 'react-dates';

import 'react-input-range/lib/css/index.css'
import '../styles/filters.css'
import '../styles/inputRange.css'
import '../styles/date-range-picker.css'


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

  handleOnChangeRange({startDate, endDate}) {
    this.setState({startDate, endDate}, () => {
      this.props.service.filters.range = {startDate, endDate}
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

  renderDatePicker() {
    return (
        <DateRangePicker
          noBorder={true}
          startDate={this.state.startDate}
          startDateId="startDate"
          endDate={this.state.endDate}
          endDateId="endDate"
          onDatesChange={({ startDate, endDate }) => this.handleOnChangeRange({ startDate, endDate })}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          small={true}
        />);
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
        {this.renderDatePicker()}
        <div className='typesContainer'>
          {this.renderTypes()}
        </div>
        <div className='filtersFooter'>
          <Button text='Search'
            onClick={() => this.handleOnSubmit()} />
        </div>
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
