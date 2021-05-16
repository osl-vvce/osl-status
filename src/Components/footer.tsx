import React from "react"
import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineGithub,
  AiOutlineTwitter,
  AiFillLinkedin,
} from "react-icons/ai"

const Footer: React.FC = () => {
  return (
    <footer className="bg-bg flex flex-col justify-center items-center">
      <h1 className="mt-2 text-xl text-primary">
        {"Copyright © "}
        <a color="inherit" href="https://osl.vvce.ac.in">
          OSL VVCE
        </a>{" "}
        {new Date().getFullYear()}
      </h1>
      <div className="flex mt-1 mb-4 text-primary">
        <a href="https://www.facebook.com/oslvvce">
          <AiFillFacebook className="h-6 w-6 m-1" />
        </a>
        <a href="https://www.instagram.com/osl_vvce">
          <AiFillInstagram className="h-6 w-6 m-1" />
        </a>
        <a href="https://github.com/osl-vvce">
          <AiOutlineGithub className="h-6 w-6 m-1" />
        </a>
        <a href="https://twitter.com/osl_vvce">
          <AiOutlineTwitter className="h-6 w-6 m-1" />
        </a>
        <a href="https://www.linkedin.com/company/osl-vvce">
          <AiFillLinkedin className="h-6 w-6 m-1" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
