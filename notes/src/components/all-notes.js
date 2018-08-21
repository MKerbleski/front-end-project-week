import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const AllNotesDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  h4 {
    border: 1px solid green;
  }
  .all-notes {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;

    .note-link{
      text-decoration: none;
    }
    .note-preview {
      border: 1px solid lightgray;
      background: white;
      width: 200px;
      height: 200px;
      margin-bottom: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      color: black;
      .notTags{
        ${'' /* border: 1px solid green; */}
        width: 90%;
        max-height: 150px;
        overflow: auto;
        margin: 2% 0;
        h3{
          ${'' /* border: 1px solid green; */}
          margin: 10px 10px 5px 0;
          text-decoration: none;
          border-bottom: 1px solid black;
        }
        p {
          ${'' /* border: 1px solid blue; */}
          width: 95%;
          height: 40%;
          padding-bottom: 10px;
          overflow: auto;
          text-decoration: none;
          margin: 0;
          line-height: 23px;
          font-size: 14px;
          font: roboto;
        }
      }

      .tags {
        ${'' /* border: 1px solid red; */}
        display: flex;
        flex-direction: row:
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-end;
        width: 95%;
        bottom: 0;
        ${'' /* overflow: hidden; */}
        div {
          border: 1px solid lightgray;
          margin: 2px;
          padding: 4px;
        }
      }
    }
  }
`;

export default class AllNotes extends Component {
  constructor(props){
    super(props);
    this.state = {
      notes: this.props.notes,
    }
  }

  render() {
    return (
      <AllNotesDiv>
        <h3>Your Notes:</h3>
        {
        }
        <div className="all-notes">
          {this.props.notes.map(note => {
            // let url = decodeURI(note.title)
            // would be cool to use title instead
            //how to do that?
            //------------------------------??----------------------
            return (
              <Link
                className="note-link"
                key={note._id}
                to={`/all-notes/${note._id}`}>
                  <div className="note-preview">

                    <div className="notTags">
                      <h3>{note.title}</h3>
                      <p>{note.textBody}</p>
                    </div>

                    <div className="tags">
                      {(note.tags.length > 0) ?
                        note.tags.map(tag => {
                              return (<div key={tag}>{tag}</div>)
                            }
                        ) :
                        null}
                    </div>
                  </div>
              </Link>
            )
          })}
        </div>
      </AllNotesDiv>
    );
  }
}
