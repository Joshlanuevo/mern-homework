import { useState } from 'react';
import { updateHomework, deleteHomework } from '../features/homeworks/homeworkSlice.js';
import { useDispatch } from 'react-redux';

function HomeworkItem({homework}) {
  const [text, setText] = useState("");
  const [updating, setUpdating] = useState(false);

  const dispatch = useDispatch();
  
  const onSubmit = e => {
    e.preventDefault();
    dispatch(updateHomework({...homework, text}));
    setUpdating(false);
    setText("");
  }

  return (<>
    <div className="homework">
      <div className="date">{new Date(homework.createdAt).toLocaleString('en-US')}</div>  
      {updating ? (
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group-edit">
              <input
                type="text"
                name="text"
                id="text"
                value={text}
                placeholder={homework.text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-block">Update</button>
            </div>
          </form>
        </section>
        ) : ( <>
          <h1 className='homework-text'>{homework.text}</h1>
          <button className='edit' onClick={() => setUpdating(true)}>EDIT</button>
          <button onClick={() => dispatch(deleteHomework(homework._id))} className="delete">DELETE</button>
          </>
      )}
      {/* <button onClick={() => setUpdating(true)} className="edit">EDIT</button>  */}
    </div>
  </>
  )
}

export default HomeworkItem;