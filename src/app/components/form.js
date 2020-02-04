import React from 'react';

const WeatherForm = props => {
    return (
        <form onSubmit={props.recet} >
        <div className="form-group">
            <input type="text" onChange={props.hendlechange} name="city" placeholder="Ingresar una ciudad" className="form-control" value={props.city} />
        </div>
        <button type="submit" onClick={props.adminForm}  className="btn btn-success btn-block">
            Obtener clima
        </button>       
    </form>
   

    )
}

export default WeatherForm;