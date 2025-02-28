import React, { useEffect, useState } from "react";
import { BsImage } from "react-icons/bs";
import ModalImage, { ModalImageProps } from "react-modal-image";
import { KdpaMuiBadge } from "../../../components";

import { styled } from "@mui/system";
import ImageZoom from "./ImageZoom";

const StyledImage = styled("img")();
const StyledDiv = styled("div")();
const StyledModalImage = styled(ModalImage)();

//@ts-ignore
export interface KdImageBoxProps extends Partial<ModalImageProps> {
  src?: string | string[];
  basePath?: {
    basePathStream?: string;
    basePathThumbnail?: string;
  };
  modal?: boolean;

  zoomable?: boolean;
  quality?: "LOW" | "HIGH";
  sx?: any;
}

const KdImageBox = ({
  src,
  quality = "LOW",
  zoomable,
  loading = "lazy",
  ...props
}: KdImageBoxProps) => {
  const [srcItem, setSrcItem] = useState<string>();

  useEffect(() => {
    if (src === undefined) setSrcItem(undefined);
    else {
      if (Array.isArray(src)) setSrcItem(src[0]);
      else setSrcItem(src);
    }
  }, [src]);

  const BadgeWrapper = (props: any) => {
    if (Array.isArray(src))
      return (
        <KdpaMuiBadge
          overlap={"circular"}
          badgeContent={src.length}
          color={"primary"}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {props.children}
        </KdpaMuiBadge>
      );
    else return <>{props.children}</>;
  };

  const handleUrlImage = (size: "small" | "large"): string => {
    if (size === "small") {
      if (props.basePath?.basePathThumbnail)
        return props.basePath?.basePathThumbnail + srcItem;
      else return srcItem as string;
    } else {
      if (props.basePath?.basePathStream)
        return props.basePath?.basePathStream + srcItem;
      else return srcItem as string;
    }
  };

  return srcItem ? (
    <BadgeWrapper>
      {props.modal === true ? (
        <StyledModalImage
          {...props}
          loading={loading}
          small={handleUrlImage(quality === "HIGH" ? "large" : "small")}
          medium={handleUrlImage("large")}
          large={handleUrlImage("large")}
          hideZoom
        />
      ) : zoomable === true ? (
        <ImageZoom
          {...props}
          src={handleUrlImage(quality === "HIGH" ? "large" : "small")}
        />
      ) : (
        <StyledImage
          {...props}
          loading={loading}
          onError={(event) => {
            //@ts-ignore
            event.onerror = null;
            //@ts-ignore
            if ((event?.target?.src ?? "").endsWith(handleUrlImage("small")))
              return;
            //@ts-ignore
            event.target.src = handleUrlImage("small");
          }}
          src={handleUrlImage(quality === "HIGH" ? "large" : "small")}
        />
      )}
    </BadgeWrapper>
  ) : (
    <StyledDiv sx={{ ...props?.style, ...props?.sx }}>
      <BsImage style={{ color: "gray", height: "100%", width: "100%" }} />
    </StyledDiv>
  );
};

export default KdImageBox;
