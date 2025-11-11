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
import { Edit } from './profile/edit/edit';
import { EmployeeDashboard } from './employee-dashboard/employee-dashboard';
import { CreateDepartment } from './create.department/create.department';
import { Department } from './department/department';

export const routes: Routes = [
    {path:'login',component:Login},
    {path:'profile',component:Profile},
    {path:'profile/:id',component:Profile},
    {path:'profile-edit',component:Edit},
    {path:'dashboard',component:Dashboard},
    {path:'signup',component:Createuser},
    {path:'departments',component:Departments},
    {path:'department/:id',component:Department},
    {path:'departments/create',component:CreateDepartment},
    {path:'attendance',component:Attendance},
    {path:'payslip/:id',component:Payslip},
    {path:'payslips',component:Payslips},
    {path:'employees',component:Employees},
    {path:'paysalary',component:Paysalary},
    {path:'employeereciept',component:Employeereciept},
    {path:'employeedashboard',component:EmployeeDashboard},
    {path:'**',component:Login}
];