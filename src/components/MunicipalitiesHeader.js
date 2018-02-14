import React from 'react';
import Button from './Button';

const MunicipalitiesHeader = ({ loadingLocation, showUserLocation, loadingLocationFailed }) => {
    const button = !loadingLocationFailed ? (
        <Button
            text={'Gebruik mijn locatie'}
            textAlign="center"
            icon={'location'}
            iconPosition="right"
            loading={loadingLocation}
            onClick={showUserLocation}
        />
    ) : (
        <Button textAlign="center" text={'Locatie niet gevonden'} />
    );

    return (
        <div className="c-municipalities--header">
            <a href="http://www.waaroverheid.nl">
                <header />
            </a>
            <div className="c-button--wrapper">{button}</div>
        </div>
    );
};

MunicipalitiesHeader.defaultProps = {
    loadingLocation: false,
    showUserLocation: null
};

export default MunicipalitiesHeader;
