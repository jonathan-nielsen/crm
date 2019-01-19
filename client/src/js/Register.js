import React from 'react';
import '../styles/components/register-form.css';

class Register extends React.Component {
	constructor(props) {
		super();

		this.state = {
			email: '',
			password: '',
			confirm_password: '',
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const name = target.name;
		const value = target.type === 'checkbox' ? target.checked : target.value;

		this.setState({
			[name]: value,
		});
	}

	async handleSubmit(event) {
		event.preventDefault();

		try {
			const response = await fetch('http://127.0.0.1:3000/api/user/register', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(this.state),
			});

			if (response.status === 200) {
				console.log('success', response);
			} else {
				console.log('error', response);
			}
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<div className="container">
				<h1>Register</h1>
				<form className="register-form" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="email">Email address</label>
						<input
							value={this.state.email}
							onChange={this.handleChange}
							type="email"
							name="email"
							className="form-control"
							id="email"
							placeholder="Enter email"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							value={this.state.password}
							onChange={this.handleChange}
							type="password"
							name="password"
							className="form-control"
							id="password"
							placeholder="Password"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="confirm-password">Password</label>
						<input
							value={this.state.confirm_password}
							onChange={this.handleChange}
							type="password"
							name="confirm_password"
							className="form-control"
							id="confirm-password"
							placeholder="Confirm password"
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
}
export default Register;
