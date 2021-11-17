import React, { Fragment } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";

const ProfileExperience = () => {

  const experience = useSelector((state) => state.profile.profile.experience);

  const experiences=experience.map((exp) => {
    return (
        <div key={exp._id}>
            <h3 className="text-dark">{exp.company}</h3>
            <p><Moment format="YYYY/MM/DD">{exp.from}</Moment> - {!exp.to ? "Now" : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}</p>
            <p><strong>Position: </strong> {exp.title}</p>
            <p><strong>Description: </strong> {exp.description}</p>
        </div>
    );
  });

  return <Fragment>{experiences}</Fragment>;
};

export default ProfileExperience;
