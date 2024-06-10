/*
  Componente padre con validaciones generales
 */

import {FormArray, FormGroup} from "@angular/forms";

export class AppBaseComponent {

  /*
  Valida si tocaron un input
   */
  public isTouchedField = (form: FormGroup, field: string): boolean => {
    return form?.get(field).touched === true && form?.get(field).invalid;
  }

  public getAllErrorsForm(form: FormGroup | FormArray): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
      const control = form.get(key);
      const errors = (control instanceof FormGroup || control instanceof FormArray)
      ? this.getAllErrorsForm(control)
        : control.errors
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as { [key: string]: any });
    return hasError ? result : null;
  }

}
