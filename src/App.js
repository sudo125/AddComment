import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{
    
    constructor() {
        super();
        this.state = {
          editing:false,
        };
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.save = this.save.bind(this);
    }
    
    edit(){
        this.setState({editing:true});
    }
    
    remove(){
        console.log('Removing Comment');
        this.props.deleteFormBorad(this.props.index);
    }
    
    save(){
        
        this.props.updateCommentText(this.refs.newText.value, this.props.index);
        console.log('New comment'+this.refs.newText.value);
        this.setState({editing:false});
        console.log(this.state.editing)
    }
    
    renderNormal(){
        return(
            <div className="commentContainer">
                
                <div className = "commentText">{this.props.children}</div>
                <button onClick={this.edit} className="edit" >Edit</button>
                <button onClick={this.remove} className="remove">Remove</button>
                
            </div>
        );
    }
    
    renderForm(){
        return(
            <div className="commentContainer">
                <textarea ref="newText" defaultValue={this.props.children}></textarea>
                <button onClick={this.save} className="save">Save</button>
            </div>
        );
    }
    
    render(){
        if(this.state.editing){
            return this.renderForm();
        }else{
            return this.renderNormal();
        }
      }
};

class Board extends React.Component{

    constructor() {
        super();
        this.state = {
            comments:[
                    'I like ice cream',
                    'Angular 2 ',
                    'ReactJS'
                ]
        };
        this.add = this.add.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.eachComment = this.eachComment.bind(this);
        
    }
    
    
    add(){
      var arr = this.state.comments;
        arr.push(this.item);
        this.setState({comments:arr});
    }
    
    removeComment(i){
        console.log('Removing comment:' +i);
        var arr = this.state.comments;
        arr.splice(i, 1);
        this.setState({comments: arr})
    }
    
    updateComment(newText, i){
        console.log('Updateing comment:' +i);
        var arr = this.state.comments;
        arr[i] = newText;
        this.setState({comments: arr,editing:false})
        console.log(arr);
    }
        
    eachComment(item, i){
       return(
           <App key={i} index={i} updateCommentText={this.updateComment} deleteFormBorad={this.removeComment}>
           {item}
           </App>
       );
    
    }        
    render(){
        return(
            <div>
                <button onClick={this.add.bind(null, "Default test")} className="addComment">Add New</button>
                <div className="board">
                    {this.state.comments.map(this.eachComment)}
                </div>
            </div>
        );
    }
};

export default Board;
