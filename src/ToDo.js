import React, { Component } from 'react';
import './ToDo.css';

class ToDo extends Component {
constructor (props) {
super(props);

this.state = {
items: [
{title: "Learn React", description: "Learn how to create and deploy react apps", complete: true, timestamp: new Date()}
],
item: {}
}; // state

this.handleAdd = this.handleAdd.bind (this);
this.handleRemove = this.handleRemove.bind (this);
} // constructor

handleAdd (item) {
this.setState (prevState => {
//alert (`updating ${JSON.stringify(prevState.items.slice().concat(item))}`);
return {
items: prevState.items.slice()
.concat (Object.assign(
item, {timestamp: new Date()}
) // assign
) // concat
};
});
} // handleAdd

handleRemove (item) {
this.setState (prevState => {
return {items: prevState.items.filter (
_item=> {
//ert (`checking ${_item.title}: ${_item !== item}`);
return _item !== item;
}) // filter
}; // return
}); // setState
} // handleRemove

render() {
//alert ("rendering ToDo");
return (
<div className="to-do app">
<header>
<h1 className="app-title">React To-do List</h1>
</header>
<List items={this.state.items} handleRemove={this.handleRemove} />
<hr/>
<AddItemForm handleAdd={this.handleAdd}/>
</div>
); // return
} // render
} // class ToDo


class AddItemForm extends ToDo {
render () {
let item = {complete: false};

//alert ("rendering AddItemForm");
return (
<form className="add-item" onSubmit={(e) => {e.preventDefault(); this.props.handleAdd (item);}}>
<h2>Add Item</h2>
<label>Title: <input type="text" className="title"  onChange={e => item.title = e.target.value} /></label>
<br/><label>Description: <textarea className="description" onChange={e => item.description = e.target.value}/></label>
<br/><input type="submit" value="Add"/>
</form>
); // return

function setItemTitle (e) {
item.title = e.target.value;
} // setItemTitle

function setItemDescription (e) {
item.description = e.target.value;
} // setItemDescription

function addItem () {
this.handleAdd (item);
} // addItem
} // render
} // class AddItemForm

class List extends Component {
render () {
//alert ("rendering List");
return (
<ul>{
this.props.items.length > 0? this.props.items.map ((item) =>
<li key={Date.now()}><Item item={item} handleRemove={this.props.handleRemove} /></li>
)  // map
: <li className="item"><h2>** No Items **</h2></li>
}</ul>
); // return
} // render
} // class List

class Item extends Component {
render () {
//alert ("rendering Item");
let item = this.props.item;

return (
<div className="item">
<h2 className="title" aria-live="polite">
<button className="status" aria-pressed={item.complete? "true" : "false"} onClick={updateItemStatus}>
{item.title}
</button></h2>
<Details item={item} handleRemove={this.props.handleRemove}/>
</div>
); // return

function updateItemStatus (e) {
item.complete = !item.complete;
e.target.setAttribute ("aria-pressed", item.complete? "true" : "false");
} // updateItemStatus
} // render
} // class Item


class Details extends Component {
render () {
//alert ("rendering Details");
return (
<div className="item-details">
<div className="description">{this.props.item.description}</div>
<div className="date">{this.props.item.timestamp.toLocaleTimeString()}</div>
<div className="remove">
<button onClick={() => this.props.handleRemove (this.props.item)}>Remove</button>
</div>
</div>
); // return
} // render
} // class Details

export default ToDo;
