import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BankaccountService} from './service/bankaccount.service';
import {UserAccountDTO} from './model/UserAccountDTO';
import {Amount} from "./model/Amount";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component..scss']
})
export class AppComponent implements OnInit {
  accountId;
  amountValue;
  accountForm: FormGroup;
  selectedMode;
  userAccount: UserAccountDTO;
  errorTech: string;

  constructor(private bankaccountService: BankaccountService) {
  }

  ngOnInit() {
  }

}
