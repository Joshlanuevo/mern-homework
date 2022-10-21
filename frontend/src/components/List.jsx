import { useSelector } from 'react-redux';
import HomeworkItem from "../components/HomeworkItem";

const List = () => {
    const { homeworks } = useSelector((state) => state.homeworks);

    return (<>
        {homeworks.length > 0 ? (
            <div className="list">
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
    )
}

export default List