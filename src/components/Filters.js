import React from 'react'

import Icon from './Icon'
import Button from './Button'
import SearchBox from './SearchBox'
import InputRange from 'react-input-range'
import FilterList from './FilterList'

import 'react-input-range/lib/css/index.css'
import '../styles/filters.css'
import '../styles/inputRange.css'


class Filters extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      active: false,
      filters: {
        search: '',
        range: {
          min: 2,
          max: 10,
        },
      },
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
    this.props.submit(this.state.filters)
  }

  handleOnType(search) {
    this.setState({filters: {...this.state.filters, search}})
  }

  handleOnChangeRange(range) {
    this.setState({filters: {...this.state.filters, range}})
  }

  renderFilters = () => {
    let types = ['Type 1', 'Type 2', 'Type 3']
    let parties = ['P1', 'P2', 'P3', 'P4', 'P5']
    let veggies = ['Tomato', 'Potato', 'Zucchini', 'Bambini', 'Paprika']
    let spices = ['Scary', 'Sporty', 'Ginger', 'Posh', 'Baby']

    return (
      <div className='filtersDropdown'>
        <div className='filtersHeader'
          onClick={this.toggleFilters.bind(this)}>
          <Icon icon='close' width='20' height='20'/>
        </div>
        <SearchBox
          onType={this.handleOnType.bind(this)}
          onSubmit={this.handleOnSubmit.bind(this)}/>
        <InputRange
          minValue={0}
          maxValue={20}
          value={this.state.filters.range}
          onChange={this.handleOnChangeRange.bind(this)}
          formatLabel={this.setLabel} />
        <div className="filtersContainer">
          <FilterList text={'Soorten'} filters={types} />
          <FilterList text={'Partijen'} filters={parties} />
          <FilterList text={'Veggies'} filters={veggies} />
          <FilterList text={'Spices'} filters={spices} />
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
  submit: undefined,
}

export default Filters
