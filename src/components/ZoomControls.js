import React from 'react'

import Button from './Button'
import '../styles/zoomControls.css'

class ZoomControls extends React.Component {

  render() {
    return (
      <div className='c-zoomControls'>
        <Button text='Provincie' onClick={() => this.props.setZoomLevel('PR')} shadow={true} />
        <Button text='Gemeente' onClick={() => this.props.setZoomLevel('GM')} shadow={true} />
        <Button text='Wijk' onClick={() => this.props.setZoomLevel('WK')} shadow={true} />
        <Button text='Buurt' onClick={() => this.props.setZoomLevel('BU')} shadow={true} />
      </div>
    )
  }
}

ZoomControls.defaultProps = {
  setZoomLevel: undefined,
}

export default ZoomControls
