import userRepositories from "../repositories/userRepositories.js";
import { comparePassword, hashPassword } from "../lib/bcrypt.js";
import { generateToken } from "../lib/jwt.js";

class userServices {
  static async getUser(page) {
    const data = await userRepositories.getAll(page);

    return data;
  }

  static async getById(id) {
    const data = await userRepositories.getById(id);

    console.log(data);

    if (!data) throw { name: "Data Not Found" };

    return data;
  }

  static async register(userData) {
    const data = userData;

    if (!data) throw { name: "Invalid Input" };

    const existingUser = await userRepositories.getEmail(data.email);

    if (existingUser) throw { name: "Email Already Exist" };

    const encryptedPassword = await hashPassword(data.password, 8);

    const userRegister = {
      email: data.email,
      gender: data.gender,
      password: encryptedPassword,
      role: data.role,
    };

    const registerUser = await userRepositories.createUser(userRegister);

    return registerUser;
  }

  static async login(userData) {
    const { email, password } = userData;

    if (!email || !password) throw { name: "Invalid Input" };

    const user = await userRepositories.getEmail(email);

    if (!user) throw { name: "Invalid Credentials" };

    const compare = await comparePassword(password, user.password);

    if (!compare) throw { name: "Invalid Credentials" };

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return token;
  }

  static async update(id, userdata) {
    if (!id) throw { name: "Data Not Found" };

    const encryptedPassword = await hashPassword(userdata.password);

    const data = {
      email: userdata.email,
      gender: userdata.gender,
      password: encryptedPassword,
      role: userdata.role,
    };

    if (!data.email || !data.gender || !data.password || !data.role)
      throw { name: "Invalid Input" };

    const existingEmail = await userRepositories.getEmail(data.email);

    if (existingEmail) throw { name: "Email Already Exist" };

    const updateUser = await userRepositories.editUser(id, data);

    return updateUser;
  }

  static async delete(id) {
    if (!id) throw { name: "Data Not Found" };

    const data = await userRepositories.deleteUser(id);

    return data;
  }
}

export default userServices;
