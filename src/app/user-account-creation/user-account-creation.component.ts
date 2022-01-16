import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserAccountDTO} from "../model/UserAccountDTO";
import {BankaccountService} from "../service/bankaccount.service";


@Component({
  selector: 'app-user-account-creation',
  templateUrl: './user-account-creation.component.html',
  styleUrls: ['./user-account-creation.component..scss']
})
export class UserAccountCreationComponent implements OnInit {

  userForm: FormGroup;
  firstname;
  lastname;
  address;
  amount;
  userAccount: UserAccountDTO = {};
  isSaveError: boolean = false;
  error: string;

  constructor(
    private route: ActivatedRoute,
    private bankaccountService: BankaccountService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.isSaveError = false;
    this.error = undefined;
    this.userForm = new FormGroup({
      'firstname': new FormControl(null,       [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'lastname': new FormControl(null,       [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'address': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required),
    });
  }

  onCancel() {
    this.router.navigate(['/myaccount'], {relativeTo: this.route});
  }

  onSubmit() {
    this.isSaveError = false;
    this.error = undefined;
    this.userAccount.firstName = this.userForm.value.firstname;
    this.userAccount.lastName = this.userForm.value.lastname;
    this.userAccount.address = this.userForm.value.address;
    this.userAccount.amount = this.userForm.value.amount;
    this.bankaccountService.create(this.userAccount).subscribe( p=>{
      this.bankaccountService.userAccountShared.next(p);
      this.router.navigate(['/myaccount'], {relativeTo: this.route});
    }, error => {
      this.isSaveError = true;
      this.error = 'Unplayable service at the moment!';
    });
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
