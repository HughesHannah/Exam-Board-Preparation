import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./skeleton.scss";

export default function WidgetSkeleton() {
  return (
    <Skeleton animation="wave" variant="rectangular" width={250} height={100} className="WidgetSkeleton"/>
  );
}
