"use client";
import React from 'react';

import "./Sidebar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineHome } from "react-icons/ai";
import { MdMeetingRoom } from "react-icons/md";

// src/components/Sidebar.jsx


import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Sidebar.css";

const Sidebar = () => {
  const pathname = usePathname(); // sabe qué ruta está activa

  const links = [
    { href: "/dashboard",    label: "Inicio",       icon: <AiOutlineHome className="icon" /> },
    { href: "/huespedes",    label: "Huespedes",    icon: null },
    { href: "/reservas",     label: "Reservas",     icon: null },
    { href: "/tienda",       label: "Tienda",       icon: null },
    { href: "/habitaciones", label: "Habitaciones", icon: <MdMeetingRoom className="icon" /> },
  ];

  return (
    <aside className="sidebar">
      <div>
        <RxHamburgerMenu className="icon hamburger" />
      </div>
      <div className="menu-container">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`menu-item ${pathname === link.href ? "activo" : ""}`}
          >
            <span>{link.label}</span>
            {link.icon}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;