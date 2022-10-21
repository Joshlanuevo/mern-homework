import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HomeworkForm from "../components/HomeworkForm";
import Spinner from '../components/Spinner';
import { getHomeworks, reset } from "../features/homeworks/homeworkSlice";
import HomeworkItem from "../components/HomeworkItem";
import Navbar from "../components/Navbar";
import List from "../components/List";

function Dashboard() {
  const [list, setList] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { homeworks, isLoading, isError, message } = useSelector((state) => state.homeworks);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getHomeworks());

  }, [user, navigate,isError, message, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    }
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />
  }

  return <>
    <section className="heading">
      <p>Homeworks Dashboard</p>
    </section>
    <HomeworkForm />

    <section className="content">
      <div className="content-header">
        <div className="header-total">
          <h1 className="total">Total: {homeworks.length}</h1>
        </div>
      </div>
        <Navbar list={list} setList={setList} />
        {list ? (<List />) : (<>
        {homeworks.length > 0 ? (
        <div className="homeworks">
          {homeworks.map((homework) => (
            <HomeworkItem 
              key={homework._id} 
              homework={homework} 
              // remove={() => dispatch(deleteHomework(homework._id))}
              // update={() => dispatch(updateHomework(homework._id, text))}
            />
          ))}
        </div>
      ) : (
        <h3>You have not set any homeworks yet.</h3>)}
        </>
        )}
    </section>
  </>
}

export default Dashboard;