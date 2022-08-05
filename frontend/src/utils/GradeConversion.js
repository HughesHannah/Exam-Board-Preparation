import { ContactsOutlined } from "@material-ui/icons";

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

const broadBands = [
  { minValue: 70, band: "A" },
  { minValue: 60, band: "B" },
  { minValue: 50, band: "C" },
  { minValue: 40, band: "D" },
  { minValue: 0, band: "Fail" },
];

function percentageToBroadBand(percentage) {
  for (const broadBand of broadBands) {
    if (percentage >= broadBand.minValue) {
      return broadBand.band;
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

function sumArray(array) {
  let sum = 0;
  array.forEach((val) => (sum = sum + val));
  return sum.toFixed(2);
}

export function getWeightedGradeFromWorks(studentWorks) {
  let weightedCourseMarks = {};

  studentWorks.forEach(
    (work) => (weightedCourseMarks[work.course.className] = [])
  );
  studentWorks.forEach((work) =>
    weightedCourseMarks[work.course.className].push(
      (work.gradeMark * work.weighting) / 100
    )
  );

  let percentagesByCourse = {};

  Object.entries(weightedCourseMarks).forEach((entry) => {
    const [key, value] = entry;
    percentagesByCourse[key] = sumArray(value);
  });

  let creditsByCourse = {};
  studentWorks.forEach(
    (work) => (creditsByCourse[work.course.className] = work.course.credits)
  );

  let numCredits = 0;
  Object.values(creditsByCourse).forEach((val) => (numCredits += val));

  let totalWeighted = 0;
  Object.entries(percentagesByCourse).forEach((entry) => {
    const [courseName, percentage] = entry;
    totalWeighted += percentage * creditsByCourse[courseName];
  });

  return totalWeighted / numCredits;
}

export function creditsAtBands(studentWorks) {
  // get weighted course marks
  let weightedCourseMarks = {};
  studentWorks.forEach(
    (work) => (weightedCourseMarks[work.course.className] = [])
  );
  studentWorks.forEach((work) =>
    weightedCourseMarks[work.course.className].push(
      (work.gradeMark * work.weighting) / 100
    )
  );

  // get overall marks per course
  let bandsByCourse = {};

  Object.entries(weightedCourseMarks).forEach((entry) => {
    const [key, value] = entry;
    bandsByCourse[key] = percentageToBroadBand(parseFloat(sumArray(value)));
  });

  // Get credits by course.
  let creditsByCourse = {};
  studentWorks.forEach(
    (work) => (creditsByCourse[work.course.className] = work.course.credits)
  );

  let bands = {
    "A": 0,
    "B": 0,
    "C": 0,
    "D": 0,
    "Fail": 0
  }

  // for each course in bands by course
  Object.entries(bandsByCourse).forEach((entry) => {
    const [course, band] = entry;
    bands[band] += creditsByCourse[course]
  })
  return bands
}

export function countBands(studentsAndWorks) {
  let bands = {
    "A": 0,
    "B": 0,
    "C": 0,
    "D": 0,
    "Fail": 0
  }

  //for each student
  studentsAndWorks.forEach((student) => {
    // calculate final grade = sum(mark*weighting*coursecredits)/totalcredits
    let totalGrade = 0;
    student.work_student.forEach((work) => {
      totalGrade += work.gradeMark*work.weighting*work.course.credits/100;
    })
    totalGrade = totalGrade/120;
    
    // get band for final grade
    let studentBand = percentageToBroadBand(totalGrade);
    // add that band to a count 
    bands[studentBand] += 1
  })
  
  let returnArray = [];

  Object.entries(bands).forEach((entry) => {
    const [grade, number] = entry;
    returnArray.push({name: "Band "+ grade, value: number })
  });

  return returnArray;
}
