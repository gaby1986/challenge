import React, {Component} from  'react'
import Info from './info';
import ForecastInfo from './forecastInfo'
import axios from 'axios';
import { apiWeather } from '../env_url'

class AdminWeather extends Component {
    constructor(){
        super()
        this.state = {
            temperature: '',
            description: '',
            humidity: '',
            wind_speed: 0,
            city: '',
            country: '',
            forecast:[],
            error: null,
        }
        this.handleChange = this.handleChange.bind(this)
        this.currentWeather = this.currentWeather.bind(this)
        this.stopRecet = this.stopRecet.bind(this)
    }
    
    
    currentWeather(url){
        axios(`${url}/${this.state.city}`).then(data => {
            var result = ""
            var myArray = ""
            if(url == apiWeather.LOCATION || url == apiWeather.CURRENT){
                result = data.data
                this.setState({
                    temperature: result.main.temp,
                    description: result.weather[0].description,
                    humidity: result.main.humidity,
                    wind_speed: result.wind.speed,
                    city: result.name,
                    country: result.sys.country,
                    error: null
                });
            }else if(url == apiWeather.FORECAST){
                myArray = data.data.list
                this.setState({forecast:myArray})
            }
            console.log(this.state)
                
        })
        .catch(err => console.log(err))
                
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
     }

     componentDidMount(){
        this.currentWeather(apiWeather.LOCATION)
        this.currentWeather(apiWeather.FORECAST)
    }
     
     stopRecet(e){
         e.preventDefault()
     }

    render() {
        return(
            <div className="card card-body">
                <form onSubmit={this.stopRecet} >
                    <div className="form-group">
                        <input type="text" onChange={this.handleChange} name="city" placeholder="Ciudad" className="form-control" value={this.state.city} />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Estado del tiempo a 5 días</label>
                    </div>
                    <button type="submit" onClick={() => this.currentWeather(apiWeather.CURRENT)}  className="btn btn-success btn-block">
                        Obtener clima
                    </button>       
                </form>
                <Info {...this.state}></Info>
                {
                    
                    this.state.forecast.map(index =>{
                        console.log(index)
                        return(
                            <ForecastInfo key={index.dt} date={index.dt_txt} temperature={index.main.temp}></ForecastInfo>
                        );
                    })

                }
            </div>
        );
    }
}
export default AdminWeather