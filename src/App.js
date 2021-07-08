// import logo from './logo.svg';
import React from 'react';
import './App.css';
import List from './components/List';
import Todo from './components/Todo';
import { v4 as uuidv4 } from 'uuid';

class App extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      list: [
        {id: uuidv4(), title: 'Sample Document', content: 'Hello World! This is a sample document'},
        {id: uuidv4(), title: 'Document 2', content: ''}
      ],
      selectedListIndex: 0
    }

    this.changeSelected = this.changeSelected.bind(this);
    this.editSelectedTitle = this.editSelectedTitle.bind(this);
    this.editSelectedContent = this.editSelectedContent.bind(this);
    this.appendNewDoc = this.appendNewDoc.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
  }
  
  changeSelected(e) {
    // console.log(e, 'index');
    // this.state.selectedListIndex = e;
    this.setState({
      selectedListIndex: e
    })
  };

  editSelectedTitle(s){
    let l = this.state.list;
    l[this.state.selectedListIndex].title = s;
    this.setState({
      list: l
    });
  }

  editSelectedContent(s){
    let l = this.state.list;
    l[this.state.selectedListIndex].content = s;
    this.setState({
      list: l
    });
  }

  appendNewDoc(){
    let l = this.state.list;
    let i = this.state.list.length;
    let n_id = this.state.list.length + 1;
    // let n_id = 2;
    l.push({
      id: uuidv4(),
      title: "Document " + n_id,
      content: ""
    })
    this.setState({
      list: l,
      selectedListIndex: i
    });
  }

  deleteDocument(i){
    let l = this.state.list;
    l.splice(i, 1);

    let sInx = this.state.selectedListIndex;

    if(l.length == 0){
      l.push({id:uuidv4(), title: 'Document 1', content: ''});
    }

    if(this.state.selectedListIndex == this.state.list.length){
      this.setState({
        selectedListIndex: sInx-1
      });
    }

    if(i == this.state.selectedListIndex){
      this.setState({
        selectedListIndex: i == 0 ? i : i - 1
      });
    }

    this.setState({
      list: l
    });


  }

  render(){
    return (
      <div className="Container">
        <header>
          To-Do List
          <span className="Caption">Made by Ankur Shah</span>
        </header>
        <div className="Main">
          <List list={this.state.list} sIndex={this.state.selectedListIndex} onChangeSelected={this.changeSelected} appendNewDoc={this.appendNewDoc} deleteDocument={this.deleteDocument} />
          <Todo doc={this.state.list[this.state.selectedListIndex]} onTitleEdit={this.editSelectedTitle} onContentEdit={this.editSelectedContent} />
        </div>
      </div>
    );
  }
}

export default App;
