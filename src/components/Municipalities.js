import React from 'react';
import '../styles/municipalities.css';
import MunicipalitiesHeader from './MunicipalitiesHeader';
import MunicipalitiesSearch from './SearchMunicipalities';
import MunicipalitiesList from './ListMunicipalities';

class Municipalities extends React.Component {
    componentWillMount() {
        this.props.getMunicipalities();
    }

    async componentDidUpdate({ code }) {
        if (code !== this.props.code) {
            await this.props.changePage(code);
            this.props.resetLocation();
        }
    }

    showUserLocation() {
        this.props.showUserLocation();
        this.props.getUserLocation();
    }

    render() {
        const {
            changePage,
            loadingLocation,
            municipalities,
            filterMunicipalities,
            getUserLocation,
            chooseMunicipality
        } = this.props;

        return (
            <div className="c-municipalities">
                <MunicipalitiesHeader
                    showUserLocation={this.showUserLocation.bind(this)}
                    loadingLocation={loadingLocation}
                />

                <MunicipalitiesSearch
                    filterMunicipalities={filterMunicipalities}
                    municipalities={municipalities}
                    chooseMunicipality={chooseMunicipality}
                />

                <MunicipalitiesList changePage={changePage} municipalities={municipalities} />
            </div>
        );
    }
}

Municipalities.defaultProps = {
    showUserLocation: false,
    municipalities: {},
    filterMunicipalities: undefined,
    handleOnSubmit: undefined,
    loadingLocation: false
};

export default Municipalities;
