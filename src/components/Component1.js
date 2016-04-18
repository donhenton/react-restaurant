import React from 'react';
        import { Component } from 'react';
        import postal from 'postal';
        export default class App1 extends Component {

        constructor()
        {
            super();
        
        let me = this;
        this.subscription = postal.subscribe({
                channel: "general",
                topic: "component_change",
                callback: function(data, envelope) {
                me.setState({text: data.text});
                }
            });
       
       
       
       
        }

         

        componentWillMount()
        {
        this.state = {text: 'Initial Text'}

 
        
        }


        render() {
        return (
                < div className = "componentBoxRed" >
                < p > Component 1 < /p>

                < p > {this.state.text} < /p>



                < /div>


                );
        }
        }
