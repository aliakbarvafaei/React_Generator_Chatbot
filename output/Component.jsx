import React from 'react';
import { KdImageBox, Link, KdpaIconButton, KdpaGrid } from 'your-component-library'; // Adjust the import based on your component library

const Header = ({ logoSrc, logoAlt, title }) => {
  return (
    <KdpaGrid container>
      {/* Left Side: Navigation Links */}
      <KdpaGrid item xs={8}>
        <KdpaGrid container spacing={2}>
          <KdpaGrid item>
            <Link href="/shop" title="Shop">
              <KdpaIconButton icon={<MdOutlineHomeIcon />} title="Shop" />
              Shop
            </Link>
          </KdpaGrid>
          <KdpaGrid item>
            <Link href="/about" title="About Us">
              <KdpaIconButton icon={<MdOutlineInfoIcon />} title="About Us" />
              About Us
            </Link>
          </KdpaGrid>
          <KdpaGrid item>
            <Link href="/contact" title="Contact Us">
              <KdpaIconButton icon={<MdOutlineContactMailIcon />} title="Contact Us" />
              Contact Us
            </Link>
          </KdpaGrid>
          <KdpaGrid item>
            <Link href="/login" title="Login">
              <KdpaIconButton icon={<MdOutlineLoginIcon />} title="Login" />
              Login
            </Link>
          </KdpaGrid>
        </KdpaGrid>
      </KdpaGrid>

      {/* Right Side: Logo and Title */}
      <KdpaGrid item xs={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <KdImageBox src={logoSrc} alt={logoAlt} title={title} />
        <h1 style={{ marginLeft: '10px' }}>{title}</h1>
      </KdpaGrid>
    </KdpaGrid>
  );
};

export default Header;