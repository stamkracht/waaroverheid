import React from 'react'

import Button from './Button'
import '../styles/zoomControls.css'


class ZoomControls extends React.Component {

  renderMunicipalityButton() {
    let level = this.props.code.slice(0, 2)
    if ( level === 'WK' || level === 'BU' ) {
      let code = `GM${this.props.code.match(/[0-9]{4}/g)[0]}`
      return (
        <Button
          text={'Gemeente'}
          onClick={() => this.props.setZoomLevel(code)}>
        </Button>
      )
    }
  }

  renderDistrictButton() {
    let level = this.props.code.slice(0, 2)
    if ( level === 'BU' ) {
      let code = `WK${this.props.code.match(/[0-9]{6}/g)[0]}`
      return (
        <Button
          text={'Wijk'}
          onClick={() => this.props.setZoomLevel(code)}>
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
  code: '',
}

export default ZoomControls
