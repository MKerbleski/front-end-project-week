import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const NoteDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export default class NoteDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      note: this.props.note,
    }
  }

  render() {
    return (
      <NoteDetailsDiv>
        <Link
          to={`/all-notes/${this.state.note.id}/edit`}>Edit</Link>
        <Link onClick={() => this.props.enableDelete()}
          to={`/all-notes/${this.state.note.id}/delete`}>Delete</Link>
        <h4>{this.state.note.title}</h4>
        <p>{this.state.note.body}</p>
      </NoteDetailsDiv>
    );
  }
}
