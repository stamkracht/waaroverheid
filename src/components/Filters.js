import React from 'react'

import Button from './Button'
import '../styles/filters.css'
import SearchBox from './SearchBox'
import FilterList from './FilterList'


class Filters extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      show: false,
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
        <SearchBox />

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
