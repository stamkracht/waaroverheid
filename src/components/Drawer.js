import React from 'react'

import Icon from './Icon'

import '../styles/drawer.css'
import '../styles/button.css'
import Documents from './Documents'

class Drawer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      activeDrawer: false,
    }
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  handleKeyDown(event) {
    if ( event.keyCode === 27 ) {
      this.setState({activeDrawer: false})
    }
  }

  handleOnClick() {
    this.setState({
      activeDrawer: !this.state.activeDrawer,
    })
  }

  renderHeaderContent() {
    if(this.state.activeDrawer === false) {
      return (
        <div>
          <Icon icon='file' iconPosition='left' />
          <span className='c-drawer--text'> {`${this.props.numberDoc} ${this.props.numberDoc === 1 ? 'document found in ' : 'documents found in '} ${this.props.area}`} </span>
        </div>
      )
    } else {
      return (
        <div>
          <h1 className='c-drawer--title'> {`${this.props.numberDoc} ${this.props.numberDoc === 1 ? 'document found in ' : 'documents found in '} ${this.props.area}`} </h1>
        </div>
      )
    }
  }

  renderHamburger() {
    return (
      <div className={`${this.state.activeDrawer ? 'c-hamburger active' : 'c-hamburger'}`}>
        <span className='line' />
        <span className='line' />
        <span className='line' />
      </div>
    )
  }

  renderHeader() {
    return (
      <div className='c-drawer--header' onClick={this.handleOnClick.bind(this)}>
        {this.renderHeaderContent()}
        {this.renderHamburger()}
      </div>
    )
  }

  renderDocuments = () => {
    return <Documents num={this.props.numberDoc} />
  }

  render() {
    return (
      <div className={`${this.state.activeDrawer ? 'c-drawer active' : 'c-drawer'}`}>
        {this.renderHeader()}
        {this.state.activeDrawer && <Documents />}
      </div>
    )
  }
}

Drawer.defaultProps = {
  numberDoc: 0,
  area: 'selected area',
}

export default Drawer
