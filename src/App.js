import React, { Component } from 'react';
import Navigation from './Navigation'
import {Switch, Route, Link, withRouter} from 'react-router-dom';
import HouseSection from './HouseSection';
import Login from './Login';
import {OurHouseAdapter, AuthAdapter} from './adapters/'
import './App.css';

class App extends Component {
  constructor() {
      super()
      this.state = {
          photos: null,
          auth: {
            loggedIn: null,
            user: null
          }
      }
      this.getCurrentUser = this.getCurrentUser.bind(this)
      this.postHouseImage = this.postHouseImage.bind(this)
      this.updateHouseImage = this.updateHouseImage.bind(this)
      this.deleteHouseImage = this.deleteHouseImage.bind(this)
      this.logIn = this.logIn.bind(this)
  }

  componentWillMount() {
    this.getCurrentUser()
    this.getHouseImages()
  }

  getCurrentUser() {
    if(localStorage.getItem('user_id') === 'undefined' || localStorage.getItem("user_id") === null) {
      this.props.history.push('/login')
    } else {
      AuthAdapter.currentUser()
      .then(user => {
        
        this.setState({
          auth: {
            loggedIn: true,
            user: user
          }
        })
      })
    }  
  }

  getHouseImages() {
    OurHouseAdapter.all()
      .then(photos => {
        this.setState({
          photos: photos
        })
      })
      
    }  
  
  postHouseImage(newPhoto, section) {
    OurHouseAdapter.create(newPhoto, section)
      .then(photo => {
        this.setState(previousState => ({
            photos: [...previousState.photos, photo]
        }));
      })
  }

  deleteHouseImage(photo_id) {
    OurHouseAdapter.delete(photo_id)
      .then(photo => {
        this.setState(previousState => ({
            photos: previousState.photos.filter((p) => p.id !== photo_id)
        }));
      })
  }
  updateHouseImage(photo) {
    OurHouseAdapter.update(photo)
    .then(photos => {
        this.setState({
          photos: photos
        })
      })
  }

  logIn(loginParams) {
    AuthAdapter.login(loginParams)
    .then(user => {
      localStorage.setItem("user_id", user.id)
      this.setState({
        auth: {
          loggedIn: true,
          user: user
        }
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/login" render={() => <Login onSubmit={this.logIn} />} />    
          <Route exact path="/exteriors" render={() => <HouseSection photos={this.state.photos} section={"Exteriors"} loginCheck={this.getCurrentUser()} submitPhoto={this.postHouseImage} deletePhoto={this.deleteHouseImage} updatePhoto={this.updateHouseImage}/>} />
          <Route exact path="/grounds" render={() => <HouseSection photos={this.state.photos} section={"Grounds"} loginCheck={this.getCurrentUser()} submitPhoto={this.postHouseImage} deletePhoto={this.deleteHouseImage} updatePhoto={this.updateHouseImage}/>} />
          <Route exact path="/gardens" render={() => <HouseSection photos={this.state.photos} section={"Gardens"} loginCheck={this.getCurrentUser()} submitPhoto={this.postHouseImage} deletePhoto={this.deleteHouseImage} updatePhoto={this.updateHouseImage}/>} />
          <Route exact path="/external-buildings" render={() => <HouseSection photos={this.state.photos} section={"External Buildings"} loginCheck={this.getCurrentUser()} submitPhoto={this.postHouseImage} deletePhoto={this.deleteHouseImage} updatePhoto={this.updateHouseImage}/>} />
          <Route exact path="/living-rooms" render={() => <HouseSection photos={this.state.photos} section={"Living Rooms"} loginCheck={this.getCurrentUser()} submitPhoto={this.postHouseImage} deletePhoto={this.deleteHouseImage} updatePhoto={this.updateHouseImage}/>} />
          <Route exact path="/kitchens" render={() => <HouseSection photos={this.state.photos} section={"Kitchens"} loginCheck={this.getCurrentUser()} submitPhoto={this.postHouseImage} deletePhoto={this.deleteHouseImage} updatePhoto={this.updateHouseImage}/>} />
          <Route exact path="/bedrooms" render={() => <HouseSection photos={this.state.photos} section={"Bedrooms"} loginCheck={this.getCurrentUser()} submitPhoto={this.postHouseImage} deletePhoto={this.deleteHouseImage} updatePhoto={this.updateHouseImage}/>} />
          <Route exact path="/bathrooms" render={() => <HouseSection photos={this.state.photos} section={"Bathrooms"} loginCheck={this.getCurrentUser()} submitPhoto={this.postHouseImage} deletePhoto={this.deleteHouseImage} updatePhoto={this.updateHouseImage}/>} />
          <Route exact path="/basements" render={() => <HouseSection photos={this.state.photos} section={"Basements"} loginCheck={this.getCurrentUser()} submitPhoto={this.postHouseImage} deletePhoto={this.deleteHouseImage} updatePhoto={this.updateHouseImage}/>} />
          <Route exact path="/decor" render={() => <HouseSection photos={this.state.photos} section={"Decor"} loginCheck={this.getCurrentUser()} submitPhoto={this.postHouseImage} deletePhoto={this.deleteHouseImage} updatePhoto={this.updateHouseImage}/>} />
          <Route exact path="/" render={() => <HouseSection photos={this.state.photos} section={"Our House"} loginCheck={this.getCurrentUser()} submitPhoto={this.postHouseImage} deletePhoto={this.deleteHouseImage} updatePhoto={this.updateHouseImage}/>} />
        </Switch>
      </div>
    );
  }


}

export default withRouter(App);
