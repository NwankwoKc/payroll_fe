import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Dashboard } from './dashboard/dashboard';
import { Createuser } from './createuser/createuser';
import { Departments } from './departments/departments';
import { Attendance } from './attendance/attendance';
import { Payslip } from './payslip/payslip';
import { Employees } from './employees/employees';
import { Payslips } from './payslips/payslips';
import { Paysalary } from './paysalary/paysalary';
import { Employeereciept } from './employeereciept/employeereciept';

export const routes: Routes = [
    {path:'login',component:Login},
    {path:'profile',component:Profile},
    {path:'profile/:id',component:Profile},
    {path:'dashboard',component:Dashboard},
    {path:'signup',component:Createuser},
    {path:'departments',component:Departments},
    {path:'attendance',component:Attendance},
    {path:'payslip/:id',component:Payslip},
    {path:'payslips',component:Payslips},
    {path:'employees',component:Employees},
    {path:'payslips',component:Payslips},
    {path:'paysalary',component:Paysalary},
    {path:'employeereciept',component:Employeereciept},
    {path:'**',component:Login}
];