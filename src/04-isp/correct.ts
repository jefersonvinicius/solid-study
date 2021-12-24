// In this case, the classes User are using the Ops, where has method that not being used
// For example, the User1 use only the op1 method, so, when some change in op2
// the class User1 also be would affected in tests watch mode

interface U1Ops {
  op1(): void;
}

interface U2Ops {
  op2(): void;
}

interface U3Ops {
  op3(): void;
}

class Ops implements U1Ops, U2Ops, U3Ops {
  op1() {
    console.log('op1');
  }

  op2() {
    console.log('op2');
  }

  op3() {
    console.log('op3');
  }
}

class User1 {
  constructor(private ops: U1Ops) {}

  method() {
    this.ops.op1();
  }
}

class User2 {
  constructor(private ops: U2Ops) {}

  method() {
    this.ops.op2();
  }
}

class User3 {
  constructor(private ops: U3Ops) {}

  method() {
    this.ops.op3();
  }
}
