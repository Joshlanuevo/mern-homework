import { FiGrid, FiList } from 'react-icons/fi';

const Navbar = ({ list, setList }) => {
  return (
    <div className="Navbar">
        <div className='icon' onClick={() => setList(!list)}>
                {list ? <FiList /> : <FiGrid />}
        </div>
    </div>
  )
}

export default Navbar;