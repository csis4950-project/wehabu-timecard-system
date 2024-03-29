export function validateClockInButton(data) {
  for (const [key, value] of Object.entries(data)) {
    if (!value) throw new Error("Invalid input");
  }
};

export function validateClockOutButton(id) {
  if (!id) throw new Error("Invalid input");
};