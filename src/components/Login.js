import React, { Component } from 'react';
import { login } from '../action/Auth';
import MenuAppbar from './MenuAppbar';
import Home from './Home';
import PropTypes from 'prop-types';
import { ref, firebaseAuth } from '../config/firebase'



export default class Login extends Component {
  constructor(props){
      super(props);
      this.state = {
          email: '',
          pw: '',
          user: null,
          currentRoute: this.props.currentRoute
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
      let user = {};
      user[e.target.name] = e.target.value;
      this.setState(user)
  }

  handleSubmit = async(e) => {
      e.preventDefault();
      try {
        await login(this.state.email, this.state.pw);   
        console.log('current user:', firebaseAuth().currentUser)
        this.props.__setRoute('home')
      } catch(e){
          alert(e.meesage);
      }
  }
  // input 창 value, name, onChange 설정하기
  render () {
    return (
      <div>
          <h1> Login </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input className="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" name="pw" value={this.state.pw} onChange={this.handleChange} placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <button onClick={() => this.props.__setRoute('register')}> Register </button>
          </form>
      </div>
    )
  }  
}

Login.propTypes = {
  currentUser: PropTypes.object,
  currentRoute: PropTypes.string,
  __setRoute: PropTypes.func,
}

