module.exports = class User {
  constructor({
    id, name, gender, birth, email, password,
  }) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.birth = birth;
    this.email = email;
    this.password = password;
  }
};
