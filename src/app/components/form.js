import React, {Component} from  'react'

class AdminWeather extends Component {
    constructor(){
        super()
        this.state = {
            city: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.getWeather = this.getWeather.bind(this)
    }
    getWeather(e){
        fetch(`http://localhost:3000/current/${this.state.city}`,{
            method: 'post',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            
        })
        .catch(err => console.log(err))
        e.preventDefault();
    }
    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
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
            </div>
        );
    }
}
export default AdminWeather