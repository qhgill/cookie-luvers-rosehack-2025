class Fault extends Error {
  code: string;
  constructor(code: string, name: string, message: string) {
    super(message);
    this.name = name;
    this.code = code;
  }
}

export default Fault;
