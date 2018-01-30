import React from 'react'
import {Link} from 'react-router-dom'

import Button from './Button'
import '../styles/zoomControls.css'


class ZoomControls extends React.Component {

  renderMunicipalityButton() {
    const level = this.props.code.slice(0, 2);
    if ( level === 'GM' || level === 'WK' || level === 'BU' ) {
      const code = `GM${this.props.code.match(/[0-9]{4}/g)[0]}`;
      return (
        <Link to={`/${this.props.municipality}`} replace>        
          <Button
            text={'Gemeente'}
            active={level === 'GM'}
            onClick={() => this.props.setZoomLevel(code)}>
          </Button>
        </Link>
      )
    }
  }

  renderDistrictButton() {
    const level = this.props.code.slice(0, 2);
    if ( level === 'WK' || level === 'BU' ) {
      const code = `WK${this.props.code.match(/[0-9]{6}/g)[0]}`;
      return (
        <Link to={`/${this.props.municipality}/${this.props.district}`} replace>                
          <Button
            text={'Wijk'}
            active={level === 'WK'}
            onClick={() => this.props.setZoomLevel(code)}>
          </Button>
        </Link>
      )
    }
  }

  renderNeighborhoodButton() {
    const level = this.props.code.slice(0, 2);
    if ( level === 'BU' ) {
      const code = `BU${this.props.code.match(/[0-9]{8}/g)[0]}`;
      return (
        <Link to={`/${this.props.municipality}/${this.props.district}/${this.props.neighborhood}`} replace>                        
          <Button
            text={'Buurt'}
            active={level === 'BU'}
            onClick={() => this.props.setZoomLevel(code)}>
          </Button>
        </Link>
      )
    }
  }

  render() {
    return (
      <div className='c-zoomControls'>
        <Link to={'/'}>        
          <Button
            text='Kies gemeente'
            icon='arrow'
            iconPosition='right'
            iconDirection='right'
            textAlign='center'
            onClick={() => this.props.setZoomLevel()} />
        </Link>
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
