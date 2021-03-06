import './_dashboard-container.scss';
import React from 'react';
import uuid from 'uuid/v1';

import NoteForm from '../note-form';
import NoteListContainer from '../note-list-container';


class DashboardContainer extends React.Component {
  constructor (props) {
    super(props);
    this.noteCreate = this.noteCreate.bind(this);
    this.noteDelete = this.noteDelete.bind(this);
    this.noteUpdate = this.noteUpdate.bind(this);
  }

  noteCreate (note) {
    note.id = uuid();
    this.props.app.setState((prevState) => ({
      notes: prevState.notes.concat([note]),
    }));
  }

  noteDelete (note) {
    this.props.app.setState((prevState) => ({
      notes: prevState.notes.filter((item) => {
        return item.id !== note.id;
      }),
    }));
  }

  noteUpdate (note) {
    this.props.app.setState((prevState) => ({
      notes: prevState.notes.map((item) => {
        return item.id === note.id ? note : item;
      }),
    }));
  }

  render () {
    return (
      <div className="dashboard-container">
        <h1>Notes Machine</h1>
        <NoteForm handleSubmit={this.noteCreate} submitTitle='Add Note'/>
        <NoteListContainer
          noteUpdate={this.noteUpdate}
          noteDelete={this.noteDelete}
          notes={this.props.app.state.notes}/>
      </div>
    );
  }
}

export default DashboardContainer;
