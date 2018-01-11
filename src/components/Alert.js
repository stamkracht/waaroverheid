import React from 'react'

import Button from './Button'
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css'
import '../styles/alert.css'


class Alert extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  onOpenModal = () => {
      this.setState({ open: true });
    };

  onCloseModal = () => {
    this.setState({ open: false });
    };

  render() {
    return (
      <div className='c-alert'>
        <Button text='Sign up for alerts' icon='mail' textAlign='left' onClick={this.onOpenModal}/>
        <Modal open={this.state.open} onClose={this.onCloseModal} little>
          <h2 className='c-alert--header'>Sign up for alerts</h2>
          <div className='c-alert--content'>
            <input placeholder='Type in your email address' />
          </div>
          <div className='c-alert--footer'>
            <Button
              text='Submit'
              shadow={true}
              hovering={true}
              textAlign='center' />
          </div>
        </Modal>
      </div>
    )
  }
}

export default Alert
