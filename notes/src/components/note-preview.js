import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { DragSource } from 'react-dnd';

const NotePreviewDiv = styled.div`
  .note-preview {
    border: 1px solid lightgray;
    background: white;
    ${'' /* background-color: #F3F3F3; */}
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
`;
// const { note, index, key } = this.props;
const NotePreview = (props) => (

  props.connectDragSource(
    <div className="startObject"
      style={{
        opacity: props.isDragging ? 0 : 1,
      }}>
      <NotePreviewDiv >
        <Link
          key={props.key}
          index={props.index}
          className="note-link"
          _id={props.note._id}
          to={`/all-notes/${props.note._id}`}>

            <div key={props.index} className="note-preview">

              <div className="notTags">
                <h3>{props.note.title}</h3>
                <p>{props.note.textBody}</p>
                <p>Index: {props.index}</p>
              </div>

              <div className="tags">
                {(props.note.tags.length > 0) ?
                  props.note.tags.map(tag => {
                        return (<div key={tag}>{tag}</div>)
                      }
                  ) :
                  null}
              </div>
            </div>
        </Link>
      </NotePreviewDiv>
    </div>

  )
)

const sourceObj = {
  beginDrag(props) {
    console.log("beginDrag", props)
    const { _id, index } = props.note; //this return just 'green'
    console.log(_id, index);
    return ({
      _id, index
    });
  },
  //endDrag is called when dropped on a target
  endDrag(props, monitor) {
    console.log("endDrag", "props", props, "monitor", monitor.getDropResult())
    if (!monitor.didDrop()) {
      console.log('!didDrop')
      return;
    }
    // const { onDrop } = props;
    console.log(monitor.getItem());
    const  { _id, index }  = monitor.getItem(); //returns just 'blue'
    // console.log(props.color) // also returns just 'blue'
    console.log(monitor.getDropResult());
    // const { shape } = monitor.getDropResult();
    //gets props from the target
    console.log(_id)
    props.onDrop( _id, index );//onDrop supplied by parent which attaches the color and shape to the props
  },
};



const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  isFoobar: true,
});


export default DragSource('item', sourceObj, collect)(NotePreview)




//old way if
// export default class NotePreview extends Component {
//
//   render() {
//     // console.log(this.props)
//     const { note, index, key } = this.props;
//
//     return (
//             <NotePreviewDiv>
//               <Link
//                 key={key}
//                 index={index}
//                 className="note-link"
//                 _id={note._id}
//                 to={`/all-notes/${note._id}`}>
//
//                   <div key={index} className="note-preview">
//
//                     <div className="notTags">
//                       <h3>{note.title}</h3>
//                       <p>{note.textBody}</p>
//                     </div>
//
//                     <div className="tags">
//                       {(note.tags.length > 0) ?
//                         note.tags.map(tag => {
//                               return (<div key={tag}>{tag}</div>)
//                             }
//                         ) :
//                         null}
//                     </div>
//                   </div>
//               </Link>
//             </NotePreviewDiv>)
// }
// }
