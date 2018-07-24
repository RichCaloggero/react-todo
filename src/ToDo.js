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

this.titleInput = null;
this.receiveTitleInput = this.receiveTitleInput.bind(this);
this.handleAdd = this.handleAdd.bind (this);
this.handleRemove = this.handleRemove.bind (this);
this.handleChange = this.handleChange.bind(this);
} // constructor

receiveTitleInput (element) {
this.titleInput = element;
} // receiveTitleInput

handleAdd (item) {
this.setState (prevState => {
//console.log (`updating ${JSON.stringify(prevState.items.slice().concat(item))}`);
return {
items: prevState.items.slice()
.concat (Object.assign(
item, {timestamp: new Date()}
) // assign
) // concat
}; // return
}); // setState
} // handleAdd

handleRemove (item) {
this.setState (prevState => {
return {items: prevState.items.filter (
_item=> {
//console.log(`checking ${_item.title}: ${_item !== item}`);
return _item !== item;
}) // filter
}; // return
}); // setState
} // handleRemove

handleChange (item) {
const items = this.state.items
.map(_item => {
if (_item === item) _item.complete = !_item.complete;
console.log ("changed: ", _item);
return _item;
});

this.setState(prevState => 
Object.assign ({}, prevState, items)
);
} // handleChange

render() {
let focus = (this.state.items.length === 0);

if (focus && this.titleInput) this.titleInput.focus();

//console.log ("rendering ToDo");
return (
<div className="to-do app">
<header>
<h1 className="app-title">React To-do List</h1>
<h2 aria-live="polite" aria-atomic="true" className="complete-count">{`${this.state.items.filter(item => item.complete).length} complete.`}</h2>
</header>
<List items={this.state.items} handleRemove={this.handleRemove} handleChange={this.handleChange}/>
<hr/>
<AddItemForm receiveTitleInput={this.receiveTitleInput} handleAdd={this.handleAdd}/>
</div>
); // return
} // render
} // class ToDo


class AddItemForm extends ToDo {
componentDidMount () {
console.log(`form mounted with element ${this.titleInput}`);
this.props.receiveTitleInput (this.titleInput);
} // componentDidMount


render () {
let item = {complete: false};

//console.log ("rendering AddItemForm");
return (
<form
className="add-item"
onSubmit={
e => {e.preventDefault();
this.props.handleAdd (item);}
}>
<h2>Add Item</h2>
<label>Title:
<input ref={input => this.titleInput = input} type="text" className="title"  onChange={e => item.title = e.target.value} />
</label>
<br/><label>Description:
<textarea className="description" onChange={e => item.description = e.target.value}/>
</label>
<br/><input type="submit" value="Add"/>
</form>
); // return
} // render
} // class AddItemForm

class List extends Component {
render () {
let key = keygen();

//console.log ("rendering List");
return (
<ul>{
this.props.items.length > 0?
  this.props.items.map ((item) =>
    <li key={key.next().value}>
      <Item item={item} handleRemove={this.props.handleRemove} handleChange={this.props.handleChange}/>
    </li  >
  )  // map
: <li className="item">
  <h2>** No Items **</h2>
</li>
}</ul>
); // return
} // render
} // class List

class Item extends Component {
  render () {
//console.log ("rendering Item");
const {item, handleChange} = this.props;

return (
<div className="item">
<h2 className="title" aria-live="polite">
<label>
{item.title}
<input type="checkbox" className="status" defaultChecked={item.complete} onChange={() => handleChange(item)}/>
</label>
</h2>
<Details item={item} handleRemove={this.props.handleRemove}/>
</div>
); // return
} // render

} // class Item


class Details extends Component {
render () {
//console.log ("rendering Details");
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

function* keygen () {
let key = 0;
while (true) {
key += 1;
yield (key);
} // while
} // keygen

export default ToDo;
