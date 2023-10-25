import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class ValidatorsService {

    public firstNameAndLastnamePattern: string = '^([a-zA-Z]+) ([a-zA-Z]+) ([a-zA-Z]+) ([a-zA-Z]+)?$';
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    public cantBeGoku = (control: FormControl): ValidationErrors | null => {
        const value: string = control.value.trim().toLowerCase();
        if (value === 'goku') {
            return { noGoku: true }
        }    
        return null;
    }

    public isValidField(form: FormGroup, field: string) {
        return form.controls[field].errors && form.controls[field].touched;
    }

    // Validación para que 2 campos sean iguales
    public isFieldOneEqualToFieldTwo = (field1: string, field2: string) => {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const fieldValue1 = formGroup.get(field1)?.value;
            const fieldValue2 = formGroup.get(field2)?.value;

            if (fieldValue1 === fieldValue2) {
                if (formGroup.get(field2)?.hasError('noIguales')) {
                    delete formGroup.get(field2)?.errors?.["noIguales"];
                    formGroup.get(field2)?.updateValueAndValidity();
                }
                return null;
            }
            formGroup.get(field2)?.setErrors({noIguales: true});
            return { noIguales: true };
        }
    }

    /*
    public isFieldOneEqualToFieldTwo = (field1: string, field2: string) => {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const fieldValue1 = formGroup.get(field1)?.value;
            const fieldValue2 = formGroup.get(field2)?.value;

            if (fieldValue1 !== fieldValue2) {
                formGroup.get(field2)?.setErrors({ notEqual: true });
                return { notEqual: true };
            }

            if (formGroup.get(field2)?.hasError('noIguales')) {
                delete formGroup.get(field2)?.errors?.["noIguales"];
                formGroup.get(field2)?.updateValueAndValidity();
            }     
            //Este return únicamente se realiza si los dos campos son iguales
            return null;
        }
    }
    */

    /*
    public isFieldOneEqualToFieldTwo = (field1: string, field2: string) => {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const fieldValue1 = formGroup.get(field1)?.value;
            const fieldValue2 = formGroup.get(field2)?.value;
            const field2Errors = formGroup.get(field2)?.errors;
            if (fieldValue1 !== fieldValue2) {
                formGroup.get(field2)?.setErrors({ ...field2Errors, notEqual: true });
                return { notEqual: true };
            }
            delete formGroup.get(field2)?.errors?.['notEqual'];
            return null;
        }
    }
    */    

    /*
    public isFieldOneEqualFieldTwo(field1: string, field2: string) {
        return (formGroup: AbstractControl): ValidationErrors | null => {    
            const fieldValue1 = formGroup.get(field1)?.value;
            const fieldValue2 = formGroup.get(field2)?.value;        
            if (fieldValue1 !== fieldValue2) {
                formGroup.get(field2)?.setErrors({ notEqual: true });
                return { notEqual: true }
            }        
            formGroup.get(field2)?.setErrors(null);
            return null;
        }    
    }
    */
}