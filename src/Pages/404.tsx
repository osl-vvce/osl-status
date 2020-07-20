import React from "react"
import shuttle from "../Assets/shuttle.png"

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen-90">
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <span className="text-primary text-8xl lg:text-24xl">4</span>
        <img
          className="h-32 lg:h-64 lg:w-64 lg:mx-12"
          src={shuttle}
          alt="shuttle"
        />
        <span className="text-primary text-8xl lg:text-24xl">4</span>
      </div>
      <p className="bottom-text text-lg text-primary">
        This page doesn't exist.
      </p>
    </div>
  )
}

export default NotFoundPage
