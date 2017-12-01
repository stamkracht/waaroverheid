import React from 'react'

import '../styles/icon.css'
import file from '../images/file.svg'
import hamburger from '../images/hamburger.svg'
import search from '../images/search.svg'
import arrow from '../images/arrow.svg'

class Icon extends React.Component {

  renderIcon() {
    if ( this.props.icon ) {
      if ( this.props.icon === 'file' ) {
        return <img src={file} alt='file icon' />
      } else if ( this.props.icon === 'hamburger' ) {
        return <img src={hamburger} alt='hamburger icon' />
      }  else if ( this.props.icon === 'arrow' ) {
        return <img src={arrow} alt='arrow icon' />
      } else {
        return <img src={search} alt='search icon' />
      }
    }
  }

  render() {
    return (
      <div className={'icon ' + this.props.iconPosition}>
        {this.renderIcon()}
      </div>
    )
  }
}

export default Icon
