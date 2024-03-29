import prismaClient from "@/utils/globalPrismaClient";
import { isOwner } from "@/utils/utils";

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
        where: {
          role: {
            name: {
              not: "user"
            }
          },
        },
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
              id: true,
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

export async function getDepartmentMembersByDepartments(departments) {
  const filters = [];
  for (const department of departments) {
    const filter = {
      department: {
        id: department.id
      }
    }
    filters.push(filter);
  }
  return await prismaClient.departmentMember.findMany({
    where: {
      OR: filters
    },
    include: {
      member: true,
      department: true,

    }
  })

}

export async function getCurrentWorkers(departments) {
  const filters = [];
  for (const department of departments) {
    const filter = {
      departmentId: department.id
    }
    filters.push(filter);
  }

  return await prismaClient.workTime.findMany({
    where: {
      OR: filters,
      endTime: null,
      deletedAt: null,
    },
    include: {
      workedUser: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      },
      workerDepartment: true
    }
  })
}

export async function createWorkTimeWithNoEndTime(data) {
  return await prismaClient.workTime.create({
    data: data,
    include: {
      workedUser: true,
      workerDepartment: true
    }
  });
}

export async function updateEndTimeOfWorkTime(id) {
  return await prismaClient.workTime.update({
    where: {
      id: id
    },
    data: {
      endTime: new Date()
    }
  })
}