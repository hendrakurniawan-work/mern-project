import React, { Fragment } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";

const ProfileEducation = () => {

  const education = useSelector((state) => state.profile.profile.education);

  const educations=education.map((edu) => {
    return (
        <div key={edu._id}>
            <h3 className="text-dark">{edu.school}</h3>
            <p><Moment format="YYYY/MM/DD">{edu.from}</Moment> - {!edu.to ? "Now" : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}</p>
            <p><strong>Degree: </strong> {edu.degree}</p>
            <p><strong>Field of Study: </strong> {edu.fieldofstudy}</p>
            <p><strong>Description: </strong> {edu.description}</p>
        </div>
    );
  });

  return <Fragment>{educations}</Fragment>;
};

export default ProfileEducation;
