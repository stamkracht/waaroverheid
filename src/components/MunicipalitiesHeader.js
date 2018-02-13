import React from 'react';
import Button from './Button';

const MunicipalitiesHeader = ({ loadingLocation, showUserLocation }) => {
    return (
        <div className="c-municipalities--header">
            <a href="http://www.waaroverheid.nl">
                <header />
            </a>
            <div className="c-button--wrapper">
                <Button
                    text="Gebruik mijn locatie"
                    textAlign="center"
                    icon="location"
                    iconPosition="right"
                    loading={loadingLocation}
                    onClick={showUserLocation}
                />
            </div>
        </div>
    );
};

MunicipalitiesHeader.defaultProps = {
    loadingLocation: false,
    showUserLocation: null
};

export default MunicipalitiesHeader;
