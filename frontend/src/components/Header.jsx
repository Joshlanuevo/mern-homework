import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import Dark from './Dark';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaUserCircle } from 'react-icons/fa';
// import { HiUsers } from 'react-icons/hi';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [dark, setDark] = useState(false);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
            <header className='header'>
                <div className="logo">
                    <CreateIcon className='header-logo'/>
                    <Link to='/' className='logo-title'>Homeworks</Link>
                </div>
                <ul>
                    {user ? (
                        <>
                            {/* <Link to="/users"><HiUsers className='header-user' /></Link>  */}
                            <Dark dark={dark} setDark={setDark} onClick={() => setDark(!dark)}/>
                            <Button 
                                className='dropdown'
                                id="fade-button"
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <FaUserCircle className='auth-btn' />
                            </Button>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={onLogout} onClose={handleClose}>
                                        <FaSignOutAlt/> Logout
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            {/* <Link to="/users"><HiUsers className='header-user' /></Link>  */}
                            <Dark dark={dark} setDark={setDark} onClick={() => setDark(!dark)}/>
                            <Button 
                                className='dropdown'
                                id="fade-button"
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <FaUserCircle className='auth-btn' />
                            </Button>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Link to='/login'>
                                        <FaSignInAlt /> Login
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link to='/register'>
                                        <FaUser /> Register
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </>
                        )
                    }
                </ul>
            </header>
    )
}

export default Header;