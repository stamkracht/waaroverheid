import React from 'react'

import '../styles/drawer.css'
import document from '../images/document.svg'
import '../styles/button.css'

class Drawer extends React.Component {

  render() {

    return (
        <div className='c-drawer'>
            <img className='c-drawer--icon' src={document} alt="document icon" />
            <span className='c-drawer--text'>{this.props.text}</span>
        </div>
    )
  }

}

Drawer.defaultProps = {
  text: 'Documents',
}


export default Drawer
