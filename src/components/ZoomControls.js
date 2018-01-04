import React from 'react'

import Button from './Button'
import '../styles/zoomControls.css'


class ZoomControls extends React.Component {

  renderButton(label, level) {
    if ( (this.props.level === 'WK' && level === 'GM')
        || (this.props.level === 'BU' && (level === 'WK' || level === 'GM' ) ) ) {
      return <Button text={label} onClick={() => this.props.setZoomLevel(level)} />
    }
  }

  render() {
    return (
      <div className='c-zoomControls'>
        <Button
          text='Kies gemeente'
          icon='arrow'
          iconPosition='right'
          textAlign='center'
          pointRight={true} />
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
