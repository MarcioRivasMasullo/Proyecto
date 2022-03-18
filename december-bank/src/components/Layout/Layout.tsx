import React, { ReactChild, ReactChildren } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import profileDefaultImage from '../../assets/images/profileIcon.png';
import { RootState } from '../../redux/reducers';
import {
  loginPath,
  newTransactionPath,
  transactionListPath,
} from '../../routes/PathsConstants';

interface AuxProps {
  children: ReactChild | ReactChildren;
}

function Layout({ children }: AuxProps) {
  const userData = useSelector(({ authReducer }: RootState) => authReducer);

  const navigate = useNavigate();

  const closeSession = () => {
    localStorage.clear();
    navigate(loginPath);
  };

  return (
    <div>
      <div
        style={{
          width: '100%',
          backgroundColor: 'DarkSlateBlue',
          overflow: 'hidden',
          color: 'white',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>DECEMBER BANK</h1>
        <img
          src={profileDefaultImage}
          alt="Default profile"
          width="40px"
          style={{
            top: '15px',
            right: '150px',
            position: 'absolute',
            overflow: 'hidden',
          }}
        />
        <h3
          style={{
            top: '0px',
            right: '30px',
            position: 'absolute',
            cursor: 'pointer',
          }}
          onClick={closeSession}
        >
          {localStorage.getItem('userName') || 'USER NAME'}
        </h3>
      </div>
      <div style={{ display: 'flex' }}>
        <div
          style={{ flex: '35%', padding: '15px 0', backgroundColor: '#bbb' }}
        >
          <ul
            style={{
              listStyleType: 'none',
              padding: '0',
              margin: '0',
              justifyContent: 'center',
            }}
          >
            <li>
              <Link
                to={transactionListPath}
                style={{
                  padding: '10px',
                  textDecoration: 'none',
                  color: 'black',
                  display: 'block',
                }}
              >
                TRANSACTION LIST
              </Link>
            </li>
            <br></br>
            <li>
              <Link
                to={newTransactionPath}
                style={{
                  padding: '10px',
                  textDecoration: 'none',
                  color: 'black',
                  display: 'block',
                }}
              >
                NEW TRANSACTION
              </Link>
            </li>
          </ul>
        </div>
        <div style={{ flex: '220%', padding: '15px', backgroundColor: '#ddd' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;