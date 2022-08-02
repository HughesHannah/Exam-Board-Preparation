function percentageToPoint(percentage) {
  const points = [
    { minValue: 95, point: "1" },
    { minValue: 70, point: "2" },
    { minValue: 40, point: "3" },
    { minValue: 0, point: "4" },
  ];

  for (const point of points) {
    if (percentage >= point.minValue) {
      return point.point;
    }
  }
}

function percentageToBand(percentage) {
  const bands = [
    { minValue: 95, band: "great" },
    { minValue: 70, band: "ok" },
    { minValue: 40, band: "poor" },
    { minValue: 0, band: "terrible" },
  ];

  for (const band of bands) {
    if (percentage >= band.minValue) {
      return band.band;
    }
  }
}

export function renderGrade(percentage, gradeState) {
  if (gradeState == "band") {
    return percentageToBand(percentage);
  }
  if (gradeState == "point") {
    return percentageToPoint(percentage);
  }
  return percentage;
}
