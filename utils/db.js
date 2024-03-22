import prismaClient from "@/utils/globalPrismaClient";

export async function getUserSessionData(email) {
  return await prismaClient.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      memberId: {
        select: {
          department: {
            select: {
              id: true,
              name: true,
              organization: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          memberId: true,
          role: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
}

export async function findUserByEmail(email) {
  return await prismaClient.user.findUnique({
    where: {
      email: email
    }
  });
}