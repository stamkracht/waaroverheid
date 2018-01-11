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
          {this.props.text}
        </div>
      )
    }
  }

  renderIcon() {
    return (
      <Icon
        icon={this.props.icon}
        iconPosition={this.props.iconPosition}
        pointRight={this.props.pointRight} />
    )
  }

  render() {
    let classes = classNames('c-button', {
      'hovering': this.props.hovering,
      'disabled': this.props.disabled,
    })
    return (
      <Container shadow={this.props.shadow}>
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
  shadow: true,
  hovering: true,
  onClick: undefined,
  disabled: false,
}

export default Button
