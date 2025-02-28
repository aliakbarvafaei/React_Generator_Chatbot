import React from 'react';
import { KdImageBox } from 'your-image-box-library'; // Adjust the import based on your project structure
import { Link } from 'your-hyperlink-library'; // Adjust the import based on your project structure
import { MdOutlineHomeIcon, FiInfo, FiMail } from 'react-icons'; // Import your desired icons
import { KdpaPrimaryButton } from 'your-button-library'; // Adjust the import based on your project structure
import { KdTypography } from 'your-typography-library'; // Adjust the import based on your project structure

const Header = ({ logoSrc, logoAlt, shopLink, aboutLink, contactLink }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f8f9fa' }}>
      {/* Left Side: Links with Icons */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link href={shopLink} title="Shop">
          <MdOutlineHomeIcon />
          <KdTypography variant="body1" data="Link to Shop Page" />
        </Link>
        <Link href={aboutLink} title="About Us" style={{ marginLeft: '20px' }}>
          <FiInfo />
          <KdTypography variant="body1" data="Link to About Us Page" />
        </Link>
        <Link href={contactLink} title="Contact Us" style={{ marginLeft: '20px' }}>
          <FiMail />
          <KdTypography variant="body1" data="Link to Contact Us Page" />
        </Link>
        <KdpaPrimaryButton variant="contained" title="Login" style={{ marginLeft: '20px' }}>
          Login
        </KdpaPrimaryButton>
      </div>

      {/* Right Side: Logo and Title */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <KdImageBox 
          src={logoSrc} 
          alt={logoAlt} 
          title="Website Logo" 
          quality="HIGH" 
          loading="lazy" 
        />
        <KdTypography variant="h4" data="Website Title" style={{ marginLeft: '10px' }} />
      </div>
    </div>
  );
};

export default Header;