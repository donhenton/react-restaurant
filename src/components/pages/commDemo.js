import React from 'react';
import { Component } from 'react';
import Comp2 from './../Component2';
import Comp1 from './../Component1';
import Container from './../ContentContainer';

export default class CommDemo extends Component {
        
 
        
  render() {
    return (
      
      <Container>
      <h3>Component Communication Demo</h3>
       <Comp1 />
       <Comp2 />
      </Container>
      
       
    );
  }
}