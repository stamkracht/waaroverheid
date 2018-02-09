import React from 'react';

import Icon from './Icon';
import Button from './Button';
import SearchBox from './SearchBox';
import TypesList from './TypesList';
import Chart from './Chart';
import Tag from './Tag';
import FiltersService from '../services/FiltersService';

import 'react-input-range/lib/css/index.css';
import '../styles/filters.css';
import '../styles/inputRange.css';
import '../styles/date-range-picker.css';

class Filters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };
    }

    toggleFilters() {
        this.setState({ active: !this.state.active });
    }

    handleOnSubmit() {
        this.setState({ active: true });
        this.props.submit();
    }

    handleOnType(query) {
        this.props.updateQuery(query);
    }

    handleBrushChange({ startIndex, endIndex }, chartData) {
        const startDate = {
            start_date: {
                from: chartData[startIndex].key_as_string,
                to: chartData[endIndex].key_as_string
            }
        };

        this.props.updateFilters(startDate);
    }

    renderTypes() {
        return ['classification']
            .filter(item => this.props.facets[item] && this.props.facets[item].buckets.length)
            .map((item, i) => {
                return (
                    <TypesList
                        key={item}
                        facet={item}
                        text={'Soorten'}
                        updateFilters={this.props.updateFilters}
                        list={this.props.facets[item].buckets}
                    />
                );
            });
    }

    renderDatePicker() {
        return this.props.facets.start_date.buckets.length ? (
            <Chart
                chartData={this.props.facets.start_date.buckets}
                handleBrushChange={this.handleBrushChange.bind(this)}
            />
        ) : (
            ''
        );
    }

    renderStartDateTag({ from, to }) {
        if (!from || !to) return;
        return (
            <Tag
                key={'start_date'}
                text={`Vanaf: ${from.slice(0, 10)}, Tot: ${to.slice(0, 10)}`}
                onClick={() => this.props.removeFilters({ to, from }, 'start_date')}
            />
        );
    }

    renderClassificationTag({ terms = [] }) {
        return terms.map((tag, i) => {
            return <Tag key={i} text={tag} onClick={() => this.props.removeFilters(tag, 'classification')} />;
        });
    }

    renderTags() {
        return ['start_date', 'classification'].filter(filter => this.props.filters[filter]).map(filter => {
            switch (filter) {
                case 'start_date':
                    return this.renderStartDateTag(this.props.filters[filter]);
                case 'classification':
                    return this.renderClassificationTag(this.props.filters[filter]);
            }
        });
    }

    renderFilters = () => {
        return (
            <div className="filtersDropdown">
                <div className="filtersHeader" onClick={this.toggleFilters.bind(this)}>
                    <Icon icon="close" width="20" height="20" />
                </div>
                <SearchBox onType={this.handleOnType.bind(this)} onSubmit={this.handleOnSubmit.bind(this)} />
                <div className="scrollableDiv">
                    {this.renderDatePicker()}
                    <div className="typesContainer">{this.renderTypes()}</div>
                </div>
                <div className="filtersFooter">
                    <Button text="Zoeken" onClick={() => this.handleOnSubmit()} />
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className="c-filters">
                <div className="buttonContainer">
                    <Button text="Filters" icon="arrow" onClick={this.toggleFilters.bind(this)} />
                </div>
                {this.state.active && this.renderFilters()}
            </div>
        );
    }
}

Filters.defaultProps = {
    facets: { start_date: { buckets: [] } },
    submit: undefined,
    filters: {}
};

export default Filters;
