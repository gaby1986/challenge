import React,{Component} from 'react';
import Form from './components/form';


class App extends Component{

   
    render(){
        return(
            <div className="container p-4">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <Form></Form>
                </div>
            </div>
        </div>
            
        );

    }
}


export default App;