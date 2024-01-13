/// <reference types="vite-plugin-svgr/client" />
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import HomeIcon from "../assets/home.svg?react";
import ProfileIcon from "../assets/profile.svg?react";
import LogoutIcon from "../assets/log-out.svg?react";

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
  height: 100vh;
  padding: 50px 0px;
  width: 100%;
  max-width: 860px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  svg {
    width: 30px;
    fill: white;
  }
  &.log-out {
    border-color: tomato;
    svg {
      fill: tomato;
    }
  }
`;

export default function Layout() {
  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = window.confirm("Are you sure you want to log out?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };
  return (
    <Wrapper>
      <Menu>
        <Link to="/">
          <MenuItem>
            <HomeIcon />
          </MenuItem>
        </Link>
        <Link to="/profile">
          <MenuItem>
            <ProfileIcon />
          </MenuItem>
        </Link>
        <Link to="/profile">
          <MenuItem onClick={onLogOut} className="log-out">
            <LogoutIcon />
          </MenuItem>
        </Link>
      </Menu>
      <Outlet />
    </Wrapper>
  );
}
