import React from 'react'

import '../styles/documents.css'
import Container from './Container'
import Icon from './Icon'

class Tag extends React.Component {

  render() {

    return (
      <div className='c-tags' onClick={this.props.onClick}>
      <Container shadow={true}>
          <div className='c-tags--text' text={this.props.text}>{this.props.text}</div>
          <Icon icon='close' width='15' height='12'/>
      </Container>
      </div>
    )
  }
}

Tag.defaultProps = {
  text: '',
  onClick: undefined,
}

export default Tag
