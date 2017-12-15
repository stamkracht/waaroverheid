import React from 'react'

class AlertIcon extends React.Component {
  render() {
    return (
      <svg
        fill={this.props.color}
        width={`${this.props.width}px`}
        height={`${this.props.height}px`}>
          <path fill="none" d="M-1-1h582v402H-1z"/>
          <path d="M22 14.757V12c0-3.866-3.134-7-7-7s-7 3.134-7 7v2.757C8 17.474 6.921 20.079 5 22v2h20v-2c-1.921-1.921-3-4.526-3-7.243zM15 29c1.657 0 3-1.343 3-3h-6c0 1.657 1.343 3 3 3z"/>
          <path d="M17 7h-4V5c0-1.105.895-2 2-2s2 .895 2 2v2z"/>
          <circle r="1" cy="23" cx="25"/>
          <circle r="1" cy="23" cx="5"/>
        </svg>
    )
  }
}

AlertIcon.defaultProps = {
  width: 30,
  height: 30,
  color: 'black',
}

export default AlertIcon
