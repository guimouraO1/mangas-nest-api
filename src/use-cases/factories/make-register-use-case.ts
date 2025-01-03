import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../auth/register";

export function makeRegisterUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    return registerUseCase;
}
