import React from "react"
import { Link } from "react-router-dom"
import shuttle from "../assets/shuttle.png"

const NotFoundPage = () => {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <span className="text-primary text-[16rem]">4</span>
        <img className="h-64 lg:w-64 lg:mx-12" src={shuttle} alt="shuttle" />
        <span className="text-primary text-[16rem]">4</span>
      </div>
      <p className="bottom-text text-3xl text-primary">
        This page doesn't exist. Go back{" "}
        <Link className="text-blue-600" to="/">
          Home
        </Link>
      </p>
    </main>
  )
}

export default NotFoundPage
