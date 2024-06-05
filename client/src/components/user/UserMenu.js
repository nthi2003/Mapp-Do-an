import { Dashboard, Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useValue } from '../../context/ContextProvider';
import useCheckToken from '../../hooks/useCheckToken';
import Profile from './Profile';
import { storePin } from '../../actions/pin';
import { logout } from '../../actions/user';

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  useCheckToken();
  const {
    dispatch,
    state: {
      currentUser,
      location,
      details,
      images,
      updatedPin,
      deletedImages,
      addedImages,
    },
  } = useValue();

  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    storePin(
      location,
      details,
      images,
      updatedPin,
      deletedImages,
      addedImages,
      currentUser.id
    );
    logout(dispatch);
    handleCloseUserMenu();
    navigate('/'); // Navigate to home or login page after logout
  };

  useEffect(() => {
    const storeBeforeLeave = (e) => {
      if (
        storePin(
          location,
          details,
          images,
          updatedPin,
          deletedImages,
          addedImages,
          currentUser.id
        )
      ) {
        e.preventDefault();
        e.returnValue = true;
      }
    };

    window.addEventListener('beforeunload', storeBeforeLeave);
    return () => window.removeEventListener('beforeunload', storeBeforeLeave);
  }, [location, details, images, updatedPin, deletedImages, addedImages, currentUser.id]);

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        {!currentUser.google && (
          <MenuItem
            onClick={() =>
              dispatch({
                type: 'UPDATE_PROFILE',
                payload: {
                  open: true,
                  file: null,
                  photoURL: currentUser?.photoURL,
                },
              })
            }
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        )}
        <MenuItem onClick={() => navigate('dashboard')}>
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile />
    </>
  );
};

export default UserMenu;
