import React, { useState } from 'react';
import { MdOutlineHome, MdOutlineInfo, MdOutlineContactMail } from 'react-icons/md';

const Header = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <KdpaGrid container style={{ backgroundColor: '#f5f5f5', padding: '10px 20px', alignItems: 'center' }}>
      <KdpaGrid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
        <KdImageBox
          src={props.logoSrc}
          alt="Website Logo"
          title="Website Logo"
          quality="HIGH"
          loading="lazy"
          style={{ width: '50px', height: '50px', marginRight: '10px' }}
        />
        <KdTypography variant="h5" title="Website Title" data={props.title} />
      </KdpaGrid>

      <KdpaGrid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Link
          href="/shop"
          title="Shop Page"
          target="default"
          style={{ display: 'flex', alignItems: 'center', marginRight: '15px', textDecoration: 'none', color: '#000' }}
        >
          <MdOutlineHome size={20} color="#000" title="Shop Icon" style={{ marginRight: '5px' }} />
          <KdTypography variant="body1" title="Shop" data="Shop" />
        </Link>
        <Link
          href="/about"
          title="About Us Page"
          target="default"
          style={{ display: 'flex', alignItems: 'center', marginRight: '15px', textDecoration: 'none', color: '#000' }}
        >
          <MdOutlineInfo size={20} color="#000" title="About Us Icon" style={{ marginRight: '5px' }} />
          <KdTypography variant="body1" title="About Us" data="About Us" />
        </Link>
        <Link
          href="/contact"
          title="Contact Us Page"
          target="default"
          style={{ display: 'flex', alignItems: 'center', marginRight: '15px', textDecoration: 'none', color: '#000' }}
        >
          <MdOutlineContactMail size={20} color="#000" title="Contact Us Icon" style={{ marginRight: '5px' }} />
          <KdTypography variant="body1" title="Contact Us" data="Contact Us" />
        </Link>

        <KdpaPrimaryButton
          variant="contained"
          title={isLoggedIn ? 'Logout' : 'Login'}
          onClick={toggleLogin}
          style={{ backgroundColor: '#007bff', color: '#fff' }}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </KdpaPrimaryButton>
      </KdpaGrid>
    </KdpaGrid>
  );
};

export default Header;