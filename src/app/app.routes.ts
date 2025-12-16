import { Routes } from '@angular/router';
import { Admin } from './Admin Pages/admin/admin';
import { LoginPage } from './Auth/login-page/login-page';
import { RegisterPage } from './Auth/register-page/register-page';
import { StatusPage } from './Auth/status-page/status-page';
import { UserView } from './Auth/user-view/user-view';
import { MemberDashboard } from './Main Pages/member-dashboard/member-dashboard';
import { AdminDashboard } from './Admin Pages/admin-dashboard/admin-dashboard';
import { AdminStatusApproved } from './Admin Pages/admin-status-approved/admin-status-approved';
import { ForgetPassword } from './Auth/forget-password/forget-password';
import { FamilyHead } from './Admin Pages/family-head/family-head';
import { AddMember } from './Admin Pages/add-member/add-member';
import { AdminDeactivateGuard, AdminGuard, authGuard, deactiveChild, leavePageGuard, loginGuard } from './shared/auth-guard';
import { AdminInfo } from './Admin Pages/admin-info/admin-info';
import { ErrorPage } from './Auth/error-page/error-page';

export const routes: Routes = [
    { path: "admin", component: Admin },
    { path: "login", component: LoginPage },
    { path: "register", component: RegisterPage, canDeactivate: [deactiveChild] },
    { path: "forgetpwd", component: ForgetPassword },
    { path: "status", component: StatusPage, canActivate: [authGuard, loginGuard] },
    { path: "user", component: UserView, canActivate: [authGuard], canDeactivate: [leavePageGuard] },
    { path: "member", component: MemberDashboard },
    { path: "admin-dashboard", component: AdminDashboard, canActivate: [AdminGuard], canDeactivate: [AdminDeactivateGuard], },
    { path: "users-status", component: AdminStatusApproved, canDeactivate: [AdminDeactivateGuard] },
    { path: "users", component: FamilyHead, canDeactivate: [AdminDeactivateGuard] },
    { path: "info", component: AdminInfo, canDeactivate: [AdminDeactivateGuard] },
    { path: 'Addmember/:id', component: AddMember, canActivate: [authGuard] },
    { path: "Approvedstatus", component: AdminStatusApproved, canActivate: [authGuard] },
    { path:"error",component:ErrorPage},
    { path: "", component: MemberDashboard }
];
