import React from 'react'

import Button from './Button'
import '../styles/zoomControls.css'


class ZoomControls extends React.Component {

  renderMunicipalityButton() {
    if ( this.props.level === 'WK' || this.props.level === 'BU' ) {
      return (
        <Button
          text={'Gemeente'}
          onClick={() => this.props.setZoomLevel('GM')}>
        </Button>
      )
    }
  }

  renderDistrictButton() {
    if ( this.props.level === 'BU' ) {
      return (
        <Button
          text={'Wijk'}
          onClick={() => this.props.setZoomLevel('WK')}>
        </Button>
      )
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
          pointRight={true}
          onClick={() => this.props.setZoomLevel()} />
        {this.renderMunicipalityButton()}
        {this.renderDistrictButton()}
      </div>
    )
  }
}

ZoomControls.defaultProps = {
  setZoomLevel: undefined,
  level: 'GM',
}

export default ZoomControls
