const values = [
  { minValue: 91, point: "22", band: "A1" },
  { minValue: 84, point: "21", band: "A2" },
  { minValue: 78, point: "20", band: "A3" },
  { minValue: 73, point: "19", band: "A4" },
  { minValue: 70, point: "18", band: "A5" },
  { minValue: 67, point: "17", band: "B1" },
  { minValue: 63, point: "16", band: "B2" },
  { minValue: 60, point: "15", band: "B3" },
  { minValue: 57, point: "14", band: "C1" },
  { minValue: 53, point: "13", band: "C2" },
  { minValue: 50, point: "12", band: "C3" },
  { minValue: 47, point: "11", band: "D1" },
  { minValue: 43, point: "10", band: "D2" },
  { minValue: 40, point: "9", band: "D3" },
  { minValue: 37, point: "8", band: "E1" },
  { minValue: 33, point: "7", band: "E2" },
  { minValue: 30, point: "6", band: "E3" },
  { minValue: 27, point: "5", band: "F1" },
  { minValue: 23, point: "4", band: "F2" },
  { minValue: 20, point: "3", band: "F3" },
  { minValue: 15, point: "2", band: "G1" },
  { minValue: 10, point: "1", band: "G2" },
  { minValue: 0, point: "0", band: "H" },
];

const broadBands = [
  { minValue: 91, broadBand: "A" },
  { minValue: 91, broadBand: "B" },
  { minValue: 91, broadBand: "C" },
  { minValue: 91, broadBand: "D" },
  { minValue: 91, broadBand: "Fail" },
];

function percentageToPoint(percentage) {
  for (const value of values) {
    if (percentage >= value.minValue) {
      return value.point;
    }
  }
}

function percentageToBand(percentage) {
  for (const value of values) {
    if (percentage >= value.minValue) {
      return value.band;
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
  return percentage.toFixed(0);
}

export function countBands(dataItems) {
  let countA = 0;
  let countB = 0;
  let countC = 0;
  let countD = 0;
  let countFail = 0;

  for (dataItem in dataItems) {
    // find total
    let total;

    // calculate band
    for (const broadBand of broadBands) {
      if (total >= broadBand.minValue) {
        const band = broadBand.broadBand;
        if (band == "A") {
          countA += 1;
        } else if (band == "B") {
          countB += 1;
        } else if (band == "C") {
          countC += 1;
        } else if (band == "D") {
          countD += 1;
        } else {
          countFail += 1;
        }
      }
    }
  }

  return [
    { countA: countA },
    { countB: countB },
    { countC: countC },
    { countD: countD },
    { countFail: countFail },
  ];
}
