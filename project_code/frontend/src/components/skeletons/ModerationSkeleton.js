import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function ModerationSkeleton() {
  return (
    <Skeleton animation="wave" variant="rectangular" width={500} height={150} className="ModerationSkeleton"/>
  );
}