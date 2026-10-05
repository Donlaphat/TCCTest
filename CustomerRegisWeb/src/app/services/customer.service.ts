import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:5134/api/Customer';

  createCustomer(
    customer: Customer
  ): Observable<Customer> {

    return this.http.post<Customer>(
      this.apiUrl,
      customer
    );
  }
}