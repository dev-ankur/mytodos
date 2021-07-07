
import React from 'react';
import './List.css';

class List extends React.Component {

    constructor(props){
        super(props);

        // this.selectDoc = this.selectDoc.bind(this);
        this.addNewDoc = this.addNewDoc.bind(this);
        this.deleteDoc = this.deleteDoc.bind(this);
    }

    selectDoc(i){
        // console.log(i);
        this.props.onChangeSelected(i);
    }

    addNewDoc(){
        this.props.appendNewDoc();
    }

    deleteDoc(i, e){
        e.stopPropagation();
        this.props.deleteDocument(i);
    }

    render() {
        var list = this.props.list.map((k,i) => (<li onClick={this.selectDoc.bind(this, i)} key={k.id}>{k.title} <span onClick={(e) => this.deleteDoc(i, e)}>Delete</span></li>))

        return (
            <div className="List-container">
                <ul>
                    {list}
                </ul>
                <div className="Add-new" onClick={this.addNewDoc}>
                    + Add new document
                </div>
            </div>
        );
    }
};

export default List;