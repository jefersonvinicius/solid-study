/**
 * Now, the Employee class only represent an employee
 * and the others features were extracted to own class
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

  public id: string;
  private dailyHours: number;
  public priceHours: number;
  private isRegularWorkTime: boolean;

  constructor(data: EmployeeConstructor) {
    this.id = data.id;
    this.dailyHours = data.dailyHours;
    this.priceHours = data.priceHours;
    this.isRegularWorkTime = data.isRegularWorkTime;
  }

  get daysWorkedInMonth() {
    return this.isRegularWorkTime ? Employee.REGULAR_MONTHS_DAY : Employee.EXTRA_MONTHS_DAY;
  }

  get monthlyHours() {
    return this.isRegularWorkTime ? this.regularHours() : this.extraHours();
  }

  private regularHours() {
    return this.dailyHours * 20;
  }

  private extraHours() {
    return this.dailyHours * 24;
  }
}

class PayCalculator {
  static calculateMonthlyPay(employee: Employee) {
    return employee.monthlyHours * employee.priceHours;
  }
}

class HoursReporter {
  static reportHours(employee: Employee) {
    return {
      yearly: employee.monthlyHours * 12,
      monthly: employee.monthlyHours,
      weekly: employee.monthlyHours / 4,
      daily: employee.monthlyHours / employee.daysWorkedInMonth,
    };
  }
}

class EmployeeSaver {
  static saveEmployee(employee: Employee) {
    database.save(employee.id, employee);
  }
}

// Regular Employee
const regularEmployee = new Employee({ id: 'id', dailyHours: 8, priceHours: 9.5, isRegularWorkTime: true });
EmployeeSaver.saveEmployee(regularEmployee);

assert.equal(PayCalculator.calculateMonthlyPay(regularEmployee), 1520);
assert.deepEqual(HoursReporter.reportHours(regularEmployee), {
  yearly: 1920,
  monthly: 160,
  weekly: 40,
  daily: 8,
});
assert.strictEqual(database.get('id'), regularEmployee);

// Employee with extra days
const extraHoursEmployee = new Employee({ id: 'id', dailyHours: 8, priceHours: 9.5, isRegularWorkTime: false });
EmployeeSaver.saveEmployee(extraHoursEmployee);

assert.equal(PayCalculator.calculateMonthlyPay(extraHoursEmployee), 1824);
assert.deepEqual(HoursReporter.reportHours(extraHoursEmployee), {
  yearly: 2304,
  monthly: 192,
  weekly: 48,
  daily: 8,
});
assert.strictEqual(database.get('id'), extraHoursEmployee);
