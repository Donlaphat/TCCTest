import { Component, inject,ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './customer.html'
})
export class Customer {

  @ViewChild('profileInput')
  profileInput!: ElementRef<HTMLInputElement>;

  private readonly fb = inject(FormBuilder);
  private readonly customerService = inject(CustomerService);

  isSaving = false;
  successMessage = '';
  errorMessage = '';

  selectedProfileName = '';
  
  //fix ก่อน
  occupations = [
    { id: 1, name: 'Programmer' },
    { id: 2, name: 'Business Analyst' },
    { id: 3, name: 'System Analyst' },
    { id: 4, name: 'IT Support' },
    { id: 5, name: 'Project Manager' }
  ];

  customerForm = this.fb.group({

    firstName: this.fb.nonNullable.control(
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ),

    lastName: this.fb.nonNullable.control(
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ),

    email: this.fb.nonNullable.control(
      '',
      [
        Validators.required,
        Validators.email
      ]
    ),

    phone: this.fb.nonNullable.control(
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]{9,10}$/)
      ]
    ),

    profile: this.fb.nonNullable.control(
      '',
      Validators.required
    ),

    birthDay: this.fb.nonNullable.control(
      '',
      Validators.required
    ),

    occupationId: [
      null,
      Validators.required
    ],

    genderId: this.fb.control<number | 1>(
      1,
      Validators.required
    )
  });

  get firstName() {
    return this.customerForm.controls.firstName;
  }

  get lastName() {
    return this.customerForm.controls.lastName;
  }

  get email() {
    return this.customerForm.controls.email;
  }

  get phone() {
    return this.customerForm.controls.phone;
  }

  get profile() {
    return this.customerForm.controls.profile;
  }

  get birthDay() {
    return this.customerForm.controls.birthDay;
  }

  get occupationId() {
    return this.customerForm.controls.occupationId;
  }

  get genderId() {
    return this.customerForm.controls.genderId;
  }

  onProfileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    this.selectedProfileName = file.name;

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;

      // ตัด "data:image/png;base64," ออก
      const base64 = result.split(',')[1];

      this.customerForm.patchValue({
        profile: base64
      });

      this.customerForm.get('profile')?.markAsTouched();
      this.customerForm.get('profile')?.updateValueAndValidity();
    };

    reader.onerror = () => {
      this.errorMessage = 'Unable to read profile image.';

      this.customerForm.patchValue({
        profile: ''
      });

      this.selectedProfileName = '';
    };

    reader.readAsDataURL(file);
  }

  clearForm(): void {
    this.customerForm.reset({
      genderId: 1,
      occupationId: null
    });

    this.selectedProfileName = '';
    // Clear actual file input
    if (this.profileInput) {
      this.profileInput.nativeElement.value = '';
    }

    this.errorMessage = '';
    this.successMessage = '';
  }

  save(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (this.customerForm.invalid) {

      this.customerForm.markAllAsTouched();

      this.errorMessage =
        'Please complete all required fields.';

      return;
    }

    this.isSaving = true;

    const customer = this.customerForm.getRawValue();

    console.log('POST Customer:', customer);

    this.customerService
      .createCustomer(customer)
      .subscribe({

        next: (response) => {

          console.log(
            'Customer created:',
            response
          );

          this.successMessage = 'save data success Id : '+ response.id;
          this.isSaving = false;

          this.customerForm.reset({
            genderId: 1
          });

          this.selectedProfileName = '';
          // Clear actual file input
          if (this.profileInput) {
            this.profileInput.nativeElement.value = '';
          }
        },

        error: (error) => {
          console.error(error);
          this.errorMessage = 'Unable to save customer.';
          this.isSaving = false;
        }
      });
  }
}