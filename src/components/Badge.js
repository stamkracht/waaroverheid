import React from 'react'

import '../styles/badge.css'

class Badge extends React.Component {

  render() {

    return  <div className={`${this.props.active ? 'c-badge active' : 'c-badge'}`}>{this.props.num}</div>
  }
}

Badge.defaultProps = {
  num: 0,
  active: false,
}

export default Badge;
