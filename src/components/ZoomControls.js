import React from 'react'

import Button from './Button'
import '../styles/zoomControls.css'


class ZoomControls extends React.Component {

  renderMunicipalityButton() {
    const level = this.props.code.slice(0, 2);
    if ( level === 'GM' || level === 'WK' || level === 'BU' ) {
      const code = `GM${this.props.code.match(/[0-9]{4}/g)[0]}`;
      return (
        <Button
          text={'Gemeente'}
          active={level === 'GM'}
          onClick={() => this.props.setZoomLevel(code)}>
        </Button>
      )
    }
  }

  renderDistrictButton() {
    const level = this.props.code.slice(0, 2);
    if ( level === 'WK' || level === 'BU' ) {
      const code = `WK${this.props.code.match(/[0-9]{6}/g)[0]}`;
      return (
        <Button
          text={'Wijk'}
          active={level === 'WK'}
          onClick={() => this.props.setZoomLevel(code)}>
        </Button>
      )
    }
  }

  renderNeighborhoodButton() {
    const level = this.props.code.slice(0, 2);
    if ( level === 'BU' ) {
      const code = `BU${this.props.code.match(/[0-9]{8}/g)[0]}`;
      return (
        <Button
          text={'Buurt'}
          active={level === 'BU'}
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
          iconDirection='right'
          textAlign='center'
          onClick={() => this.props.setZoomLevel()} />
        {this.renderMunicipalityButton()}
        {this.renderDistrictButton()}
        {this.renderNeighborhoodButton()}
      </div>
    )
  }
}

ZoomControls.defaultProps = {
  setZoomLevel: undefined,
  code: '',
};

export default ZoomControls
