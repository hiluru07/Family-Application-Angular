import { AbstractControl, ValidationErrors } from "@angular/forms";

export function PasswordMatch(control: AbstractControl): ValidationErrors | null {

    const password = control.get('Password')?.value;
    const cpassword = control.get('Cpassword')?.value;
    return password === cpassword ? null : { PasswordMissMatch: true };
}