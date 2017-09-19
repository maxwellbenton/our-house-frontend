import React, { Component } from 'react'


export default class Login extends Component {
constructor() {
    super()
    

    this.state = {
        username: '',
        password: ''
        
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
}

handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.setState({
        username: '',
        password: ''
    })
}
handleCreate(e) {
    e.preventDefault()
    this.props.onUserCreate(this.state)
    this.setState({
        username: '',
        password: ''
    })
}

handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    })
}

render() {
    return(
        <div className="text-center">
            <form className="form" onSubmit={this.handleSubmit}>
                <h4>Log In</h4>
                <div>
                    <input type="text" placeholder="Username" value={this.state.username} name="username" onChange={this.handleChange}/>
                </div>
                <div>
                    
                    <input type="password" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange}/>
                </div>
                <div>
                    <input type="submit"/>
                </div>
            </form>
        </div>
    )
}

}