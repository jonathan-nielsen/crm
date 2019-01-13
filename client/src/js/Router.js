import React from 'react';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../styles/components/navbar.css';
import '../styles/components/main.css';
import '../styles/components/footer.css';

const Navbar = () => (
  <nav id="navbar">
    <div className="container">
      <Link to="/" className="logo" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  </nav>
);

const Footer = () => (
  <footer id="footer">
    <div className="container">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  </footer>
);

class Navigation extends React.Component {
  render() {
    return (
      <Router>
        <div id="page">
          <Navbar />
          <main id="main">
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default Navigation;
