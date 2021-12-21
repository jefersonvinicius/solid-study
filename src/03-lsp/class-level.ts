interface License {
  calcFeed(): number;
}

class PersonalLicense implements License {
  calcFeed(): number {
    return 120;
  }
}

class BusinessLicense implements License {
  constructor(private users: string[]) {}

  calcFeed(): number {
    return 99 * this.users.length;
  }
}

class Billing {
  constructor(private license: License) {}

  generate() {
    const format = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format;
    return 'Tax: ' + format(this.license.calcFeed());
  }
}

// LSP said that a application should be able change between its subtypes respecting the interface
// In present example, the billing application can be change between the PersonalLicense and
// BusinessLicense because it respect the interface License

const jefersonLicense = new PersonalLicense();
const billingOfJeferson = new Billing(jefersonLicense);

const aliveAppLicense = new BusinessLicense(['Jeferson', 'Oswaldo', 'Caleby', 'Hitalo']);
const billingOfAlive = new Billing(aliveAppLicense);

console.log('Jeferson License:');
console.log('\t' + billingOfJeferson.generate());

console.log('\nAlive License:');
console.log('\t' + billingOfAlive.generate());
