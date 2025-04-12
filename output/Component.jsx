import React from 'react';
import { KdpaGrid, KdImageBox, KdTypography, Link, KdpaPrimaryButton } from 'your-component-library';
import { MdShoppingCart, MdInfo, MdContactMail } from 'react-icons/md';

const Header = () => {
  return (
    <KdpaGrid container>
      <KdpaGrid item xs={12} sm={6} md={4} lg={3}>
        <KdImageBox
          src="logo.png"
          alt="لوگوی وب‌سایت"
          title="لوگوی وب‌سایت"
          quality="HIGH"
          loading="lazy"
        />
        <KdTypography variant="h5" title="عنوان وب‌سایت" />
      </KdpaGrid>
      <KdpaGrid item xs={12} sm={6} md={8} lg={9}>
        <KdpaGrid container justifyContent="flex-end" alignItems="center">
          <KdpaGrid item>
            <Link href="/shop" title="صفحه خرید">
              <MdShoppingCart size={24} />
              <KdTypography variant="body1" title="خرید" />
            </Link>
          </KdpaGrid>
          <KdpaGrid item>
            <Link href="/about" title="درباره ما">
              <MdInfo size={24} />
              <KdTypography variant="body1" title="درباره ما" />
            </Link>
          </KdpaGrid>
          <KdpaGrid item>
            <Link href="/contact" title="تماس با ما">
              <MdContactMail size={24} />
              <KdTypography variant="body1" title="تماس با ما" />
            </Link>
          </KdpaGrid>
          <KdpaGrid item>
            <KdpaPrimaryButton variant="contained" title="ورود">
              ورود
            </KdpaPrimaryButton>
          </KdpaGrid>
        </KdpaGrid>
      </KdpaGrid>
    </KdpaGrid>
  );
};

export default Header;