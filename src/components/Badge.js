import React from 'react'

import '../styles/badge.css'

class Badge extends React.Component {

  render() {

    let className = 'c-badge'

    if ( this.props.active ) {
      className = 'c-badge active'
    }

    return  <div className={className}>{this.props.num}</div>
  }
}

Badge.defaultProps = {
  num: 0,
  active: false,
}

export default Badge;
