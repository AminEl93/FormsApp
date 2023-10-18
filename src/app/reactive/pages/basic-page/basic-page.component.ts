import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/*
const rtx5090 = {
    name: 'RTX 5090',
    price: 2500,
    inStorage: 10
}
*/

@Component({
    templateUrl: './basic-page.component.html'
})

export class BasicPageComponent implements OnInit {

    public basicForm: FormGroup = this.fb.group({
        name: [ '', [Validators.required, Validators.minLength(4)] ],
        price: [ 0, [Validators.required, Validators.min(0)] ],
        inStorage: [0, [Validators.required, Validators.min(0)] ],
    })

    constructor(private fb: FormBuilder) { }
    
    ngOnInit(): void {
        // this.basicForm.reset(rtx5090);
    }

    // Comprobar si el campo es válido
    isValidField(field: string): boolean | null {
        return this.basicForm.controls[field].errors && this.basicForm.controls[field].touched;
    }
    
    // Validación para obtener el error del campo en concreto
    getFieldError(field: string): string | null {    
        if (!this.basicForm.controls[field]) return null;    
        const errors = this.basicForm.controls[field].errors || { };
    
        for (const key of Object.keys(errors)) {
            switch(key) {
                case 'required':
                    return 'Este campo es requerido!';
        
                case 'minlength':
                    return `Ha de tener como mínimo ${errors['minlength'].requiredLength} carácteres`;
            }
        }    
        return null;
    }

    onSave(): void {
        if (this.basicForm.invalid) {
            this.basicForm.markAllAsTouched();
            return;
        }
        console.log(this.basicForm.value);
        this.basicForm.reset({ price: 0, inStorage: 0 });
    }
}
