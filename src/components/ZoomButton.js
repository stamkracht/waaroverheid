import React from 'react'
import {Link} from 'react-router-dom'

import Button from './Button'
import '../styles/zoomControls.css'

const ZoomButton = ({pathname, search, isActive, name, setZoomLevel}) => {
  return (
    <Link to={{pathname, search}} replace>        
      <Button
        text={name}
        active={isActive}
        onClick={() => setZoomLevel()}>
      </Button>
    </Link>
  )
}

export default ZoomButton;