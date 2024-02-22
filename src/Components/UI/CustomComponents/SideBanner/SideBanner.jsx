import React from 'react'
import style from './SideBanner.module.scss'
import Button from '../Button/Button'

const SideBanner = () => {
  return (
    <div className={style.mainContainer}>
        <div className={style.container}>
            <h1>New here</h1>
            <p>Sign up and discover a great amount of new opportunities</p>
     <Button text={"Sign up"} />
        </div>
    </div>
  )
}

export default SideBanner