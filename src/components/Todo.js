
import React from 'react';
import './Todo.css';

export default class Todo extends React.Component{
    constructor(props){
        super(props);
        
        this.editTitle = this.editTitle.bind(this);
        this.editContent = this.editContent.bind(this);
    }

    editTitle(e){
     
        this.props.onTitleEdit(e.target.value);
    }
    editContent(e){
        this.props.onContentEdit(e.target.value);
    }


    render(){
        return (
            <div className="Todo-container" key={this.props.doc.id} >
                {/* <div className="Title">Document 1</div> */}
                <input id="title" defaultValue={this.props.doc.title} onChange={this.editTitle} className="Title" type="text" placeholder="Document Title" />
                <textarea className="My-document" defaultValue={this.props.doc.content} onChange={this.editContent} placeholder="Write your document"></textarea>
            </div>
        );
    }
}