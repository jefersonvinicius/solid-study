/**
 * In this class, it has three reasons to change (pay, report hour or save)
 */

import assert from 'assert';
import { MemoryDatabase } from '../utils/MemoryDatabase';

const database = new MemoryDatabase();

type EmployeeConstructor = {
  id: string;
  dailyHours: number;
  priceHours: number;
  isRegularWorkTime: boolean;
};

class Employee {
  static readonly REGULAR_MONTHS_DAY = 20;
  static readonly EXTRA_MONTHS_DAY = 24;

  private id: string;
  private dailyHours: number;
  private priceHours: number;
  private isRegularWorkTime: boolean;

  constructor(data: EmployeeConstructor) {
    this.id = data.id;
    this.dailyHours = data.dailyHours;
    this.priceHours = data.priceHours;
    this.isRegularWorkTime = data.isRegularWorkTime;
  }

  calculateMonthlyPay() {
    return this.hours() * this.priceHours;
  }

  reportHours() {
    return {
      yearly: this.hours() * 12,
      monthly: this.hours(),
      weekly: this.hours() / 4,
      daily: this.hours() / this.daysWorkedOnMonth(),
    };
  }

  private daysWorkedOnMonth() {
    return this.isRegularWorkTime ? Employee.REGULAR_MONTHS_DAY : Employee.EXTRA_MONTHS_DAY;
  }

  private hours() {
    return this.isRegularWorkTime ? this.regularHours() : this.extraHours();
  }

  private regularHours() {
    return this.dailyHours * 20;
  }

  private extraHours() {
    return this.dailyHours * 24;
  }

  save() {
    database.save(this.id, this);
  }
}

// Regular Employee
const regularEmployee = new Employee({ id: 'id', dailyHours: 8, priceHours: 9.5, isRegularWorkTime: true });
regularEmployee.save();

assert.equal(regularEmployee.calculateMonthlyPay(), 1520);
assert.deepEqual(regularEmployee.reportHours(), {
  yearly: 1920,
  monthly: 160,
  weekly: 40,
  daily: 8,
});
assert.strictEqual(database.get('id'), regularEmployee);

// Employee with extra days
const extraHoursEmployee = new Employee({ id: 'id', dailyHours: 8, priceHours: 9.5, isRegularWorkTime: false });
extraHoursEmployee.save();

assert.equal(extraHoursEmployee.calculateMonthlyPay(), 1824);
assert.deepEqual(extraHoursEmployee.reportHours(), {
  yearly: 2304,
  monthly: 192,
  weekly: 48,
  daily: 8,
});
assert.strictEqual(database.get('id'), extraHoursEmployee);
