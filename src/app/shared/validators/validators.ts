import { FormControl } from '@angular/forms';

export const cantBeGoku = (control: FormControl) => {
    const value: string = control.value.trim().toLowerCase();

    if (value === 'goku') {
        return { noGoku: true }
    }

    return null;
}