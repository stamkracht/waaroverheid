import React from 'react'

import Container from './Container'
import '../styles/searchBox.css'
import search from '../images/search.svg'

class SearchBox extends React.Component {

  render() {
    return (
      <div className='c-searchBox'>
        <input type="text" name="name" placeholder='Search' />
        <img className='c-searchBox--icon' src={search} alt='search icon' />
      </div>
    )
  }
}

SearchBox.defaultProps = {
  text: 'Search',
  textAlign: 'left',
  icon: 'search',
  iconPosition: 'right',
  shadow: true,
}

export default SearchBox
