import User, { UserType } from "./user.schema";

class UserController {
  static async getAllUsers(): Promise<Array<UserType>> {
    const user: Array<UserType> = await User.find({});
    return user;
  }
  static async createUser({
    discordId,
    name,
    current,
    vc,
  }: UserType): Promise<UserType> {
    const user: UserType = await User.findOneAndUpdate({
      discordId,
      name,
      current,
      vc,
    },{
      new:true
    });
    return user;
  }
}

export default UserController;
