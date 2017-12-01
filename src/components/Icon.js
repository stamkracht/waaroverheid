import React from 'react'

import FileIcon from './icons/FileIcon'
import HamburgerIcon from './icons/HamburgerIcon'
import ArrowIcon from './icons/ArrowIcon'
import SearchIcon from './icons/SearchIcon'

import '../styles/icon.css'

class Icon extends React.Component {

  renderIcon() {
    if ( this.props.icon ) {
      if ( this.props.icon === 'file' ) {
        return <FileIcon width={this.props.height} height={this.props.height} color={this.props.color} />
      } else if ( this.props.icon === 'hamburger' ) {
        return <HamburgerIcon width={this.props.height} height={this.props.height} color={this.props.color} />
      }  else if ( this.props.icon === 'arrow' ) {
        return <ArrowIcon width={this.props.height} height={this.props.height} color={this.props.color} />
      } else {
        return <SearchIcon width={this.props.height} height={this.props.height} color={this.props.color} />
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

Icon.defaultProps = {
  width: 30,
  height: 30,
  icon: 'file',
  iconPosition: 'right',
}

export default Icon
