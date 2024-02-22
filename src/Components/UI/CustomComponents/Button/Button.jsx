import style from "./Button.module.scss";
import PropTypes from 'prop-types';

const Button = ({ text }) => {
  return <button className={style.whiteBtn}>{text}</button>;
};

Button.PropTypes = {
  text:PropTypes.string.isRequired
}

export default Button;


