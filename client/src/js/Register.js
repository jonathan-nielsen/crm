import React from 'react';
import '../styles/components/register-form.css';

class Register extends React.Component {
	constructor(props) {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(event) {
		event.preventDefault();

		const data = new FormData(event.target);

		try {
			const response = await fetch('http://localhost:3000/api/user/register', {
				method: 'POST',
				body: data,
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
						<input type="email" name="email" className="form-control" id="email" placeholder="Enter email" />
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input type="password" name="password" className="form-control" id="password" placeholder="Password" />
					</div>
					<div className="form-check">
						<input type="checkbox" name="remember_me" className="form-check-input" id="remember-me" value="true" />
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
