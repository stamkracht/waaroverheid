import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'
import '../styles/zoomControls.css'

class ZoomControls extends React.Component {
  render() {
    return (
      <div className='c-zoomControls'>
        <Button text='Provincie' />
        <Button text='Gemeente' />
        <Button text='Wijk' />
        <Button text='Buurt' />
      </div>
    )
  }
}

ZoomControls.defaultProps = {
  setZoomLevel: PropTypes.func,
}

export default ZoomControls
