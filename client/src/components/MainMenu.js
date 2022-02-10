import React, {useState} from 'react'
import { scaleRotate as Menu } from 'react-burger-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/fontawesome-free-solid'
import '../css/MainMenu.css'
import { Link } from "react-router-dom";

export default function MainMenu() {
    const[isOpen,setOpen]=useState(false);

  return (
    <Menu isOpen={isOpen} onOpen={()=>setOpen(true)} onClose={_=>setOpen(false)} >
            <Link id="home" className="bm-item" to="/home" onClick={()=>setOpen(false)}>
                <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                <span>Home</span>
            </Link>
    </Menu>
  )
}