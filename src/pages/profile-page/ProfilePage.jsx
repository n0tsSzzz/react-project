import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProfilePage.css'
import { getToken } from '../login-page/LoginPage';
import {Responses404} from '@consta/uikit/Responses404';
import {Button} from '@consta/uikit/Button';



const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  const [IDFromStorage, setIDFromStorage] = useState(parseInt(localStorage.getItem('id')))

  useEffect(() => {
    let accessToken = getToken()
    if (accessToken) {
      fetch('https://dummyjson.com/auth/me', {
          method: "GET",
          headers: {'Authorization': `Bearer ${accessToken}`},
      }).then((response) => {
          if (response.status === 401) {
            localStorage.clear();
            setIDFromStorage(null);
            throw Error('Invalid token');
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem('id', data.id);
          setUserData(data);
        })
        .catch((error) => {
        //   console.error('Error fetching the user data:', error);
        });
      }
  }, []);

  return (
    <>
      {userData && (parseInt(id) === IDFromStorage) ? (
        <div className='profile_card' style={{ display: 'flex', flexDirection: "column", gap: "20px", alignItems: "center" }}>
            <img src={userData.image} height="100" width="100" alt={userData.firstName}/>
            <h3>{userData.username}</h3>
            <div className='profile_card__info_data' style={{ display: "flex", gap: "5px", flexDirection: "column"}}>
                <div>First name: <b>{userData.firstName}</b></div>
                <div>Last name: <b>{userData.lastName}</b></div>
                <div>Email: <b>{userData.email}</b></div>
                <div>Phone: <b>{userData.phone}</b></div>
            </div>
        </div>
       ): (IDFromStorage === parseInt(id)) ? <div></div> : (
        <Responses404  actions={<Button onClick={() => window.location.href = '/'} size="m" view="ghost" label="На главную" />}/>
      )}
    </>
  );
};

export default Profile;
