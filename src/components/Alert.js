import React from 'react'

import Button from './Button'
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css'
import '../styles/alert.css'
import { validate } from '../utilities/email.js'

class Alert extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false,
      result: '',
    }
  }

  onOpenModal = () => {
      this.setState({ open: true })
    };

  onCloseModal = () => {
    this.setState({ open: false })
    this.setState({result: ''})
    };

  handleClick = () => {
    if(validate(this.refs.email.value) === true) {
      this.setState({result: 'valid'})
    }
    else {
      this.setState({result: 'invalid'})
    }
    }

  render() {
    return (
      <div className='c-alert'>
        <Button text='Sign up for alerts' icon='mail' textAlign='left' onClick={this.onOpenModal}/>
        <Modal open={this.state.open} onClose={this.onCloseModal} little>
          <h2 className='c-alert--header'>Sign up for alerts</h2>
          <div className='c-alert--content'>
            <h3>Receive alerts for documents corresponding to these filters:</h3>
            <input placeholder='Type in your email address' ref='email' />
            {this.state.result === 'invalid' && <p>Please insert a valid email address!</p>}
          </div>
          <div className='c-alert--footer'>
            <Button
              text='Submit'
              shadow={true}
              hovering={true}
              textAlign='center'
              onClick={this.handleClick} />
          </div>
        </Modal>
      </div>
    )
  }
}

export default Alert
