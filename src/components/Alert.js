import React from 'react';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';
import Tag from './Tag';
import Button from './Button';
import { validate } from '../utilities/email.js';

import '../styles/alert.css';

class Alert extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            validEmail: false,
            update: false
        };
    }

    onOpenModal() {
        this.setState({ active: true });
    }

    onCloseModal() {
        this.setState({ active: false });
    }

    handleSubmit() {
        const validEmail = validate(this.emailInput.value);
        this.setState({ validEmail: validEmail });
        if (validEmail) {
            this.props.submit(this.emailInput.value);
        }
    }

    handleTags(item) {
        item.active = !item.active;
        this.setState({ update: !this.state.update });
    }

    renderEmailError() {
        if (!!this.emailInput && this.emailInput.value && !this.state.validEmail) {
            return <p>Please insert a valid email address!</p>;
        }
    }

    renderQuery() {
        if (this.props.query) {
            return <Tag key={'query'} text={this.props.query} onClick={() => this.props.resetQuery()} />;
        }
    }

    renderQueryUnclickable() {
        if (this.props.query) {
            return (
                <div>
                    <Button key={'query'} text={this.props.query} />
                </div>
            );
        }
    }

    renderTags() {
        return Object.keys(this.props.filters).map(filterName => {
            return this.props.filters.terms.map((tag, i) => {
                return <Tag key={i} text={tag} onClick={() => this.props.removeFilters(tag, 'classification')} />;
            });
        });
    }

    renderTagsUnclickable() {
        return Object.keys(this.props.filters).map(filterName => {
            return this.props.filters.terms.map((tag, i) => {
                return (
                    <div key={i}>
                        <Button text={tag} />
                    </div>
                );
            });
        });
    }

    renderModalButton() {
        return <Button text="Meldingen" icon="mail" textAlign="center" onClick={this.onOpenModal.bind(this)} />;
    }

    renderModalHeader() {
        if (this.props.email) {
            return <h2 className="c-alert--header">Subscription successful!</h2>;
        } else if (this.props.emailFailed) {
            return <h2 className="c-alert--header">Something went wrong</h2>;
        } else {
            return <h2 className="c-alert--header">Blijf op de hoogte</h2>;
        }
    }

    renderModalContent() {
        if (this.props.emailFailed) {
            return (
                <div className="c-alert--content">
                    <h3>Unfortunately the subscription to email alerts failed. Please try again.</h3>
                </div>
            );
        } else if (this.props.email) {
            return (
                <div className="c-alert--content">
                    <h3>
                        {this.props.email} successfully subscribed to email alerts in {this.props.area}
                        {Object.getOwnPropertyNames(this.props.filters).length === 0
                            ? '.'
                            : ' met toepassing van deze filters:'}
                    </h3>
                    <div className="c-selectedFilters">
                        {this.renderQuery()}
                        {this.renderTagsUnclickable()}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="c-alert--content">
                    <p className="notyet">Nog even geduld: deze functionaliteit wordt 5 maart verwacht.</p>
                    <h3>
                        Ontvang een e-mail bij nieuwe zoekresultaten in {this.props.area}
                        {Object.getOwnPropertyNames(this.props.filters).length === 0
                            ? '.'
                            : ' met toepassing van deze filters:'}
                    </h3>
                    <div className="c-selectedFilters">
                        {this.renderQuery()}
                        {this.renderTags()}
                    </div>
                    <input
                        placeholder="Typ uw e-mail adres"
                        ref={node => {
                            this.emailInput = node;
                        }}
                    />
                    {this.renderEmailError()}
                </div>
            );
        }
    }

    renderModalFooter() {
        if (this.props.email || this.props.emailFailed) {
            return <div />;
        } else {
            return (
                <div className="c-alert--footer">
                    <Button
                        text="Verzenden"
                        shadow={true}
                        hovering={true}
                        textAlign="center"
                        onClick={this.handleSubmit.bind(this)}
                    />
                </div>
            );
        }
    }

    renderModal() {
        return (
            <Modal little open={this.state.active} onClose={this.onCloseModal.bind(this)}>
                {this.renderModalHeader()}
                {this.renderModalContent()}
                {this.renderModalFooter()}
            </Modal>
        );
    }

    render() {
        return (
            <div className="c-alert">
                {this.renderModalButton()}
                {this.renderModal()}
            </div>
        );
    }
}

Alert.defaultProps = {
    area: 'geselecteerd gebied',
    code: '',
    filters: {},
    query: '',
    resetQuery: () => {},
    submit: undefined,
    email: '',
    emailFailed: false
};

export default Alert;
