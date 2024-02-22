import React from "react";
import style from './NotFoundPage.module.scss'
import { Link } from "react-router-dom";
import { notFoundImage } from "../../assets/Index";
const NotFoundPage = () => {
  return (
    <div className={style.mainDiv}>
    <div className={style.pageNotfound}>
      <img src={notFoundImage} />
      <p style={{ textAlign: "center" }}>
        <Link to="/userinterface">Go to Home </Link>
      </p>
    </div>
    </div>
  );
};
export default NotFoundPage;
