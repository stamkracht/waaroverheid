import React from 'react';
import '../styles/municipalities.css';
import MunicipalitiesHeader from './MunicipalitiesHeader';
import MunicipalitiesSearch from './SearchMunicipalities';
import MunicipalitiesList from './ListMunicipalities';

class Municipalities extends React.Component {
    componentWillMount() {
        this.props.getMunicipalities();
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
                <MunicipalitiesHeader showUserLocation={getUserLocation} loadingLocation={loadingLocation} />

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
