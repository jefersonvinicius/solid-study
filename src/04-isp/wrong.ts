// In this case, the classes User are using the Ops, where has method that not being used
// For example, the User1 use only the op1 method, so, when some change in op2
// the class User1 also be would affected in tests watch mode

class Ops {
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
  method() {
    const ops = new Ops();
    ops.op1();
  }
}

class User2 {
  method() {
    const ops = new Ops();
    ops.op2();
  }
}

class User3 {
  method() {
    const ops = new Ops();
    ops.op3();
  }
}
