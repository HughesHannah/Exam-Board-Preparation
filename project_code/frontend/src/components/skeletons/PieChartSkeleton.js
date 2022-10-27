import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./skeleton.scss";

export default function PieChartSkeleton() {
  return (
    <div width={400} height={250} className="PieSkeleton">
      <Skeleton animation="wave" variant="circular" width={160} height={160} />
    </div>
  );
}
