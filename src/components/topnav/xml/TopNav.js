import React from 'react';
 
import { Component } from 'react';
import { Link } from 'react-router';
let DOMParser = require('xmldom').DOMParser;
export default class MenuBar extends Component {


        constructor()
        {
        super();
                this.menuItems = null;
        }
        componentWillMount()
        {


                let parser = new DOMParser();
                let doc = parser.parseFromString(this.props.xml);
                this.menuItems = doc.getElementsByTagName("menu")[0].childNodes
     
        }

        getItems()
        {
            let items;
            let itemArray = Array.prototype.slice.call(this.menuItems);

            items = itemArray.map((item,i ) =>{
                
                if (item.nodeName == "menuItem")
                {
                    return <li key={i}><Link to={item.attributes.getNamedItem('href').value}>{item.childNodes[0].nodeValue}</Link>< /li>
                }
                if (item.nodeName == "subMenu")
                {
                    
                   let subItemsArray =  Array.prototype.slice.call(item.getElementsByTagName('subMenuItem'));
                    
                   var processedSubItems = subItemsArray.map((subItem,k) =>{
                       
                       return <li key={i+"_"+k}><Link to={subItem.attributes.getNamedItem('href').value}>{subItem.childNodes[0].nodeValue}</Link></li>
                   })
                    
                   return <li  className="has-submenu" key={i}><span className="groupMenu-placeholder">{item.attributes.getNamedItem("text").value}</span> 
                           
                            <ul>
                                {processedSubItems}
                            </ul>
                            
                          </li>
                }
                
                
                
                
            }); //end process 

            return items;
        }

        render() {
        return (
                < div >
                    <nav className="topMenu">
                        < ul className="primary-nav">
                            {this.getItems()}
                        < /ul>
                    </nav>
                < /div>

                );
        }
        }

       