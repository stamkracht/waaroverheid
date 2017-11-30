import React from 'react'

import Container from './Container'
import '../styles/searchBox.css'


class SearchBox extends React.Component {

  render() {
    return (
      <div>
        {/* <Container
          text={this.props.text}
          textAlign={this.props.textAlign}
          icon={this.props.icon}
          iconPosition={this.props.iconPosition}
          shadow={this.props.shadow}
        /> */}
            <input className='c-searchBox' type="text" name="name" placeholder='Search' />
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
