import React, { Component } from 'react';
import { login } from '../action/Auth';
import MenuAppbar from './MenuAppbar';
import Home from './Home';
import PropTypes from 'prop-types';



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
          console.log('ho', this.props.currentRoute)
          let user = null;
          // this.props.currentUser = 
          await login(this.state.email, this.state.pw);
            // .then((result) => {
            //   this.props.currentUser = result.user
            // });
          // this.setState({currentRoute:' home'})
          this.props.__setUser('testuser')
          this.props.__setRoute('home')
          // this.props.__setRoute('home'); 
          console.log('r',this.props.currentRoute);
          
      } catch(e){
          alert(e.meesage);
      }
  }
  // input 창 value, name, onChange 설정하기
  render () {
    console.log(this.props.currentRoute)
    return (
      <div>
        {this.state.isUser === true ? 
          // <MenuAppbar user={this.state.user}/>
          <MenuAppbar />
          :
          <div className="col-sm-6 col-sm-offset-3">    
            <h1> Login </h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input className="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" name="pw" value={this.state.pw} onChange={this.handleChange} placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        }
      </div>
    )
  }  
}

Login.propTypes = {
  currentUser: PropTypes.object,
  currentRoute: PropTypes.string,
  __setRoute: PropTypes.func,
  __setUser: PropTypes.func
}

