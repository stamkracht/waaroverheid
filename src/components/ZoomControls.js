import React from 'react';
import ZoomButton from './ZoomButton';

const ZoomControls = ({ code, setZoomLevel, search, history, goToMunicipalities }) => {
    const level = code.slice(0, 2);

    return (
        <div className="c-zoomControls">
            <ZoomButton pathname={'/'} search={false} name={'Kies gemeente'} onClick={goToMunicipalities} />

            {(level === 'GM' || level === 'WK' || level === 'BU') && (
                <ZoomButton
                    pathname={`/GM${code.match(/[0-9]{4}/g)[0]}`}
                    search={search}
                    name={'Gemeente'}
                    isActive={level === 'GM'}
                    onClick={() => setZoomLevel(`GM${code.match(/[0-9]{4}/g)[0]}`)}
                />
            )}

            {(level === 'WK' || level === 'BU') && (
                <ZoomButton
                    pathname={`/WK${code.match(/[0-9]{6}/g)[0]}`}
                    search={search}
                    name={'Wijk'}
                    isActive={level === 'WK'}
                    onClick={() => setZoomLevel(`WK${code.match(/[0-9]{6}/g)[0]}`)}
                />
            )}

            {level === 'BU' && (
                <ZoomButton
                    pathname={`/BU${code.match(/[0-9]{8}/g)[0]}`}
                    name={'Buurt'}
                    search={search}
                    isActive={level === 'BU'}
                    onClick={() => setZoomLevel(`BU${code.match(/[0-9]{8}/g)[0]}`)}
                />
            )}
        </div>
    );
};

ZoomControls.defaultProps = {
    setZoomLevel: undefined,
    code: '',
    municipality: '',
    district: '',
    neighborhood: '',
    search: {}
};

export default ZoomControls;
