import React from 'react'

import Container from './Container'
import Icon from './Icon'
import { classNames } from '../utilities/class'

import '../styles/button.css'


class Button extends React.Component {

  renderText() {
    if ( this.props.text ) {
      return (
        <div className={`c-button--text ${this.props.textAlign}`}>
          {this.props.loading ? 'Loading..' : this.props.text}
        </div>
      )
    }
  }

  renderIcon() {
    if ( !this.props.loading ) {
      return (
        <Icon
          icon={this.props.icon}
          iconPosition={this.props.iconPosition}
          pointRight={this.props.pointRight} />
      )
    }
  }

  render() {
    let classes = classNames('c-button', {
      'disabled': this.props.disabled,
      'loading': this.props.loading,
      'active': this.props.active,
      'flat': this.props.flat,
    })
    return (
      <Container shadow={!this.props.flat}>
        <div className={classes} onClick={this.props.onClick}>
          {this.renderText()}
          {this.renderIcon()}
        </div>
      </Container>
    )
  }
}

Button.defaultProps = {
  text: 'Button',
  icon: '',
  iconPosition: 'right',
  textAlign: 'center',
  flat: false,
  onClick: undefined,
  disabled: false,
  loading: false,
  active: false,
}

export default Button
