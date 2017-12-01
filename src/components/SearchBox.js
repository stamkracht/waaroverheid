import React from 'react'

import Container from './Container'
import Icon from './Icon'
import '../styles/searchBox.css'
import search from '../images/search.svg'

class SearchBox extends React.Component {

  render() {
    return (
      <Container shadow={this.props.shadow}>
        <div className='c-searchBox'>
          <input type='text' name='name' placeholder='Search' />
          <Icon icon={this.props.icon} iconPosition={this.props.iconPosition}/>
        </div>
      </Container>
    )
  }
}

SearchBox.defaultProps = {
  text: 'Search',
  textAlign: 'left',
  icon: 'search',
  iconPosition: 'right',
}

export default SearchBox
