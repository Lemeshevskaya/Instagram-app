import React from 'react'
//import "./footer.css";
export default function Footer() {
  return (
    <div className="">
    <footer className="footer bg-light text-black mt-5 p-4 text-center fixed-bottom">
    Copyright &copy; {new Date().getFullYear()} Instagram
  </footer>
  </div>
  )
}