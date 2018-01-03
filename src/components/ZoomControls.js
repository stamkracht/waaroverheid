import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'
import '../styles/zoomControls.css'

class ZoomControls extends React.Component {

  handleOnClick(level) {
    if ( level === 'provincie' ) {
      this.props.setZoomLevel(9)
    } else if ( level === 'gemeente' ) {
      this.props.setZoomLevel(12)
    } else if ( level === 'wijk' ) {
      this.props.setZoomLevel(15)
    } else if ( level === 'buurt' ) {
      this.props.setZoomLevel(18)
    }
  }

  render() {
    return (
      <div className='c-zoomControls'>
        <Button text='Provincie' onClick={() => this.handleOnClick('provincie')} shadow={true} />
        <Button text='Gemeente' onClick={() => this.handleOnClick('gemeente')} shadow={true} />
        <Button text='Wijk' onClick={() => this.handleOnClick('wijk')} shadow={true} />
        <Button text='Buurt' onClick={() => this.handleOnClick('buurt')} shadow={true} />
      </div>
    )
  }
}

ZoomControls.defaultProps = {
  setZoomLevel: PropTypes.func,
}

export default ZoomControls