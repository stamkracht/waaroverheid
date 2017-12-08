import React from 'react'

import Button from './Button'
import '../styles/filters.css'
import SearchBox from './SearchBox'
import FilterList from './FilterList'


class Filters extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      show: true,
    }
  }

  toggleShow = () => {
    this.setState({show: !this.state.show})
    console.log(this.state.show)
  }

  renderFilters = () => {
      return (
        <div className='c-filters'>
          <SearchBox />
          <FilterList />
        </div>
      )
    }

  render() {

    return (
      <div className='outCont'>
        <div className='container'>
          <Button text='Filters' icon='arrow' shadow={true} onClick={this.toggleShow} />
        </div>
        {this.state.show && this.renderFilters()}
      </div>
    )
  }

}

export default Filters
