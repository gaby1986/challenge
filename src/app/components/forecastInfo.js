import React from 'react';

const ForecastInfo = props => {
    return (
        <div key={props.key}>
            
            {props.temperature ?
                <div className="card card-body mt-2 animated fadeInUp" >
                     {
                        props.date &&
                        <p><i className="fas fa-location-arrow"></i> Fecha: {props.date}</p>
                    }
                     {
                        props.city &&
                        <p><i className="fas fa-location-arrow"></i> Locación: {props.city}, {props.country}</p>
                    }
                    {
                        props.temperature &&
                        <p><i className="fas fa-temperature-low"></i> Temperatura: {props.temperature} ℃, {props.description}</p>
                    }
                    
                </div>
                :
                <div className="card card-body mt-2 text-center">
                    <i className="fas fa-sun fa-10x"></i>
                </div>
            }
        </div>

    )
}

export default ForecastInfo;