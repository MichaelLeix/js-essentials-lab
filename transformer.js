//Data
const rawUserData = [
  { id: 1, full_name: " Alex Rivera ", email: "alex.r@example.com", role: "admin", status: "active", scores: [88, 92, 95] },
  { id: 2, full_name: "jordan smith", email: "jordan.s@example.com", role: "user", status: "inactive", scores: [70, 65, 68] },
  { id: 3, full_name: " TAYLOR SWIFT ", email: "taylor.s@example.com", role: "user", status: "active", scores: [99, 100, 98] },
  { id: 4, full_name: "Morgan Lee", email: "morgan.l@example.com", role: "editor", status: "active", scores: [82, 85, 80] },
  { id: 5, full_name: "samuel green", email: "sam.g@example.com", role: "user", status: "pending", scores: [60, 62, 58] },
  { id: 6, full_name: " Casey Vance ", email: "casey.v@example.com", role: "editor", status: "inactive", scores: [78, 81, 75] },
  { id: 7, full_name: "PATRICK STAR", email: "patrick.s@example.com", role: "user", status: "active", scores: [55, 50, 60] },
  { id: 8, full_name: " Riley Quinn", email: "riley.q@example.com", role: "admin", status: "active", scores: [91, 89, 94] }
];

//Clean up user data
const cleanProfiles = (users) =>
  users.map(({ id, full_name, email, role, status, scores }) => ({
    id,
    //first trim whitespace, and set to lower. find first 2 word characters and set to upper.
    full_name: full_name.trim().toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()),
    email,
    role,
    status,
    scores,
    //add scores to sum, then divide by length.
    averageScore: scores.reduce((sum, score) => sum + score, 0) / scores.length
  }));

//return all active users, very simple.
const filterActiveUsers = (users) => {
  return users.filter((user) => user.status === "active");
}

//Give a user a new role
// (users = array, targetuserId = which user to update)
const updateUserRole = (users, targetUserId, newRole) =>
  users.map((user) =>
    //check if its the user we want
    user.id === targetUserId
      //assign new role
      ? { ...user, role: newRole }
      //otherwise keep it the same
      : user
  );

//get amount of each type of user
const countUsersByRole = (users) =>
  //use reduce to count through the array
  users.reduce((counts, user) => {
    //set counts[user.role] to itself, or to a zero if it doesn't exist yet
    //afterwards add 1
    counts[user.role] = (counts[user.role] || 0) + 1;
    return counts;
  }, {});

//basic text formatting very easy
const logUserDirectory = (users) => {
  users.forEach((user) => {
    console.log(
      `[ID ${user.id}] ${user.full_name} (${user.role.toUpperCase()}) - Avg Score: ${user.averageScore.toFixed(2)} | Status: ${user.status.toUpperCase()}`
    );
  });
};


console.log("=== 1. Cleaned Data ===");
const cleaned = cleanProfiles(rawUserData);
console.log(cleaned);

console.log("\n=== 2. Active Users Only ===");
const activeUsers = filterActiveUsers(cleaned);
console.log(activeUsers);

console.log("\n=== 3. Updated User Role ===");
const updatedList = updateUserRole(cleaned, 2, "admin");
console.log("Original User 2 Role:", cleaned[1].role); // Should still be 'user'
console.log("Updated User 2 Role:", updatedList[1].role); // Should be 'admin'

console.log("\n=== 4. Role Counts ===");
const roleCounts = countUsersByRole(cleaned);
console.log(roleCounts);

console.log("\n=== 5. User Directory Report ===");
logUserDirectory(cleaned);
