import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-title>Metric Converter</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Teks tambahan di bawah Metric Converter -->
      <p style="text-align: left; color: grey; margin-top: 10px;">
        By: Madeleine Aiken Sharapova Mamengko
      </p>
      <ion-item>
        <ion-label>Conversion Type</ion-label>
        <ion-select
          [(ngModel)]="selectedConversion"
          (ionChange)="onConversionChange()"
        >
          <ion-select-option value="length">Length</ion-select-option>
          <ion-select-option value="weight">Weight</ion-select-option>
          <ion-select-option value="temperature">Temperature</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Value</ion-label>
        <ion-input
          type="number"
          [(ngModel)]="inputValue"
          (ionChange)="convert()"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label>From</ion-label>
        <ion-select [(ngModel)]="fromUnit" (ionChange)="convert()">
          <ion-select-option *ngFor="let unit of units" [value]="unit">{{
            unit
          }}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label>To</ion-label>
        <ion-select [(ngModel)]="toUnit" (ionChange)="convert()">
          <ion-select-option *ngFor="let unit of units" [value]="unit">{{
            unit
          }}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label>Result</ion-label>
        <ion-input [value]="result.toFixed(4)" readonly></ion-input>
      </ion-item>
    </ion-content>
  `,
})
export class HomePage {
  selectedConversion: string = 'length';
  inputValue: number = 0;
  fromUnit: string = '';
  toUnit: string = '';
  result: number = 0;
  units: string[] = [];

  lengthUnits = [
    'meters',
    'kilometers',
    'centimeters',
    'millimeters',
    'miles',
    'yards',
    'feet',
    'inches',
  ];
  weightUnits = ['grams', 'kilograms', 'milligrams', 'pounds', 'ounces'];
  temperatureUnits = ['Celsius', 'Fahrenheit', 'Kelvin'];

  constructor() {
    this.onConversionChange();
  }

  onConversionChange() {
    switch (this.selectedConversion) {
      case 'length':
        this.units = this.lengthUnits;
        break;
      case 'weight':
        this.units = this.weightUnits;
        break;
      case 'temperature':
        this.units = this.temperatureUnits;
        break;
    }
    this.fromUnit = this.units[0];
    this.toUnit = this.units[1];
    this.convert();
  }

  convert() {
    if (!this.fromUnit || !this.toUnit) return;

    switch (this.selectedConversion) {
      case 'length':
        this.result = this.convertLength();
        break;
      case 'weight':
        this.result = this.convertWeight();
        break;
      case 'temperature':
        this.result = this.convertTemperature();
        break;
    }
  }

  convertLength(): number {
    const meterValues = {
      meters: 1,
      kilometers: 0.001,
      centimeters: 100,
      millimeters: 1000,
      miles: 0.000621371,
      yards: 1.09361,
      feet: 3.28084,
      inches: 39.3701,
    };

    const valueInMeters =
      this.inputValue / meterValues[this.fromUnit as keyof typeof meterValues];
    return valueInMeters * meterValues[this.toUnit as keyof typeof meterValues];
  }

  convertWeight(): number {
    const gramValues = {
      grams: 1,
      kilograms: 0.001,
      milligrams: 1000,
      pounds: 0.00220462,
      ounces: 0.035274,
    };

    const valueInGrams =
      this.inputValue / gramValues[this.fromUnit as keyof typeof gramValues];
    return valueInGrams * gramValues[this.toUnit as keyof typeof gramValues];
  }

  convertTemperature(): number {
    if (this.fromUnit === this.toUnit) return this.inputValue;

    if (this.fromUnit === 'Celsius') {
      if (this.toUnit === 'Fahrenheit') {
        return (this.inputValue * 9) / 5 + 32;
      } else if (this.toUnit === 'Kelvin') {
        return this.inputValue + 273.15;
      }
    } else if (this.fromUnit === 'Fahrenheit') {
      if (this.toUnit === 'Celsius') {
        return ((this.inputValue - 32) * 5) / 9;
      } else if (this.toUnit === 'Kelvin') {
        return ((this.inputValue - 32) * 5) / 9 + 273.15;
      }
    } else if (this.fromUnit === 'Kelvin') {
      if (this.toUnit === 'Celsius') {
        return this.inputValue - 273.15;
      } else if (this.toUnit === 'Fahrenheit') {
        return ((this.inputValue - 273.15) * 9) / 5 + 32;
      }
    }

    return 0;
  }
}
