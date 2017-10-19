import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Dropzone from 'react-dropzone'

class App extends Component {
  constructor() {
    super()
    this.state = {
      form: {
        name: "",
        files: []
      }
    }
  }

  handleNameChange(e) {
    this.setState({...this.state, form: {...this.state.form, name: e.target.value}})
  }

  handleSubmit() {
    let formData = new FormData()
    formData.append("name", this.state.form.name)

    this.state.form.files.forEach(f =>
      formData.append("file", f)
    )

    fetch('/users', {
      method: 'POST',
      body: formData
    })
  }

  handleRemoveFile(file) {
    this.setState({
      ...this.state, form: {
        ...this.state.form, files: this.state.form.files.filter(f => f != file)
      }
    });
  }

  onDrop(acceptedFiles, rejectedFiles) {
    this.setState({
      ...this.state, form: {
        ...this.state.form, files: acceptedFiles
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>


        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" value={this.state.form.name} name="name" onChange={e => this.handleNameChange(e)}/>

          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Drag &amp; drop files here or click here to browse for files.</p>
          </Dropzone>

          <button type="submit">submit</button>


        </form>

        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.form.files.map(f => <div><img height={300} width={300} src={f.preview}/><span onClick={this.handleRemoveFile.bind(this, f)}>Remove</span></div>)
            }
          </ul>
        </aside>
      </div>
    );
  }
}

export default App;
