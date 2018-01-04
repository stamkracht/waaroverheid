import React from 'react'

import Button from './Button'
import '../styles/zoomControls.css'

class ZoomControls extends React.Component {

  renderButton(label, level) {
    if ( level === 'GM' || this.props.level === 'BU' || level === this.props.level ) {
      return (
        <Button text={label} shadow={true}
          onClick={() => this.props.setZoomLevel(level)}>
        </Button>
      )
    }
  }

  render() {
    return (
      <div className='c-zoomControls'>
        {this.renderButton('Gemeente', 'GM')}
        {this.renderButton('Wijk', 'WK')}
        {this.renderButton('Buurt', 'BU')}
      </div>
    )
  }
}

ZoomControls.defaultProps = {
  setZoomLevel: undefined,
  level: 'GM',
}

export default ZoomControls
