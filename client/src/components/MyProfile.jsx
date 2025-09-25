import React from 'react';
import { useSelector } from 'react-redux';
import CoverSection from './forms/CoverFileUpload';
import Profile from './Profile';

const MyProfile = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <>
      <div className="flex flex-col">
        <div className="p-2">
          <CoverSection user={user} />
        </div>
        <div className="p-2">
          <Profile user={user}/>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
