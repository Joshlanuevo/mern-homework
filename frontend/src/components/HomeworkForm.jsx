import { useState } from "react";
import { useDispatch } from "react-redux";
import { createHomework } from '../features/homeworks/homeworkSlice';

function HomeworkForm() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    dispatch(createHomework({text}));
    setText("");
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Set your Homework</label>
          <input 
            type="text" 
            name="text" 
            id="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit" >Add Homework</button>
        </div>
      </form>


    </section>
  )
}

export default HomeworkForm;