import React from 'react';
import { KdImageBox, KdTypography, KdpaGrid, KdpaPrimaryButton, KdHyperLink, KdIcon } from 'your-component-library';

const Header = ({ logoSrc, websiteTitle, navLinks, loginText }) => {
    return (
        <KdpaGrid container alignItems="center" justifyContent="space-between" style={{ padding: '10px', direction: 'rtl' }}>
            <KdpaGrid item xs={6} container alignItems="center">
                <KdImageBox src={logoSrc} alt="لوگو" quality="HIGH" loading="lazy" style={{ width: '50px', height: '50px' }} />
                <KdTypography variant="h4" title={websiteTitle} style={{ marginRight: '10px' }}>
                    {websiteTitle}
                </KdTypography>
            </KdpaGrid>
            <KdpaGrid item xs={6} container justifyContent="flex-end" alignItems="center">
                {navLinks.map((link, index) => (
                    <KdHyperLink key={index} href={link.href} title={link.title} style={{ margin: '0 10px' }}>
                        <KdIcon title={link.iconTitle} size={20} />
                        <KdTypography variant="body1">{link.text}</KdTypography>
                    </KdHyperLink>
                ))}
                <KdpaPrimaryButton variant="contained" title={loginText} style={{ marginLeft: '10px' }}>
                    {loginText}
                </KdpaPrimaryButton>
            </KdpaGrid>
        </KdpaGrid>
    );
};

export default Header;