import React from 'react'

import Button from './Button'
import '../styles/filters.css'

class Filters extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      clicked: false,
    }
  }

  toggleFilters = () => {
    this.setState({clicked: !this.state.clicked})
    console.log(this.state.clicked)
  }

  renderFilters = () => {
    if(this.state.clicked)  {
      return (
        <div className='c-filters' />
      )
    }
  }

  render() {

    return (
      <div className='outCont'>
        <div className='container'>
          <Button text='Filters' icon='arrow' shadow={true} onClick={this.toggleFilters} />
        </div>
        {this.renderFilters}
      </div>
    )
  }

}

export default Filters
