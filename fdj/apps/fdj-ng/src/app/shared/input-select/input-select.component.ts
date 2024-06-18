import { FormControl } from '@angular/forms';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
} from '@angular/core';

import { Subscription, startWith } from 'rxjs';

import { SelectOption } from '../models/select-option';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss',
})
export class InputSelectComponent implements OnChanges, OnDestroy {
  @Input() placeholder: string = 'Rechercher';
  @Input() formControl: FormControl<string | null> = new FormControl(null);
  @Input() options: SelectOption[] = [];

  filteredOptions: SelectOption[] = [];
  searchControl = new FormControl('');
  menuOpened = false;

  private subscription = new Subscription();

  constructor(private element: ElementRef) {}

  ngOnChanges(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = new Subscription();
    }

    this.subscription.add(
      this.searchControl.valueChanges.pipe(startWith(null)).subscribe({
        next: (searchValue: string | null) => {
          this.filteredOptions = this.options.filter(
            (option) =>
              this.formControl.value ||
              !searchValue ||
              option.label.toLowerCase().includes(searchValue.toLowerCase())
          );
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    if (!this.element.nativeElement.contains(event.target)) {
      this.menuOpened = false;
    }
  }

  handleKeydownEnter(): void {
    if (this.filteredOptions.length === 1) {
      this.selectOption(this.filteredOptions[0]);
    }
  }

  selectOption(option: SelectOption): void {
    this.formControl.setValue(option.value);
    this.searchControl.setValue(option.label);
    this.menuOpened = false;
  }

  reset(): void {
    if (this.formControl.value) {
      this.formControl.setValue(null);
    }
    this.searchControl.setValue('');
    this.menuOpened = true;
  }

  showMenu(show: boolean): void {
    this.menuOpened = show;
  }
}
