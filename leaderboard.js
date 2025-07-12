// leaderboard.js
document.addEventListener("DOMContentLoaded", renderLeaderboard);

const leaderboard = [
  { username: "Alice", points: 0, solved: [] },
  { username: "Bob", points: 0, solved: [] },
];

function renderLeaderboard() {
  const tbody = document.getElementById("leaderboardBody");
  const sorted = leaderboard.sort((a, b) => b.points - a.points);
  tbody.innerHTML = "";
  sorted.forEach((user, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${user.username}</td>
        <td>${user.points}</td>
        <td>${user.solved.length}</td>
      </tr>
    `;
  });
}

document.addEventListener("DOMContentLoaded", renderLeaderboard);
