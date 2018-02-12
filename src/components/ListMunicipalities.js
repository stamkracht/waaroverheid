import React from 'react';
import Container from './Container';

const ListMunicipalities = ({ municipalities, changePage }) => {
    return municipalities.map((item, i) => {
        return (
            <Container key={i} shadow={true}>
                <div className="c-municipality" onClick={() => changePage(item.code)}>
                    <h4>{item.name}</h4>
                </div>
            </Container>
        );
    });
};

ListMunicipalities.defaultProps = {
    municipalities: [],
    changePage: null
};

export default ListMunicipalities;
