import { jsonData } from "./data";
import { Employee } from "./objectClasses";

function calculateTimeDifference(start: string, end: string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  // Calculate the difference in milliseconds
  const differenceInMillis = endDate.getTime() - startDate.getTime();
  // Return the difference in milliseconds
  return differenceInMillis;
}

//Calculate Mike Wage total. 
let mikeEmployee: Employee = jsonData.employeeData[0];
let mikePayCheck: number = 0;
let mikeOverTime = 0;
let mikeDoubleOverTime = 0;
let mikeBenefitTotal = 0;

let mikeTotalHours = 0;
let mikeRegularHours = 0;

for (let i = 0; i < mikeEmployee.timePunch.length; i++) {
  const timeDiffInMillis = calculateTimeDifference(mikeEmployee.timePunch[i].start, mikeEmployee.timePunch[i].end);
  const timeDiffInHours = timeDiffInMillis / (1000 * 60 * 60);
  mikeTotalHours += timeDiffInHours;

  let jobMetaIndex = -1;
  if (mikeEmployee.timePunch[i].job === "Shop - Laborer") {
      jobMetaIndex = 2;
  } else if (mikeEmployee.timePunch[i].job === "Hospital - Laborer") {
      jobMetaIndex = 1;
  } else if (mikeEmployee.timePunch[i].job === "Hospital - Painter") {
      jobMetaIndex = 0;
  }

  const jobMeta = jsonData.jobMeta[jobMetaIndex];
  const currentShiftHour = timeDiffInHours;

  if (mikeRegularHours < 40) {
      if (mikeRegularHours + currentShiftHour <= 40) {
          // All hours are regular
          mikeRegularHours += currentShiftHour;
          mikeBenefitTotal += currentShiftHour * jobMeta.benefitsRate;
          mikePayCheck += currentShiftHour * jobMeta.rate;
      } else {
          // Part of the hours are regular, the rest are overtime
          const regularRemaining = 40 - mikeRegularHours;
          mikeRegularHours += regularRemaining;
          mikeBenefitTotal += regularRemaining * jobMeta.benefitsRate;
          mikePayCheck += regularRemaining * jobMeta.rate;

          const overtimeHours = currentShiftHour - regularRemaining;
          mikeOverTime += overtimeHours;
          mikeBenefitTotal += overtimeHours * jobMeta.benefitsRate;
          mikePayCheck += overtimeHours * jobMeta.rate * 1.5;
      }
  } else if (mikeTotalHours <= 48) {
      // All current shift hours are overtime
      const overtimeHours = currentShiftHour;
      mikeOverTime += overtimeHours;
      mikeBenefitTotal += overtimeHours * jobMeta.benefitsRate;
      mikePayCheck += overtimeHours * jobMeta.rate * 1.5;
  } else {
      // Hours after 48 are double-time
      const hoursBetween40And48 = mikeTotalHours - 40;
      const hoursBeyond48 = mikeTotalHours - 48;

      if (hoursBetween40And48 > 0) {
          // Calculate overtime between 40 and 48 hours
          mikeOverTime += hoursBetween40And48;
          mikeBenefitTotal += hoursBetween40And48 * jobMeta.benefitsRate;
          mikePayCheck += hoursBetween40And48 * jobMeta.rate * 1.5;
      }

      // Calculate double-time hours
      mikeDoubleOverTime += hoursBeyond48;
      mikeBenefitTotal += hoursBeyond48 * jobMeta.benefitsRate;
      mikePayCheck += hoursBeyond48 * jobMeta.rate * 2;
  }
}

console.log({
  employee: "Mike",
  regular: mikeRegularHours.toFixed(4),
  overtime: mikeOverTime.toFixed(4),
  doubletime: mikeDoubleOverTime.toFixed(4),
  wageTotal: mikePayCheck.toFixed(4),
  benefitTotal: mikeBenefitTotal.toFixed(4),
});

let steveEmployee: Employee = jsonData.employeeData[1]; // Adjust index if needed
let stevePayCheck: number = 0;
let steveOverTime = 0;
let steveDoubleOverTime = 0;
let steveBenefitTotal = 0;
let steveTotalHours = 0;
let steveRegularHours = 0;

for (let i = 0; i < steveEmployee.timePunch.length; i++) {
  const timeDiffInMillis = calculateTimeDifference(steveEmployee.timePunch[i].start, steveEmployee.timePunch[i].end);
  const timeDiffInHours = timeDiffInMillis / (1000 * 60 * 60);
  steveTotalHours += timeDiffInHours;

  // Determine job meta index based on job type
  let jobMetaIndex = -1;
  if (steveEmployee.timePunch[i].job === "Shop - Laborer") {
      jobMetaIndex = 2;
  } else if (steveEmployee.timePunch[i].job === "Hospital - Laborer") {
      jobMetaIndex = 1;
  } else if (steveEmployee.timePunch[i].job === "Hospital - Painter") {
      jobMetaIndex = 0;
  }

  const jobMeta = jsonData.jobMeta[jobMetaIndex];
  const currentShiftHour = timeDiffInHours;

  if (steveRegularHours < 40) {
      if (steveRegularHours + currentShiftHour <= 40) {
          // All hours are regular
          steveRegularHours += currentShiftHour;
          steveBenefitTotal += currentShiftHour * jobMeta.benefitsRate;
          stevePayCheck += currentShiftHour * jobMeta.rate;
      } else {
          // Part of the hours are regular, the rest are overtime
          const regularRemaining = 40 - steveRegularHours;
          steveRegularHours += regularRemaining;
          steveBenefitTotal += regularRemaining * jobMeta.benefitsRate;
          stevePayCheck += regularRemaining * jobMeta.rate;

          const overtimeHours = currentShiftHour - regularRemaining;
          steveOverTime += Math.min(overtimeHours, 8);
          steveBenefitTotal += Math.min(overtimeHours, 8) * jobMeta.benefitsRate;
          stevePayCheck += Math.min(overtimeHours, 8) * jobMeta.rate * 1.5;
      }
  } else if (steveTotalHours <= 48) {
      // All current shift hours are overtime
      const overtimeHours = Math.min(currentShiftHour, 8 - steveOverTime);
      steveOverTime += overtimeHours;
      steveBenefitTotal += overtimeHours * jobMeta.benefitsRate;
      stevePayCheck += overtimeHours * jobMeta.rate * 1.5;
  } else {
      // Hours after 48 are double-time
      const overtimeHours = Math.min(steveTotalHours - 40, 8 - steveOverTime);
      steveOverTime += overtimeHours;
      steveBenefitTotal += overtimeHours * jobMeta.benefitsRate;
      stevePayCheck += overtimeHours * jobMeta.rate * 1.5;

      const doubleOvertimeHours = steveTotalHours - 48;
      steveDoubleOverTime += doubleOvertimeHours;
      steveBenefitTotal += doubleOvertimeHours * jobMeta.benefitsRate;
      stevePayCheck += doubleOvertimeHours * jobMeta.rate * 2;
  }
}

