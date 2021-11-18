import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const ProfileItem = () => {
  const profiles = useSelector((state) => state.profile.profiles);
  const profileItems = profiles.map((profile) => {
    return (
      <div key={profile.user._id} className="profile bg-light">
        <img src={profile.user.avatar} alt="" className="round-img" />
        <div>
          <h2>{profile.user.name}</h2>
          <p>
            {profile.status}{" "}
            {profile.company && <span> at {profile.company}</span>}
          </p>
          <p className="my-1">
            {profile.location && <span>{profile.location}</span>}
          </p>
          <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">
            View Profile
          </Link>
        </div>
        <ul>
          {profile.skills.slice(0, 4).map((skill, index) => (
            <li key={index} className="text-primary">
              <i className="fas fa-check"></i> {skill}
            </li>
          ))}
        </ul>
      </div>
    );
  });
  return <Fragment>{profileItems}</Fragment>;
};

export default ProfileItem;
