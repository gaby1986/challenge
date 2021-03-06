import React from 'react';

const ForecastInfo = props => {
    return (
        <div>
            
            {props.temperature ?
                <div className="card card-body mt-2 animated fadeInUp" >
                     <div className="row">
                        <div className="col">
                            {
                                props.date &&
                                <p><i className="fas fa-location-arrow"></i> Fecha: {props.date}</p>
                            }
                            {
                                props.city &&
                                <p><i className="fas fa-location-arrow"></i> Locación: {props.city}</p>
                            }
                            {
                                props.temperature &&
                                <p><i className="fas fa-temperature-low"></i> Temperatura: <span className="temp"><strong>{props.temperature} ℃ </strong></span></p>
                            }
                        </div>
                        <div className="col text-center">
                            <img src={`https://openweathermap.org/img/wn/${props.icon}.png`}></img>
                        </div>
                    </div>
                    
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