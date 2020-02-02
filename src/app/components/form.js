import React, {Component} from  'react'
import Info from './info';
import axios from 'axios'

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
            error: null,
            current: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.getWeather = this.getWeather.bind(this)
        this.currentWeather = this.currentWeather.bind(this)
    }
    
    currentWeather(){
        axios(`http://localhost:3000/v1/current`).then(data => {
            console.log(data)
            var result = data.data
            this.setState({
                temperature: result.main.temp,
                description: result.weather[0].description,
                humidity: result.main.humidity,
                wind_speed: result.wind.speed,
                city: result.name,
                country: result.sys.country,
                error: null
            }); 
        })
        .catch(err => console.log(err))
    }
    
    getWeather(e){
        console.log(this.state.city)
        axios(`http://localhost:3000/v1/current/${this.state.city}`).then(data => {
            console.log(data)
            var result = data.data
            this.setState({
                temperature: result.main.temp,
                description: result.weather[0].description,
                humidity: result.main.humidity,
                wind_speed: result.wind.speed,
                city: result.name,
                country: result.sys.country,
                error: null
            }); 
        })
        .catch(err => console.log(err))
        e.preventDefault()        
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
     }

     componentDidMount(){
         this.currentWeather()
     }

    render() {
        return(
            <div className="card card-body">
                <form onSubmit={this.getWeather}>
                    <div className="form-group">
                        <input type="text" onChange={this.handleChange} name="city" placeholder="Ciudad" className="form-control" value={this.state.city} />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Estado del tiempo a 5 días</label>
                    </div>
                    <button type="submit" className="btn btn-success btn-block">
                        Obtener clima
                    </button>
                    
                </form>
                <Info {...this.state}></Info>
            </div>
        );
    }
}
export default AdminWeather