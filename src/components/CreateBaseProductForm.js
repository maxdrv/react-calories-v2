import React, {Component} from 'react';
import axios from "axios";

class CreateBaseProductForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            name: "",
            nutrients: {
                kcal: 0,
                proteins: 0,
                fats: 0,
                carbs: 0
            }
        }
    }

    changeHandler = (event) => {
        if (event.target.name === "name") {
            this.setState({
                    [event.target.name]: event.target.value
                }
            );
        } else {
            this.setState({
                nutrients: {
                    [event.target.name]: event.target.value
                }
            });
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/baseProducts", this.state)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const {name} = this.state;
        const {kcal, proteins, fats, carbs} = this.state.nutrients
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