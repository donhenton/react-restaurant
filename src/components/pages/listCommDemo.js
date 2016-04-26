import React from 'react';
import { Component } from 'react';
import Container from './../ContentContainer';
import ListMain from './../listCommDemo/listMain'

export default class listCommDemo extends Component {
        
 
        
  render() {
    return (
      
      <Container>
      <h3>Communication Between List and Its Elements</h3>
       <ListMain />
      </Container>
      
       
    );
  }
}

//this is how to read a passed in param
// page 2 path param "id": <b>{this.props.params.id}</b>