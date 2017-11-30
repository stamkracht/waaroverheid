import React from 'react'

import '../styles/container.css'
import document from '../images/document.svg'
import hamburger from '../images/hamburger.svg'
import search from '../images/search.svg'
import arrow from '../images/arrow.svg'

class Container extends React.Component {

  renderIcon() {
    if ( this.props.icon ) {
      let classIcon = `c-container--icon ${this.props.iconPosition}`
      if ( this.props.icon === 'document' ) {
        return <img className={classIcon} src={document} alt='document icon' />
      } else if ( this.props.icon === 'hamburger' ) {
          return <img className={classIcon} src={hamburger} alt='hamburger icon' />
      }  else if ( this.props.icon === 'arrow' ) {
          return <img className={classIcon} src={arrow} alt='arrow icon' />
      } else {
          return <img className={classIcon} src={search} alt='search icon' />
      }
    }
  }

  renderText() {
    if(this.props.text) {
      let classText = `c-container--text ${this.props.textAlign}`
      return <div className={classText}> {this.props.text} </div>
    }
  }

  render() {
    return (
      <div className={`${this.props.shadow ? 'c-container shadow' : 'c-container'}`}>
        {this.props.children}
        {this.renderText()}
        {this.renderIcon()}
      </div>
    )
  }
}

Container.defaultProps = {
  text: 'Default',
  icon: '',
  iconPosition: 'right',
  textAlign: 'center',
  shadow: true,
}


export default Container
