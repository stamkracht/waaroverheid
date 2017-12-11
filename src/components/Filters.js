import React from 'react'

import Button from './Button'
import InputRange from 'react-input-range';
import '../styles/filters.css'
import SearchBox from './SearchBox'
import FilterList from './FilterList'
import 'react-input-range/lib/css/index.css'
import '../styles/inputRange.css'


class Filters extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      show: false,
      value: { min: 2, max: 10 },
    }
  }

  setLabel = (value, type) => {
    console.log(value, type)
    if(type === 'min') {
      return 'Start'
    }
    else if(type === 'max') {
      return 'End'
    }

  }

  toggleShow = () => {
    this.setState({show: !this.state.show})
  }

  renderFilters = () => {
    let types = ['Type 1', 'Type 2', 'Type 3']
    let parties = ['P1', 'P2', 'P3', 'P4', 'P5']

    return (
      <div className='filtersDropdown'>
        <SearchBox onSubmit={this.props.onSubmit}/>
        <InputRange
          formatLabel={this.setLabel}
          maxValue={20}
          minValue={0}
          value={this.state.value}
          onChange={value => this.setState({ value })} />
        <FilterList text={'Soorten'} filters={types} />
        <FilterList text={'Partijen'} filters={parties} />
        <Button text='Apply' shadow={true} />
      </div>
    )
  }

  render() {

    return (
      <div className='outerContainer'>
        <div className='buttonContainer'>
          <Button text='Filters' icon='arrow' shadow={true} onClick={this.toggleShow} />
        </div>
        {this.state.show && this.renderFilters()}
      </div>
    )
  }

}

export default Filters
