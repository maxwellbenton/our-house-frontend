import React, {Component} from 'react'
import { Image, Button } from 'react-bootstrap';

export default class Contact extends Component{
    constructor() {
        super()
        this.state = {
            url: null,
            user: null,
            type: null,
             overlayDisplay: 'none',
            selectedPhoto: null,
            filter: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.showOverlay = this.showOverlay.bind(this)
        this.renderPhotos = this.renderPhotos.bind(this)
    }

    componentWillMount() {
        this.props.loginCheck
    }

    handleChange(e){
        this.setState({
        [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.submitPhoto(this.state, this.props.section)
    }
    handleUpdate(e) {
        
        e.preventDefault()
        this.props.updatePhoto({id: e.target.name, action: e.target.value})
    }
    handleDelete(e) {
        e.preventDefault()
        this.props.deletePhoto(e.target.value)
    }

    showOverlay(e) {
        this.setState({
            overlayDisplay: 'block',
            selectedPhoto: e.target.src
        })
    }

    renderPhotos() {
        let photoList = []
        if (this.props.photos !== null) {
            if (this.props.section !== "Our House") {
                let filteredPhotoList = this.props.photos.filter((photo) => photo.section === this.props.section)
                photoList = filteredPhotoList.map((photo) => {
                    return ( 
                        <div className="Photo-card" value={photo.url} >
                            <div className="Photo-container"><Image src={photo.url} onClick={this.showOverlay} responsive/></div>
                            <h5>Score: {photo.score} <Button onClick={this.handleUpdate} name={photo.id} value="+">+</Button><Button onClick={this.handleUpdate} name={photo.id} value="-">-</Button> | <Button name={photo.url} value={photo.id} onClick={this.handleDelete}>delete</Button></h5>
                        </div>
                    )
                })
            } else {
                photoList = this.props.photos.map((photo) => {
                    return ( 
                        <div className="Photo-card" value={photo.url} >
                            <div className="Photo-container"><Image src={photo.url} onClick={this.showOverlay} responsive/></div>
                            <h5>Score: {photo.score} <Button onClick={this.handleUpdate} name={photo.id} value="+">+</Button><Button onClick={this.handleUpdate} name={photo.id} value="-">-</Button> | <Button name={photo.url} value={photo.id} onClick={this.handleDelete}>delete</Button></h5>
                        </div>
                    ) 
                })
            }
        }
        
    return photoList
    }
    
    render() {
            return (
                <div>
                    <h2>{this.props.section}</h2>
                    {this.props.section !== "Our House" ? 
                    <form>
                        <input onChange={this.handleChange} value={this.url} name="url" type="text" placeholder="Enter House Image URL" />
                        <br/>
                        <input onClick={this.handleSubmit} type="submit" value={"Save Image to " + this.props.section}></input>
                    </form> : 
                    <form>
                        <input onChange={this.handleChange} value={this.filter} name="filter" type="text" placeholder="Enter Tag" />
                        <br/>
                        <input onClick={this.handleSubmit} type="submit" value="Filter by Tag"></input>
                    </form>}

                    {this.renderPhotos()}
                    <div style={{display: this.state.overlayDisplay}} className="Overlay" >
                        <button className="Close-button" onClick={() => {this.setState({overlayDisplay: 'none'})}}>X</button>
                        <img className="Image" src={this.state.selectedPhoto} alt="overlay"/>
                    </div>
                </div>
            )
    }
}