import React from 'react';
import { Component } from 'react';
import Container from './../ContentContainer';

export default class App extends Component {
        
 
        
  render() {
    return (
      
      <Container>
        page 2 path param "id": <b>{this.props.params.id}</b>
      </Container>
      
       
    );
  }
}