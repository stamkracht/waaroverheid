import React from 'react'

import Container from './Container'
import '../styles/searchBox.css'


class SearchBox extends React.Component {

  render() {
    return (
      <div className='c-searchBox'>
        <Container
          text={this.props.text}
          textAlign={this.props.textAlign}
          icon={this.props.icon}
          iconPosition={this.props.iconPosition}
          shadow={this.props.shadow}
        />
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
