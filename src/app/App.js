import React, {Component} from  'react'
import Formweather from './components/form'
import Info from './components/info';
import ForecastInfo from './components/forecastInfo'
import axios from 'axios';
import { apiWeather } from './env_url'

class AdminWeather extends Component {
    constructor(){
        super()
        this.state = {
            timezone: '',
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
        this.timeConverter = this.timeConverter.bind(this)
        this.stopRecet = this.stopRecet.bind(this)
    }
    
    
    currentWeather(url){
        axios(`${url}/${this.state.city}`).then(data => {
               var  result = data.data
               var dateState = this.timeConverter(result.dt)
                this.setState({
                    timezone: dateState,
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
     
     timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        
        var time = date + ' ' + month + ' ' + year ;
        return time;
      }

    render() {
        return(
            <div className="container p-4">
            <div className="row">
                <div className="col-md-6 mx-auto">
                <div className="card card-body">
                <Formweather 
                    recet={this.stopRecet}
                    hendlechange={this.handleChange} 
                    adminForm={() => this.currentWeather(apiWeather.CURRENT)}>
                </Formweather>
                <Info {...this.state}></Info>
                <div className="contentExtendido">
                    <h5>Pronostico extendido a 5 días de {this.state.city}</h5>
                    {
                        this.state.test?
                        this.state.forecast.map((index,item) =>{
                        var date = this.timeConverter(index.dt)
                            var iconWeather = index.weather.map(index2=>{
                                return index2.icon
                            })
                         if(item > 0){
                            return(
                                <ForecastInfo key={item} date={date} temperature={index.temp.day} icon={iconWeather}></ForecastInfo>
                            )
                        }
      
                        }):
                        <div></div>
                    }
                </div>
            </div>
                </div>
            </div>
        </div>
            
        );
    }
}
export default AdminWeather