import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject, timer, Subscription} from 'rxjs';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css']
})
export class SimpleFormComponent implements OnInit, DoCheck, OnDestroy {
  countries: Array<string>;
  cities: Array<string>;
  form: FormGroup;
  timerSubscribe: Subscription;
  strengthPass = 0;
  sumUploadFiles = 0;
  isDisabled = false;
  countdown = 10;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    this.SetTimer();
    this.countries = ['Россия', 'Америка'];
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/[а-яёА-ЯЁ](-)?/),
        Validators.minLength(2)
      ]),
      address: new FormControl('', Validators.required),
      currentCountry: new FormControl('', Validators.required),
      currentCity: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      file: new FormControl(null, Validators.required),
      confirmationCode: new FormControl('', Validators.required)
    });
  }

  ngDoCheck(): void {
    const pass: string = this.form.get('password').value;
    this.PasswordStrengthMeter(pass);
    console.log('Strength: ' + this.strengthPass);
  }

  UploadFile(event): void {
    const uploadFiles = event.target.files;
    console.log(uploadFiles);
    for (const uploadFile of uploadFiles) {
      this.sumUploadFiles += uploadFile.size;
    }
  }

  UpdateAndRunTimer(): void {
    this.countdown = 10;
    this.SetTimer();
}

  ResetTimer(): void {
    if (this.isDisabled === true) {
      this.timerSubscribe.unsubscribe();
      this.isDisabled = false;
    }
  }

  SetTimer(): void {
    if (this.isDisabled === true) { return; }
    this.isDisabled = true;
    this.timerSubscribe = timer(0, 1000).subscribe(t => {
      this.countdown--;
      if (this.countdown < 1) {
        this.ResetTimer();
      }
    });
  }

  CodeConfirm(): void {
    const code = this.form.get('confirmationCode').value;
    console.log('Отправка кода: ' + code);
  }

  CheckLocation(): void {
    this.form.get('currentCity').setValue(null);
    this.form.get('currentCountry').valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value: string) => {
        if (value === 'Россия') {
          this.cities = ['Кемерово', 'Москва', 'Самара'];
        } else if (value === 'Америка') {
          this.cities = ['Нью-Йорк', 'Юта', 'Бостон'];
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  PasswordStrengthMeter(password: string): void {
    this.LessFour(password);
    this.MoreFour(password);
    this.CompressPass(password);
    this.MoreTwoLetter(password);
    this.MoreThreeNumber(password);
    this.HasNumberAndLetter(password);
    this.HasSymbolAndLetter(password);
    this.HasSymbolAndNumber(password);
    this.LetterOrNumber(password);
    this.UpperCaseAndLowerCaseLetters(password);
    this.MoreHundred();
    this.LessZero();
  }

  CompressPass(password: string): any {
    password += '-';
    let str = '';
    for (let i = 1; i < password.length; i++) {
      const nextItem = password[i];
      const item = password[i - 1];
      if (item !== nextItem) {
        str += item;
      }
      console.log('Сжатый пароль: ' + str);
    }
    return this.strengthPass -= (password.length - str.length);
  }

  LessFour(password: string): any {
    if (password.length < 4) {
      this.strengthPass = 3;
      console.log('Короткий пароль: ' + this.strengthPass);
    }
  }

  MoreFour(password: string): any {
    if (password.length >= 4) {
      this.strengthPass = 4 * password.length;
      console.log('Больше 4-х: ' + this.strengthPass);
    }
  }

  MoreTwoLetter(password: string): any {
    if (password.match(/\W{2,}/g)) {
      this.strengthPass += 5;
      console.log('Больше 2 символов: ' + this.strengthPass);
    }
  }

  MoreThreeNumber(password: string): any {
    if (password.match(/\d{3,}/g)) {
      this.strengthPass += 5;
      console.log('Больше 3 цифр: ' + this.strengthPass);
    }
  }

  HasNumberAndLetter(password: string): any {
    if (password.match(/[aA-zZ]/) && password.match(/[0-9]/)) {
      this.strengthPass += 15;
      console.log('Буквы и цифры: ' + this.strengthPass);
    }
  }

  HasSymbolAndLetter(password: string): any {
    if (password.match(/\W/) && password.match(/[aA-zZ]/)) {
      this.strengthPass += 15;
      console.log('Символы и буквы: ' + this.strengthPass);
    }
  }

  HasSymbolAndNumber(password: string): any {
    if (password.match(/\W/) && password.match(/[0-9]/)) {
      this.strengthPass += 15;
      console.log('Символы и цифры: ' + this.strengthPass);
    }
  }

  LetterOrNumber(password: string): any {
    if (password.match(/^\d+$/) || password.match(/^\D+$/)) {
      this.strengthPass -= 10;
      console.log('Только цифры/буквы: ' + this.strengthPass);
    }
  }

  UpperCaseAndLowerCaseLetters(password: string): any {
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
      this.strengthPass += 10;
      console.log('Заглавные и прописные буквы: ' + this.strengthPass);
    }
  }

  MoreHundred(): any {
    if (this.strengthPass > 100) {
      this.strengthPass = 100;
      console.log('Больше нуля: ' + this.strengthPass);
    }
  }

  LessZero(): any {
    if (this.strengthPass < 0) {
      this.strengthPass = 0;
      console.log('Меньше нуля: ' + this.strengthPass);
    }
  }

  submit(): void {
    console.log(this.form.value);
  }

  get _password(): any {
    return this.form.get('password');
  }

  get _name(): any {
    return this.form.get('name');
  }

  get _address(): any {
    return this.form.get('address');
  }
}
