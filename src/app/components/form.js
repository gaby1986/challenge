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
            icon: "",
            test:false,
            error: null,
        }
        this.myArray = ""
        
        this.handleChange = this.handleChange.bind(this)
        this.currentWeather = this.currentWeather.bind(this)
        this.forecastWeather = this.forecastWeather.bind(this)
        this.stopRecet = this.stopRecet.bind(this)
    }
    
    
    currentWeather(url){
        axios(`${url}/${this.state.city}`).then(data => {
               var  result = data.data
                this.setState({
                    temperature: result.main.temp,
                    description: result.weather[0].description,
                    humidity: result.main.humidity,
                    wind_speed: result.wind.speed,
                    city: result.name,
                    country: result.sys.country,
                    forecast: [],
                    icon: result.weather[0].icon,
                    test:false,
                    error: null
                });
                          
        })
        .catch(err => console.log(err))
                
    }

    
    forecastWeather(url){
        axios(`${url}/${this.state.city}`).then(data => {
            this.myArray = data.data.list
            this.setState({forecast:this.myArray, test:true})
        }).catch(err => console.log(err))
                
    }

    handleChange(e){
        const {name, value} = e.target;
        console.log(value)
        this.setState({
            [name]: value
        });
     }

    
     componentDidMount(){
        this.currentWeather(apiWeather.LOCATION)
        this.forecastWeather(apiWeather.FORECAST)
    }
    
    componentDidUpdate(nextProps, nextState){
        if (nextState.test == true && this.state.test == false) {                
                this.forecastWeather(apiWeather.FORECAST)
           }
        
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
                    <button type="submit" onClick={() => this.currentWeather(apiWeather.CURRENT)}  className="btn btn-success btn-block">
                        Obtener clima
                    </button>       
                </form>
                <Info {...this.state}></Info>
                <div className="contentExtendido">
                <h4>Pronostico extendido a 5 días</h4>
                {
                    this.state.test?
                    this.state.forecast.map((index,item) =>{
                    
                       var test2 = index.weather.map(index2=>{
                            return index2.icon
                        })
                        return(
                            <ForecastInfo key={item} date={index.dt_txt} temperature={index.main.temp} icon={test2}></ForecastInfo>
                        )
                    }):
                    <div></div>
                }
                </div>
            </div>
        );
    }
}
export default AdminWeather