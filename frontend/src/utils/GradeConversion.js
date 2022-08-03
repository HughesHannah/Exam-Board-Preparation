export const values = [
  { minValue: 91, maxValue: 100, point: "22", band: "A1" },
  { minValue: 84, maxValue: 91, point: "21", band: "A2" },
  { minValue: 78, maxValue: 84, point: "20", band: "A3" },
  { minValue: 73, maxValue: 78, point: "19", band: "A4" },
  { minValue: 70, maxValue: 73, point: "18", band: "A5" },
  { minValue: 67, maxValue: 70, point: "17", band: "B1" },
  { minValue: 63, maxValue: 67, point: "16", band: "B2" },
  { minValue: 60, maxValue: 63, point: "15", band: "B3" },
  { minValue: 57, maxValue: 60, point: "14", band: "C1" },
  { minValue: 53, maxValue: 57, point: "13", band: "C2" },
  { minValue: 50, maxValue: 53, point: "12", band: "C3" },
  { minValue: 47, maxValue: 50, point: "11", band: "D1" },
  { minValue: 43, maxValue: 47, point: "10", band: "D2" },
  { minValue: 40, maxValue: 43, point: "9", band: "D3" },
  { minValue: 37, maxValue: 40, point: "8", band: "E1" },
  { minValue: 33, maxValue: 37, point: "7", band: "E2" },
  { minValue: 30, maxValue: 33, point: "6", band: "E3" },
  { minValue: 27, maxValue: 30, point: "5", band: "F1" },
  { minValue: 23, maxValue: 27, point: "4", band: "F2" },
  { minValue: 20, maxValue: 23, point: "3", band: "F3" },
  { minValue: 15, maxValue: 20, point: "2", band: "G1" },
  { minValue: 10, maxValue: 15, point: "1", band: "G2" },
  { minValue: 0, maxValue: 10, point: "0", band: "H" },
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
