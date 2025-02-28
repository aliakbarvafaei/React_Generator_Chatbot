import { KdLoading } from "kdpa-components";

function Loading({ style, ...props }: any) {
  return <KdLoading sx={style} {...props} />;
}

export default Loading;
