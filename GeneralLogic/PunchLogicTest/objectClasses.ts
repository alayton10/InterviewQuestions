export interface JobMeta {
    job: string;
    rate: number;
    benefitsRate: number;
  }
  
export interface TimePunch {
    job: string;
    start: string;
    end: string;   
  }
  
export interface Employee {
    employee: string;
    timePunch: TimePunch[];
  }
  
export interface Data {
    jobMeta: JobMeta[];
    employeeData: Employee[];
  }
  
  