console.log({
  employee: "Steve",
  regular: steveRegularHours.toFixed(4),
  overtime: steveOverTime.toFixed(4),
  doubletime: steveDoubleOverTime.toFixed(4),
  wageTotal: stevePayCheck.toFixed(4),
  benefitTotal: steveBenefitTotal.toFixed(4),
});



let alexEmployee: Employee = jsonData.employeeData[2];
let alexPayCheck: number = 0;
let alexOverTime = 0;
let alexDoubleOverTime = 0;
let alexBenefitTotal = 0;
let alexTotalHours = 0;
let alexRegularHours = 0;

for (let i = 0; i < alexEmployee.timePunch.length; i++) {
  const timeDiffInMillis = calculateTimeDifference(alexEmployee.timePunch[i].start, alexEmployee.timePunch[i].end);
  const timeDiffInHours = timeDiffInMillis / (1000 * 60 * 60);
  alexTotalHours += timeDiffInHours;

  // Determine job meta index based on job type
  let jobMetaIndex = -1;
  if (alexEmployee.timePunch[i].job === "Shop - Laborer") {
      jobMetaIndex = 2;
  } else if (alexEmployee.timePunch[i].job === "Hospital - Laborer") {
      jobMetaIndex = 1;
  } else if (alexEmployee.timePunch[i].job === "Hospital - Painter") {
      jobMetaIndex = 0;
  }

  

  const jobMeta = jsonData.jobMeta[jobMetaIndex];
  const currentShiftHour = timeDiffInHours;

  if (alexRegularHours < 40) {
      if (alexRegularHours + currentShiftHour <= 40) {
          alexRegularHours += currentShiftHour;
          alexBenefitTotal += currentShiftHour * jobMeta.benefitsRate;
          alexPayCheck += currentShiftHour * jobMeta.rate;
      } else {
          
          const regularRemaining = 40 - alexRegularHours;
          alexRegularHours += regularRemaining;
          alexBenefitTotal += regularRemaining * jobMeta.benefitsRate;
          alexPayCheck += regularRemaining * jobMeta.rate;

          const overtimeHours = currentShiftHour - regularRemaining;
          alexOverTime += overtimeHours;
          alexBenefitTotal += overtimeHours * jobMeta.benefitsRate;
          alexPayCheck += overtimeHours * jobMeta.rate * 1.5;
      }
  } else if (alexTotalHours <= 48) {
      
      const overtimeHours = currentShiftHour;
      alexOverTime += overtimeHours;
      alexBenefitTotal += overtimeHours * jobMeta.benefitsRate;
      alexPayCheck += overtimeHours * jobMeta.rate * 1.5;
  } else {
      // Hours after 48 are double-time
      const hoursBeyond48 = alexTotalHours - 48;
      const hoursBetween40And48 = alexTotalHours - alexRegularHours - alexOverTime;

      if (hoursBetween40And48 > 0) {
          // Calculate overtime between 40 and 48 hours
          alexOverTime += hoursBetween40And48;
          alexBenefitTotal += hoursBetween40And48 * jobMeta.benefitsRate;
          alexPayCheck += hoursBetween40And48 * jobMeta.rate * 1.5;
      }

      // Calculate double-time hours
      alexDoubleOverTime += hoursBeyond48;
      alexBenefitTotal += hoursBeyond48 * jobMeta.benefitsRate;
      alexPayCheck += hoursBeyond48 * jobMeta.rate * 2;
  }
}

console.log({
  employee: "Alex",
  regular: alexRegularHours.toFixed(4),
  overtime: alexOverTime.toFixed(4),
  doubletime: alexDoubleOverTime.toFixed(4),
  wageTotal: alexPayCheck.toFixed(4),
  benefitTotal: alexBenefitTotal.toFixed(4),
});


/*
  ----- Output -----
  {
  employee: 'Mike',
  regular: '39.2856',
  overtime: '0.0000',
  doubletime: '0.0000',
  wageTotal: '1056.4017',
  benefitTotal: '36.8320'
}
{
  employee: 'Steve',
  regular: '40.0000',
  overtime: '8.0000',
  doubletime: '1.1658',
  wageTotal: '1653.5979',
  benefitTotal: '49.9036'
}
{
  employee: 'Alex',
  regular: '40.0000',
  overtime: '3.6428',
  doubletime: '0.0000',
  wageTotal: '795.3979',
  benefitTotal: '44.5985'
}

*/