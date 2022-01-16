import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAccountDTO} from "../model/UserAccountDTO";
import {BankaccountService} from "../service/bankaccount.service";
import {Amount} from "../model/Amount";


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component..scss']
})

export class UserAccountComponent implements OnInit {
  accountId;
  amountValue;
  accountForm: FormGroup;
  selectedMode;
  userAccount: UserAccountDTO;
  error: string;
  isFindRefError: boolean = false;
  isDebitOrCreditError: boolean = false;
  isFuncError: boolean = false;

  constructor(private bankaccountService: BankaccountService) {
  }

  ngOnInit() {
    this.selectedMode = "Debit";
    this.isFuncError = false;
    this.isFindRefError = false;
    this.isDebitOrCreditError = false;
    this.error = '';
    this.accountForm = new FormGroup({
      'mode': new FormControl('Debit'),
      'account': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required)
    });
    if (this.bankaccountService.userAccountShared.getValue() && this.bankaccountService.userAccountShared.getValue().compteReference) {
      this.accountId = this.bankaccountService.userAccountShared.getValue().compteReference;
      this.search();
    }
  }

  search() {
    this.accountForm.controls['account'].enable();
    this.error = '';
    this.userAccount = undefined;
    this.isDebitOrCreditError = false;
    this.bankaccountService.searchAccountByReference(this.accountId).subscribe((p: UserAccountDTO) => {
      if (p) {
        this.userAccount = p;
        this.accountForm.controls['account'].disable();

        this.isFuncError = false;
        this.isFindRefError = false;
      } else {
        this.isFuncError = true;
        this.isFindRefError = false;
        this.error = 'There is no account with reference!';
      }
    }, error => {
      this.isFindRefError = true;
      this.isFuncError = false;
      this.error = 'Unplayable service at the moment!';
    });
  }

  save() {
    this.isDebitOrCreditError = false;
    let amount: Amount = {
      amount: this.amountValue
    };
    if (this.selectedMode === 'Debit') {
      this.bankaccountService.debitAccount(this.accountId, amount).subscribe((p: UserAccountDTO) => {
        this.userAccount = p;
        this.amountValue = undefined;
      }, error => {
        this.isDebitOrCreditError = true;
        this.error = 'Unplayable service at the moment!';
      });

    }
    if (this.selectedMode === 'Credit') {
      this.bankaccountService.creditAccount(this.accountId, amount).subscribe((p: UserAccountDTO) => {
        this.userAccount = p;
        this.amountValue = undefined;
      }, error => {
        this.isDebitOrCreditError = true;
        this.error = 'Unplayable service at the moment!';
      });
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onModeSelection() {
    this.amountValue = undefined;
  }

  refresh(event) {
    if (event.pointerType === 'mouse') {
      this.error = '';
      this.isFindRefError = false;
      this.isDebitOrCreditError = false;
      this.isFuncError = false;
      this.accountForm.controls['account'].enable();
      this.selectedMode = "Debit";
      this.userAccount = undefined;
      this.accountId = undefined;
      this.amountValue = undefined;
    }

  }

}
