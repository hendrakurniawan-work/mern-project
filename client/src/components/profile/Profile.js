import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getProfileById } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileAbout from "./ProfileAbout";
import ProfileEducation from "./ProfileEducation";
import ProfileExperience from "./ProfileExperience";
import ProfileGithub from "./ProfileGithub";
import ProfileTop from "./ProfileTop";

const Profile = () => {
  const loading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.profile);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfileById(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {isAuthenticated &&
            loading === false &&
            user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop />
            <ProfileAbout />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>{<ProfileExperience />}</Fragment>
              ) : (
                <h4> No Experience Information </h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>{<ProfileEducation />}</Fragment>
              ) : (
                <h4> No Education Information </h4>
              )}
            </div>

            {profile.githubusername && (
                <ProfileGithub />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
