import { GenerateDataChart2D } from "./KdChart2DHelper";
import KdChart, { KdChartProps } from "../KdChart/KdChart";

export type KdChart2DProps = KdChartProps & {
  data?: { [key: string]: unknown }[];
  groupBy?: string;
  valueBy?: string;
};

const KdChart2D = ({
  data = [],
  groupBy = "",
  valueBy = "",
  ...props
}: KdChart2DProps) => {
  const { series, uniqueCategoryArray } = GenerateDataChart2D(
    data,
    groupBy,
    valueBy
  );
  return (
    <KdChart
      noDataText={data.length === 0 ? "بدون داده" : "داده های شما سازگار نیست"}
      series={series}
      labels={(uniqueCategoryArray as string[]) ?? []}
      {...props}
    />
  );
};

export default KdChart2D;
