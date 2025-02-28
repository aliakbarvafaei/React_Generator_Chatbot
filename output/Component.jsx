const Header = ({ logoSrc, logoAlt, shopLink, aboutLink, contactLink }) => {
    return (
        <KdpaGrid container style={{ padding: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
            <KdpaGrid item xs={8} style={{ display: 'flex', alignItems: 'center' }}>
                <Link href={shopLink} title="Shop" target="_blank" style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
                    <MdOutlineHomeIcon size={24} />
                    <KdTypography variant="body1" style={{ marginLeft: '8px' }}>Link to Shop Page</KdTypography>
                </Link>
                <Link href={aboutLink} title="About Us" target="_blank" style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
                    <MdInfo size={24} />
                    <KdTypography variant="body1" style={{ marginLeft: '8px' }}>Link to About Us Page</KdTypography>
                </Link>
                <Link href={contactLink} title="Contact Us" target="_blank" style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
                    <MdContactMail size={24} />
                    <KdTypography variant="body1" style={{ marginLeft: '8px' }}>Link to Contact Us Page</KdTypography>
                </Link>
                <KdpaPrimaryButton variant="contained" title="Login" style={{ marginLeft: 'auto' }}>
                    Login
                </KdpaPrimaryButton>
            </KdpaGrid>
            <KdpaGrid item xs={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <KdImageBox 
                    src={logoSrc} 
                    alt={logoAlt} 
                    title="Website Logo" 
                    quality="HIGH" 
                    loading="lazy" 
                    style={{ width: '50px', height: '50px', marginRight: '8px' }} 
                />
                <KdTypography variant="h4">Website Title</KdTypography>
            </KdpaGrid>
        </KdpaGrid>
    );
};

export default Header;