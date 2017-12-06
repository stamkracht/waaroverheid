import React from 'react'

import Container from './Container'
import Icon from './Icon'
import '../styles/searchBox.css'

class SearchBox extends React.Component {

  handleKeyPress = (event) => {
    if(event.charCode === 13) {
      console.log('Premuto invio')
    }
  }

  render() {
    return (
      <Container shadow={this.props.shadow}>
        <div className='c-searchBox'>
          <input type='text' name='name' placeholder='Search' onKeyPress={this.handleKeyPress}/>
          <Icon icon={this.props.icon} iconPosition={this.props.iconPosition} />
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
  onSubmit: undefined,
}

export default SearchBox
