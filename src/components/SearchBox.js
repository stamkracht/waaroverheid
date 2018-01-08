import React from 'react'

import Container from './Container'
import Icon from './Icon'
import '../styles/searchBox.css'

class SearchBox extends React.Component {

  handleKeyUp = (event) => {
    if ( !!this.props.onType ) {
      this.props.onType(this.refs.query.value)
    }
  }

  handleKeyPress = (event) => {
    if ( event.charCode === 13 && !!this.props.onSubmit ) {
      this.props.onSubmit(this.refs.query.value)
    }
  }

  handleClick = () => {
    if ( !!this.props.onSubmit ) {
      this.props.onSubmit(this.refs.query.value)
    }
  }

  render() {
    return (
      <Container shadow={this.props.shadow}>
        <div className='c-searchBox'>
          <input
            type='text'
            ref='query'
            name='name'
            autoComplete='off'
            placeholder={this.props.placeholder}
            onKeyUp={this.handleKeyUp}
            onKeyPress={this.handleKeyPress} />
          <div onClick={this.handleClick}>
            <Icon icon={this.props.icon}
              iconPosition={this.props.iconPosition} />
          </div>
        </div>
      </Container>
    )
  }
}

SearchBox.defaultProps = {
  icon: 'search',
  iconPosition: 'right',
  placeholder: 'Search',
  shadow: true,
  onSubmit: undefined,
  onType: undefined,
}

export default SearchBox
