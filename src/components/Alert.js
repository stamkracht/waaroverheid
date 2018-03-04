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
            validEmail: false,
            update: false
        };
    }

    toggleModal() {
        this.props.toggleModal(this.props.isModalOpen);
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
        return <Button text="Meldingen" icon="mail" textAlign="center" onClick={this.toggleModal.bind(this)} />;
    }

    renderModalHeader() {
        if (this.props.email) {
            return <h2 className="c-alert--header">Instellen is gelukt</h2>;
        } else if (this.props.emailFailed) {
            return <h2 className="c-alert--header">Er is iets misgegaan</h2>;
        } else {
            return <h2 className="c-alert--header">Blijf op de hoogte</h2>;
        }
    }

    renderModalContent() {
        const filterMessage =
            Object.getOwnPropertyNames(this.props.filters).length === 0 && this.props.query.length === 0
                ? '.'
                : ' met toepassing van deze filters:';

        if (this.props.emailFailed) {
            return (
                <div className="c-alert--content">
                    <h3>Er ging iets mis bij het instellen van de meldingen. Probeer het later nog eens.</h3>
                </div>
            );
        } else if (this.props.email) {
            return (
                <div className="c-alert--content">
                    <h3>
                        Er is een mail naar {this.props.email} verzonden om te bevestigen dat u meldingen over{' '}
                        {this.props.area} wilt ontvangen
                        {filterMessage}
                    </h3>
                    <div className="c-selectedFilters">
                        {this.renderQueryUnclickable()}
                        {this.renderTagsUnclickable()}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="c-alert--content">
                    <h3>
                        Ontvang een e-mail bij nieuwe zoekresultaten in {this.props.area}
                        {filterMessage}
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
            <Modal little open={this.props.isModalOpen} onClose={this.toggleModal.bind(this)}>
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
    emailFailed: false,
    toggleModal: () => {},
    isModalOpen: false
};

export default Alert;
