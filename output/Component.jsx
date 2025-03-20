import React from 'react';
import { MdOutlineHome, MdOutlineInfo, MdOutlineContactMail } from 'react-icons/md';

const Header = (props) => {
  return (
    <KdpaGrid container>
      {/* Left Section */}
      <KdpaGrid item xs={9}>
        <KdpaGrid container>
          {/* Link to Shop Page */}
          <KdpaGrid item xs={2}>
            <Link href="/shop" title="Shop">
              <MdOutlineHome size={24} color="black" />
              <KdTypography variant="body1" title="Shop" />
            </Link>
          </KdpaGrid>

          {/* Link to About Us Page */}
          <KdpaGrid item xs={2}>
            <Link href="/about-us" title="About Us">
              <MdOutlineInfo size={24} color="black" />
              <KdTypography variant="body1" title="About Us" />
            </Link>
          </KdpaGrid>

          {/* Link to Contact Us Page */}
          <KdpaGrid item xs={2}>
            <Link href="/contact-us" title="Contact Us">
              <MdOutlineContactMail size={24} color="black" />
              <KdTypography variant="body1" title="Contact Us" />
            </Link>
          </KdpaGrid>

          {/* Login Button */}
          <KdpaGrid item xs={2}>
            <KdpaPrimaryButton variant="contained" title="Login">
              Login
            </KdpaPrimaryButton>
          </KdpaGrid>
        </KdpaGrid>
      </KdpaGrid>

      {/* Right Section */}
      <KdpaGrid item xs={3}>
        <KdImageBox
          src={props.logoSrc}
          title="Website Logo"
          alt="Website Logo"
          quality="HIGH"
          loading="lazy"
        />
        <KdTypography variant="h5" title={props.websiteTitle} />
      </KdpaGrid>
    </KdpaGrid>
  );
};

export default Header;