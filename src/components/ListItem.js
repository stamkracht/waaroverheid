import React from 'react';

import Checkbox from './Checkbox';
import Badge from './Badge';
import '../styles/typesList.css';

class ListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: this.props.checked
        };
    }

    componentWillReceiveProps({ checked }) {
        this.setState({ checked });
    }

    handleChange = () => {
        this.setState(
            {
                checked: !this.state.checked
            },
            () => this.props.onChange(this.state.checked)
        );
    };

    renderBadge() {
        if (!!this.props.badge) {
            return <Badge num={this.props.badge} active={this.state.checked} />;
        }
    }

    render() {
        return (
            <li>
                <Checkbox
                    id={this.props.id}
                    label={this.props.label}
                    active={this.state.checked}
                    onChange={this.handleChange}
                />
                {this.renderBadge()}
            </li>
        );
    }
}

ListItem.defaultProps = {
    checked: false,
    id: Math.round(Math.random() * 1000),
    label: 'this is a label',
    onChange: undefined,
    badge: undefined
};

export default ListItem;
