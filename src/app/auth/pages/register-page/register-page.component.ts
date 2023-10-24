import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import * as customValidators from 'src/app/shared/validators/validators';

import { ValidatorsService } from '../../../shared/services/validators.service';


@Component({
    templateUrl: './register-page.component.html'
})

export class RegisterPageComponent {

    public registerForm: FormGroup = this.fb.group({
        name: [ '', [Validators.required, Validators.pattern(this._validatorsService.firstNameAndLastnamePattern)] ],
        email: [ '', [Validators.required, Validators.pattern(this._validatorsService.emailPattern)] ],
        username: [ '', [Validators.required, this._validatorsService.cantBeGoku] ],
        password: [ '', [Validators.required, Validators.minLength(6)] ],
        passwordconfirm: [ '', [Validators.required] ],
    });    
    
    constructor(
        private fb: FormBuilder,
        private _validatorsService: ValidatorsService
    ) { }

    isValidField(field: string) {
        return this._validatorsService.isValidField(this.registerForm, field);
    }

    onSubmit() {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }
        console.log(this.registerForm.value);
    }
}
