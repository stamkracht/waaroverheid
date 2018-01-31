import React from 'react'
import {Link} from 'react-router-dom'

import Button from './Button'
import '../styles/zoomControls.css'

const ZoomButton = ({pathname, search, isActive, name, onClick}) => {
  return (
    <Link to={{pathname, search}}>        
      <Button
        text={name}
        active={isActive}
        onClick={onClick}>
      </Button>
    </Link>
  )
}

export default ZoomButton;