import React from 'react';

const WeatherInfo = props => {
    return (
        <div className="contentActual">
            {
                props.error &&
                <div className="alert alert-danger">
                    <p>{props.error}</p>
                </div>
            }
            <h3>Hoy</h3>
            {props.temperature ?
                <div className="card card-body mt-2 animated fadeInUp" >
                     <div className="row">
                        <div className="col">
                        {
                            props.timezone &&
                            <p><i className="fas fa-location-arrow"></i> Fecha: {props.timezone}</p>
                        }
                        {
                            props.city &&
                            <p><i className="fas fa-location-arrow"></i> Locación: {props.city}, {props.country}</p>
                        }
                        {
                            props.temperature &&
                            <p><i className="fas fa-temperature-low"></i> Temperatura: <span className="temp"><strong>{props.temperature} ℃</strong></span>, {props.description}</p>
                        }
                        {
                            props.humidity &&
                            <p><i className="fas fa-water"></i> Humedad: {props.humidity}</p>
                        }
                        {
                            props.wind_speed &&
                            <p><i className="fas fa-wind"></i> Viento: {props.wind_speed}</p>
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

export default WeatherInfo;