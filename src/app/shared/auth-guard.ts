import { Component, inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, CanDeactivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first!");
    router.navigate(['/login']);
    return false;
  }

  return true;
};

export const childGuard: CanActivateChildFn = () => {
  const token = localStorage.getItem("token")

  if (token) {
    return true
  }
  return false;
};

export const deactiveChild: CanDeactivateFn<any> = (component) => {
  if (component.canDeactive) {
    return component.canDeactive();
  }
  return true;
}

export const AdminGuard: CanActivateFn = () => {

  const router = inject(Router);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    alert("Please login first!");
    router.navigate(['/admin']);
    return false;
  }

  if (role !== "Admin") {
    alert("Access denied! Admin Only.");
    router.navigate(['/login']);
    return false;
  }

  return true;
};

export const loginGuard: CanActivateFn = () => {
  const role = localStorage.getItem("role");
  if (role === "FamilyHead") {
    return true;
  }
  alert("Access User only")
  return false;
}

export const leavePageGuard: CanDeactivateFn<any> = (component, nextState) => {
  if (component.canDeactivate) {
    const result = component.canDeactivate();
    if (!result) return false;
    localStorage.clear()
  }
  return true;
}
export const AdminDeactivateGuard: CanDeactivateFn<any> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {

  const nextUrl = nextState?.url ?? "";

  if (
    nextUrl === "/admin-dashboard" ||
    nextUrl === "/users-status" ||
    nextUrl === "/users" ||
    nextUrl === "/info" ||
    nextUrl.startsWith("/Addmember")
  ) {
    return true;
  }

  const confirmLeave = confirm("Are you sure you want to leave Admin Dashboard?");

  if (confirmLeave) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return true;
  }

  return false;
};

