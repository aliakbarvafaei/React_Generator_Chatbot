import React from 'react';
import { KdpaGrid, KdImageBox, Link, KdpaPrimaryButton, KdTypography } from 'your-component-library';
import { MdOutlineShoppingCart, MdInfoOutline, MdContactMail } from 'react-icons/md';

const Header = () => {
    return (
        <KdpaGrid container>
            {/* Right Side: Logo and Title */}
            <KdpaGrid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <KdImageBox src="/path/to/logo.png" alt="لوگو" title="لوگوی سایت" quality="HIGH" loading="lazy" />
                <KdTypography variant="h6" title="عنوان سایت" style={{ marginRight: '10px' }}>
                    عنوان سایت
                </KdTypography>
            </KdpaGrid>

            {/* Left Side: Links and Login Button */}
            <KdpaGrid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Link href="/shop" title="فروشگاه" style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                    <MdOutlineShoppingCart size={24} color="#000" />
                    <KdTypography variant="body1" title="فروشگاه" style={{ marginLeft: '5px' }}>
                        فروشگاه
                    </KdTypography>
                </Link>
                <Link href="/about" title="درباره ما" style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                    <MdInfoOutline size={24} color="#000" />
                    <KdTypography variant="body1" title="درباره ما" style={{ marginLeft: '5px' }}>
                        درباره ما
                    </KdTypography>
                </Link>
                <Link href="/contact" title="تماس با ما" style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                    <MdContactMail size={24} color="#000" />
                    <KdTypography variant="body1" title="تماس با ما" style={{ marginLeft: '5px' }}>
                        تماس با ما
                    </KdTypography>
                </Link>
                <KdpaPrimaryButton variant="contained" title="ورود" style={{ marginLeft: '20px' }}>
                    ورود
                </KdpaPrimaryButton>
            </KdpaGrid>
        </KdpaGrid>
    );
};

export default Header;