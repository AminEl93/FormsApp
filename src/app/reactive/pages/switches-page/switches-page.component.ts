import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './switches-page.component.html'
})

export class SwitchesPageComponent implements OnInit {

    public switchForm: FormGroup = this.fb.group({
        gender: ['M', Validators.required],
        wantsNotifications: [true, Validators.required],
        termsAndConditions: [false, Validators.requiredTrue]
    });

    public person = {
        gender: 'M',
        wantsNotifications: false
    }

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.switchForm.reset(this.person);
    }

    isValidCheck(field: string): boolean | null {
        return this.switchForm.controls[field].errors && this.switchForm.controls[field].touched;
    }

    onSubmit() {
        if (this.switchForm.invalid) {
            this.switchForm.markAllAsTouched();
            return;
        }
        const { termsAndConditions, ...newPerson } = this.switchForm.value;
        this.person = newPerson;
        
        console.log(this.switchForm.value);
        console.log(this.person);
    }
}
