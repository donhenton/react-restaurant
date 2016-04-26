import React from 'react';
        import { Component } from 'react';
        export default class ListElement extends Component {

        constructor()
        {
            super();
        }
        //https://facebook.github.io/react/docs/component-specs.html
        componentWillReceiveProps (nextProps) {
          //  console.log("component will receive props "+JSON.stringify(nextProps))
        }
        
        componentWillUpdate(nextProps,nextState)
        {
           // console.log("component will update state "+JSON.stringify(nextState))
           // console.log("component will update props "+JSON.stringify(nextProps))
           // dont set state here it will cause a infinite loop
           // this.setState({highlighted: nextProps.highlighted})
        }

        componentWillMount()
        {
        this.state = {item: this.props.item, highlighted: this.props.highlighted};
        this.parentAction = this.props.parentAction;
        
        }
              
        computeHighLight()
        {
            if (this.props.highlighted)
            {
                
                return "highlighted"
            }
            return null;
        }
        
        selectAction()
        {
            //this.setState({highlighted: true})
            this.parentAction.reportSelection(this.state.item);
        }

        render() {
        return (
                < tr >
                < td > < button className = "editButton" onClick={this.selectAction.bind(this)}> Select < /button></td >
                < td > < button className = "deleteButton" > Delete < /button></td >
                < td className={this.computeHighLight()} > {this.state.item.text} < /td>
                < /tr>
                );
        }
        }