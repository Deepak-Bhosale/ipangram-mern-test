import { userRepository } from "../repositories/user/UserRepository";
import { ADMIN_DATA } from "./constant";

export default async () => {
  const userSeedDataCount = await userRepository.countUsers();

  if (!userSeedDataCount) {
    console.log(":- User Data is Seeding -:");
    await userRepository.createUser({ ...ADMIN_DATA }, { deletedAt: 0 });
    console.log(":- User Data seeded successfully -:");
  } else {
    console.log(":- User Data already seeded -:");
  }
};
