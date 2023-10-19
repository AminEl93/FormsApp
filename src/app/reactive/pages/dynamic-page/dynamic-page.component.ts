import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    templateUrl: './dynamic-page.component.html'
})

export class DynamicPageComponent {

    public dynamicForm: FormGroup = this.fb.group({
        name: [ '', [Validators.required, Validators.minLength(4)] ],
        favoriteGames: this.fb.array([
            ['Resident Evil 4', Validators.required],
            ['The Last Of Us', Validators.required],
            ['FIFA', Validators.required],
            ['Need For Speed', Validators.required],
            ['Mario Kart', Validators.required]
        ])
    });

    public newFavorite: FormControl = new FormControl('', Validators.required);

    constructor(private fb: FormBuilder) { }

    // Obtener los videojuegos favoritos
    get favoriteGames() {
        return this.dynamicForm.get('favoriteGames') as FormArray;
    }

    // Comprobar si el campo es válido
    isValidField(field: string): boolean | null {
        return this.dynamicForm.controls[field].errors && this.dynamicForm.controls[field].touched;
    }
    
    // Comprobar si la lista de campos es válida
    isValidFieldInArray(formArray: FormArray, index: number) {
        return formArray.controls[index].errors && formArray.controls[index].touched;
    }

    // Validación para obtener el error del campo en concreto
    getFieldError(field: string): string | null {    
        if (!this.dynamicForm.controls[field]) return null;    
        const errors = this.dynamicForm.controls[field].errors || { };
    
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

    // Agregar un videojuego favorito
    onAddToFavorites(): void {
        if (this.newFavorite.invalid) return;
        const newGame = this.newFavorite.value;
    
        // this.favoriteGames.push(new FormControl(newGame, Validators.required));
        this.favoriteGames.push(this.fb.control(newGame, Validators.required));    
        this.newFavorite.reset();    
    }

    // Eliminar un videojuego favorito
    onDeleteFavorite(index: number): void {
        this.favoriteGames.removeAt(index);
    }

    onSubmit(): void {
        if (this.dynamicForm.invalid) {
            this.dynamicForm.markAllAsTouched();
            return;
        }
        console.log(this.dynamicForm.value);
        (this.dynamicForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
        this.dynamicForm.reset();
    }
}
