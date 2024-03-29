const IS_VALID = "isValid";
const HASH = "hash";

export async function fetchIsValid(password, encryptedPassword) {
  const res = await fetch(process.env.API_URL + "/api/api_utils/bcrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: IS_VALID,
      payload: {
        password: password,
        encryptedPassword: encryptedPassword
      }
    })
  })

  const { result } = await res.json();
  return result;
}

export function hasAdminPermission(userSessionData) {
  return userSessionData.memberId.length !== 0;
}

// export function isOwner(departments) {
//   for (const department of departments) {
//     if (department.name === "__Owner") {
//       return true;
//     }
//   }
//   return false;
// }

export function getManageableDepartments(departments) {
  const manageableDepartments = [];
  for (const department of departments) {
    if (department.role.name !== "user" && department.name !== "__Owner") {
      manageableDepartments.push(department);
    }
  }
  return manageableDepartments
}