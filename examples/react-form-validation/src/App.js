import React, { Component } from "react";
import From from "./form";
import Validator from "./validator";

const initState = {
	firstName: "",
	lastName: "",
	username: "",
	email: "",
	password: "",
	cPassword: "",
	errors: {}
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { ...initState };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDirty = this.handleDirty.bind(this);
	}
	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	handleSubmit() {
		Validator.validate(this.state)
			.then(data => {
				alert("Success");
				this.setState(initState);
			})
			.catch(errors => {
				this.setState({ errors });
			});
	}
	handleDirty(e) {
		const { name, value } = e.target;

		const isValid = Validator[name].validate(value, {
			verbose: true,
			values: this.state
		});
		if (isValid !== true) {
			this.setState({
				errors: { ...this.state.errors, [name]: isValid }
			});
		} else {
			this.setState({
				errors: { ...this.state.errors, [name]: undefined }
			});
		}
	}
	render() {
		return (
			<div>
				<From
					{...this.state}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					handleDirty={this.handleDirty}
				/>
			</div>
		);
	}
}

export default App;
