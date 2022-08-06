import React, {Component} from 'react';
import axios from "axios";

class CreateBaseProductForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            name: "",
            kcal: 0,
            proteins: 0,
            fats: 0,
            carbs: 0
        }
    }

    changeHandler = (event) => {
        this.setState({
                [event.target.name]: event.target.value
            }
        );
    }

    submitHandler = (event) => {
        event.preventDefault();

        const req = {
            name: this.state.name,
            nutrients: {
                kcal: this.state.kcal,
                proteins: this.state.proteins,
                fats: this.state.fats,
                carbs: this.state.carbs
            }
        }

        axios.post("http://localhost:8080/baseProducts", req)
            .then(response => {
                console.log(response)
                this.refreshPage();
            })
            .catch(error => {
                console.log(error)
            })
    }

    refreshPage() {
        window.location.reload();
    }

    render() {
        const {name, kcal, proteins, fats, carbs} = this.state
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <input type='text' name='name' value={name} onChange={this.changeHandler}/>
                    <input type='text' name='kcal' value={kcal} onChange={this.changeHandler}/>
                    <input type='text' name='proteins' value={proteins} onChange={this.changeHandler}/>
                    <input type='text' name='fats' value={fats} onChange={this.changeHandler}/>
                    <input type='text' name='carbs' value={carbs} onChange={this.changeHandler}/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

export default CreateBaseProductForm;