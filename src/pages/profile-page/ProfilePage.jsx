import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProfilePage.css'
import { getToken } from '../login-page/LoginPage';
import {Responses404} from '@consta/uikit/Responses404';



const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  const IDFromStorage = parseInt(localStorage.getItem('id'))

  let accessToken = getToken()
  useEffect(() => {
    fetch('https://dummyjson.com/auth/me', {
        method: "GET",
        headers: {'Authorization': `Bearer ${accessToken}`},
    }).then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching the user data:', error);
      });
  }, []);

  return (
    <>
      {userData && (parseInt(id) === IDFromStorage) ? (
        <div className='profile_card' style={{ display: 'flex', flexDirection: "column", gap: "20px", alignItems: "center" }}>
            <img src={userData.image} height="100" width="100" />
            <h3>{userData.firstName + ' ' + userData.lastName}</h3>
            <div className='profile_card__info_data' style={{ display: "flex", gap: "5px", flexDirection: "column"}}>
                <div>First name: <b>{userData.firstName}</b></div>
                <div>Last name: <b>{userData.lastName}</b></div>
                <div>Email: <b>{userData.email}</b></div>
                <div>Phone: <b>{userData.phone}</b></div>
            </div>
        </div>
       ): (IDFromStorage === parseInt(id)) ? <div></div> : (
        <Responses404/>
      )}
    </>
  );
};

export default Profile;
