import React from 'react'

import '../styles/documents.css'
import Container from './Container'
import Icon from './Icon'

class Tag extends React.Component {

  render() {

    return (
      <div className='c-tags'>
      <Container shadow={true}>
          <span>Text</span>
          <Icon icon='close' width='15'/>
      </Container>
      </div>
    )

  }
}

export default Tag
