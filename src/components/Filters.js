import React from 'react'

import Button from './Button'
import InputRange from 'react-input-range'
import '../styles/filters.css'
import SearchBox from './SearchBox'
import Icon from './Icon'
import FilterList from './FilterList'
import 'react-input-range/lib/css/index.css'
import '../styles/inputRange.css'


class Filters extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showFilters: false,
      value: { min: 2, max: 10 },
    }
  }

  setLabel = (value, type) => {
    if(type === 'min') {
      return 'Start'
    } else if(type === 'max') {
      return 'End'
    }
  }

  handleOnSubmit() {
    this.setState({showFilters: false})
    this.props.submit()
  }

  handleOnChange = (value) => {
    this.setState({ value })
  }

  toggleShowFilters = () => {
    this.setState({showFilters: !this.state.showFilters})
  }

  renderFilters = () => {
    let types = ['Type 1', 'Type 2', 'Type 3']
    let parties = ['P1', 'P2', 'P3', 'P4', 'P5']
    let veggies = ['Tomato', 'Potato', 'Zucchini', 'Bambini', 'Paprika']
    let spices = ['Scary', 'Sporty', 'Ginger', 'Posh', 'Baby']

    return (
      <div className='filtersDropdown'>
        <div className='filtersHeader' onClick={this.toggleShowFilters}>
          <Icon icon='close' width='20' height='20'/>
        </div>
        <SearchBox onSubmit={this.handleOnSubmit.bind(this)}/>
        <InputRange
          formatLabel={this.setLabel}
          maxValue={20}
          minValue={0}
          value={this.state.value}
          onChange={this.handleOnChange} />
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
          <Button text='Filters' icon='arrow' onClick={this.toggleShowFilters} />
        </div>
        {this.state.showFilters && this.renderFilters()}
      </div>
    )
  }
}

Filters.defaultProps = {
  submit: undefined,
}

export default Filters
