import bcrypt from "bcryptjs";
import prisma from "../prisma.ts";

export interface IUser {
  id: number;
  username: string;
  password: string;
}

export class User {
  static async create(username: string, password: string): Promise<IUser> {
    const hash = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        username,
        password: hash,
      },
    });
  }

  static async findByUsername(username: string): Promise<IUser | null> {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  static async validatePassword(
    storedPassword: string,
    password: string
  ): Promise<boolean> {
    return bcrypt.compare(password, storedPassword);
  }
}
