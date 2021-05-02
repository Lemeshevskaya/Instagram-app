import React from 'react';
import { Link } from 'react-router-dom';
import style from '../../css/profile.css';

const ProfileActions = () => {
  return (
    <div className="btn-group profile_button" role="group">
      <Link to="/edit-profile" className="btn btn-light profile_button">
        <i className="text-info mr-1" /> Edit Profile
      </Link>
    </div>
  );
};

export default ProfileActions;
