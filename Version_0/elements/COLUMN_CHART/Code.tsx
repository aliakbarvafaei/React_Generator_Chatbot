import { GenerateDataChart3D } from "./KdChart3DHelper";
import KdChart, { KdChartProps } from "../KdChart/KdChart";

export type KdChart3DProps = KdChartProps & {
  data?: { [key: string]: unknown }[];
  groupBy?: string;
  seriesBy?: string;
  valueBy?: string;
};

const KdChart3D = ({
  data = [],
  groupBy = "",
  seriesBy = "",
  valueBy = "",
  ...props
}: KdChart3DProps) => {
  const { series, uniqueCategoryArray } = GenerateDataChart3D(
    data,
    groupBy,
    seriesBy,
    valueBy
  );
  return (
    <KdChart
      noDataText={data.length === 0 ? "بدون داده" : "داده های شما سازگار نیست"}
      labels={(uniqueCategoryArray as string[]) ?? []}
      series={series}
      {...props}
    />
  );
};

export default KdChart3D;
