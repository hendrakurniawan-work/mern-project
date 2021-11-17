import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Experience from "./Experience";

const Dashboard = () => {

  const loading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.profile);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment><DashboardActions />
        <Experience />
        <Education />
        <div className="my-2">
            <button className="btn btn-danger" onClick={()=> dispatch(deleteAccount())}>
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div></Fragment>
      ) : (
        <Fragment>
          <p>You have no profile yet, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
