import React from 'react'

import '../styles/documents.css'
import Container from './Container'
import Icon from './Icon'

class Tag extends React.Component {

  render() {

    return (
      <div className='c-tags'>
      <Container shadow={true}>
          <div className='c-tags--text'>Text</div>
          <Icon icon='close' width='15' height='12'/>
      </Container>
      </div>
    )

  }
}

export default Tag
