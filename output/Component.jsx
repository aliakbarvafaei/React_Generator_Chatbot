<KdpaGrid container>
    <KdpaGrid item xs={12}>
        <KdpaGrid container justifyContent="space-between" alignItems="center">
            {/* Right Side: Logo and Title */}
            <KdpaGrid item>
                <KdImageBox
                    src={logoSrc}
                    alt={logoAlt}
                    title={logoTitle}
                    quality="HIGH"
                    loading="lazy"
                />
                <KdTypography variant="h6" title={logoTitle} />
            </KdpaGrid>

            {/* Left Side: Links and Login Button */}
            <KdpaGrid item>
                <KdpaGrid container spacing={2}>
                    <KdpaGrid item>
                        <Link href={shopLink} target="_blank" title="فروشگاه">
                            <MdOutlineShopIcon color="black" size={24} />
                            <KdTypography variant="body1" title="فروشگاه" />
                        </Link>
                    </KdpaGrid>
                    <KdpaGrid item>
                        <Link href={aboutLink} target="_blank" title="درباره ما">
                            <MdOutlineInfoIcon color="black" size={24} />
                            <KdTypography variant="body1" title="درباره ما" />
                        </Link>
                    </KdpaGrid>
                    <KdpaGrid item>
                        <Link href={contactLink} target="_blank" title="تماس با ما">
                            <MdOutlineContactMailIcon color="black" size={24} />
                            <KdTypography variant="body1" title="تماس با ما" />
                        </Link>
                    </KdpaGrid>
                    <KdpaGrid item>
                        <KdpaPrimaryButton variant="contained" title={loginTitle}>
                            {loginTitle}
                        </KdpaPrimaryButton>
                    </KdpaGrid>
                </KdpaGrid>
            </KdpaGrid>
        </KdpaGrid>
    </KdpaGrid>
</KdpaGrid>