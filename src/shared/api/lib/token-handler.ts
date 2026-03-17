class TokenHandler {
  token: string = "";

  getValue() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ token: this.token })
      }, 150);
    });
  }

  setValue(value: string) {
    this.token = value;

    return this.getValue();
  }

  removeValue() {
    this.token = "";

    return this.getValue();
  }
}

export const tokenHandler = new TokenHandler();
