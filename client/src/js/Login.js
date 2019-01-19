import React from 'react';
import '../styles/components/login-form.css';

class Login extends React.Component {
	constructor(props) {
		super();

		this.state = {
			email: '',
			password: '',
			remember_me: '',
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
			const response = await fetch('http://127.0.0.1:3000/api/user/login', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(this.state),
				credentials: 'same-origin',
			});

			if (response.status === 200) {
				console.log('success', response);
			} else {
				console.log('error', response);
			}
		} catch (err) {
			console.log(2, err);
		}
	}

	render() {
		return (
			<div className="container">
				<h1>Login</h1>
				<form className="login-form" onSubmit={this.handleSubmit}>
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
					<div className="form-check">
						<input
							value={this.state.remember_me}
							onChange={this.handleChange}
							type="checkbox"
							name="remember_me"
							className="form-check-input"
							id="remember-me"
							value="true"
						/>
						<label className="form-check-label" htmlFor="remember-me">
							Remember me
						</label>
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
}
export default Login;
