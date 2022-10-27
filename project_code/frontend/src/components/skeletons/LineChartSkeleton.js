import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./skeleton.scss";

export default function LineChartSkeleton() {
  return (
    <Skeleton animation="wave" variant="rectangular" width={430} height={225} className="LineChartSkeleton"/>
  );
}
