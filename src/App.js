// import logo from './logo.svg';
import React from 'react';
import './App.css';
import List from './components/List';
import Todo from './components/Todo';
import { v4 as uuidv4 } from 'uuid';

class App extends React.Component {


  constructor(props){
    super(props);

    if(localStorage.getItem('list') == null){
      console.log('A');
      let obj = {
        list: [
          {id: uuidv4(), title: 'Sample Document', content: 'Hello World! This is a sample document'},
          {id: uuidv4(), title: 'Document Title 2', content: ''}
        ],
        selectedListIndex: 0
      }

      this.state = obj;
      localStorage.setItem('list', JSON.stringify(obj.list));
      localStorage.setItem('selectedListIndex', 0);
    }else{
      console.log('B');
      this.state = {
        list: JSON.parse(localStorage.getItem('list')),
        selectedListIndex: JSON.parse(localStorage.getItem('selectedListIndex'))
      }
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
    localStorage.setItem('selectedListIndex', e);
  };

  editSelectedTitle(s){
    let l = this.state.list;
    l[this.state.selectedListIndex].title = s;
    this.setState({
      list: l
    });
    localStorage.setItem('list', JSON.stringify(l));
  }

  editSelectedContent(s){
    let l = this.state.list;
    l[this.state.selectedListIndex].content = s;
    this.setState({
      list: l
    });
    localStorage.setItem('list', JSON.stringify(l));
  }

  appendNewDoc(){
    let l = this.state.list;
    let i = this.state.list.length;
    let n_id = this.state.list.length + 1;
    // let n_id = 2;
    l.push({
      id: uuidv4(),
      title: "Document Title " + n_id,
      content: ""
    })
    this.setState({
      list: l,
      selectedListIndex: i
    });
    localStorage.setItem('selectedListIndex', i);
    localStorage.setItem('list', JSON.stringify(l));
  }

  deleteDocument(i){
    let l = this.state.list;
    l.splice(i, 1);

    let sInx = this.state.selectedListIndex;

    if(l.length == 0){
      l.push({id:uuidv4(), title: 'Document Title 1', content: ''});
    }

    if(this.state.selectedListIndex == this.state.list.length){
      this.setState({
        selectedListIndex: sInx-1
      });
      localStorage.setItem('selectedListIndex', sInx-1);
    }

    if(i == this.state.selectedListIndex){
      let k = i == 0 ? i : i - 1;
      this.setState({
        selectedListIndex: k
      });
      localStorage.setItem('selectedListIndex', k);
    }

    this.setState({
      list: l
    });

    localStorage.setItem('list', JSON.stringify(l));
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
