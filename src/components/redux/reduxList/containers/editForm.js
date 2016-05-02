import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {cancelSelectVoter} from '../actions';
import {saveSelectVoter} from '../actions';
import {reportError} from '../actions';
import {cloneJSON} from './../reducers'
import validate from './../services/validate'

class EditForm extends Component {
   
       
  constructor()
  {
      super();
      
     
  }
  
  componentWillMount()
  {
      this.state = {currentVoter: this.props.currentVoter};
  }
 
  componentWillReceiveProps (nextProps) {
     
      this.setState({currentVoter: nextProps.currentVoter, actionMode: nextProps.actionMode})
  }
   
  showEditForm()
  {
        if (this.props.actionMode)
        {
            return null;
        }
        return "hidden";
  }
  

  
  processField(fieldName,ev)
  {
     
        let  copyState = cloneJSON( this.state );  
        copyState.currentVoter[fieldName] = ev.target.value;
        this.setState(copyState);
      
  }
  
   
  
  
  
  cancelItem(e)
  {
      e.preventDefault();
      this.props.cancelSelectVoter(this.state.currentVoter)

  }
 saveItem(id,e)
  {
      e.preventDefault();
      let result = validate(this.state.currentVoter);
      if (result.valid)
      {
        this.props.saveSelectVoter(this.state.currentVoter) ;
      }
      else
      {
        this.props.reportError(this.state.currentVoter,result) ; 
      }
      
  }
  

  render() {
      

      let currentVoter = this.state.currentVoter;
      return (
            <section className={this.showEditForm()}>
           
           <form id='editForm' noValidate>
                <table>
                <tbody>
                 
                <tr><th>Name:</th><td><input type='text' className="inputName" value={currentVoter.name} onChange={this.processField.bind(this,"name")} /></td></tr>
                <tr><th>Age:</th><td><input type='text' className="inputAge" value={currentVoter.age} onChange={this.processField.bind(this,"age")} /></td></tr>
                 
                
 
                <tr><th>Party:</th><td> 
                    <select ref="partySelect" value={currentVoter.party} onChange={this.processField.bind(this,"party")} >
                    <option value="Democrat">Democrat</option>
                    <option value="Republican">Republican</option>
                    <option value="Communist">Communist</option>
                    </select>
                    
                    </td> 
                </tr>
        
                <tr>
                     <td> <button className="deleteButton" onClick={this.cancelItem.bind(this)}>Cancel</button> </td>
                    <td> <button className="editButton"   onClick={this.saveItem.bind(this,currentVoter.id)}>Save</button> </td>
                
                </tr>
        
                </tbody>
                </table>
           
           
           </form>
            </section>        
                    
                    )
      
  }
  
  }
  
  ////////////////////////////////////////////////////////////////////////

function mapStateToProps(state) {
   
   
   let newLocalState =  {
    currentVoter: state.currentVoter,
    actionMode: state.actionMode
  };
   
   
  return newLocalState;
}

 
function mapDispatchToProps(dispatch) {
   
  return bindActionCreators({ cancelSelectVoter,saveSelectVoter,reportError }, dispatch);
}

 
    
export default connect(mapStateToProps, mapDispatchToProps)(EditForm);