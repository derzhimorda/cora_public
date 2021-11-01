import { AbstractControl } from '@angular/forms';

export interface ControlValidator {
  validate(control: AbstractControl | null, message: string): string | null;
}

export class ValidatorBase {
  static requiredValidator(message: string): ControlValidator {
    return {
      validate: (control: AbstractControl | null): string | null => {
        if (control !== null) {
          let isValid: boolean;
          if (typeof control.value === 'string') {
            isValid = (control.value as string).trim().length > 0;
          } else {
            isValid = control.value !== undefined && control.value !== null;
          }
          return isValid ? null : message
        }

        return null;
      }
    }
  }
}

