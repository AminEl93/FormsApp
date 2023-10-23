import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as customValidators from 'src/app/shared/validators/validators';

@Component({
    templateUrl: './register-page.component.html'
})

export class RegisterPageComponent {

    public registerForm: FormGroup = this.fb.group({
        name: [ '', [Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern)] ],
        email: [ '', [Validators.required, Validators.pattern(customValidators.emailPattern)] ],
        username: [ '', [ Validators.required, customValidators.cantBeGoku] ],
        password: [ '', [ Validators.required, Validators.minLength(6)] ],
        passwordconfirm: [ '', [ Validators.required] ],
    });    
    
    constructor(
        private fb: FormBuilder
    ) { }

    isValidField(field: string) {

    }

    onSubmit() {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }
        console.log(this.registerForm.value);
    }
}
