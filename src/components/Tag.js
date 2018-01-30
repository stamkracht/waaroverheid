import React from 'react'

import '../styles/documents.css'
import Container from './Container'
import Icon from './Icon'

const Tag = ({onClick, text}) => {
  return (
    <div className='c-tags' onClick={onClick}>
    <Container shadow={true}>
        <div className='c-tags--text'>{text}</div>
        <Icon icon='close' width='15' height='12'/>
    </Container>
    </div>
  )
}

Tag.defaultProps = {
  text: '',
  onClick: undefined,
}

export default Tag
