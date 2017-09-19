import React, { Component } from 'react';
import { Nav, NavItem, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css';

class Navigation extends Component {
  render() {
    return (
        <Nav bsStyle="pills" className="nav navbar-inverse">
            <ButtonGroup>
                <Link to="/"><Button bsStyle="link">Our House</Button></Link>
                <Link to="/exteriors"><Button bsStyle="link">Exteriors</Button></Link>
                <Link to="/grounds"><Button bsStyle="link">Grounds</Button></Link>
                <Link to="/gardens"><Button bsStyle="link">Gardens</Button></Link>
                <Link to="/external-buildings"><Button bsStyle="link">External Buildings</Button></Link>
                <Link to="/living-rooms"><Button bsStyle="link">Living Rooms</Button></Link>
                <Link to="/kitchens"><Button bsStyle="link">Kitchens</Button></Link>
                <Link to="/bedrooms"><Button bsStyle="link">Bedrooms</Button></Link>
                <Link to="/bathrooms"><Button bsStyle="link">Bathrooms</Button></Link>
                <Link to="/basements"><Button bsStyle="link">Basements</Button></Link>
                <Link to="/decor"><Button bsStyle="link">Decor</Button></Link>
            </ButtonGroup>
        </Nav>
    );
  }
}

export default Navigation;