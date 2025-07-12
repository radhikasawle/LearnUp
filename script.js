document.addEventListener("DOMContentLoaded", () => {
  const phrases = [
    "Crack Coding Challenges",
    "Master Algorithms",
    "Ace Your Interviews",
    "Compete. Learn. Win."
  ];

  let i = 0, j = 0;
  let current = [];
  let isDeleting = false;
  let isEnd = false;

  function loop() {
    const typed = document.getElementById("typed-text");
    if (!typed) return;

    isEnd = false;
    typed.innerHTML = current.join("");

    if (i < phrases.length) {
      if (!isDeleting && j <= phrases[i].length) {
        current.push(phrases[i][j++]);
      }

      if (isDeleting && j >= 0) {
        current.pop();
        j--;
      }

      if (j === phrases[i].length) {
        isEnd = true;
        isDeleting = true;
      }

      if (isDeleting && j === 0) {
        current = [];
        isDeleting = false;
        i = (i + 1) % phrases.length;
      }
    }

    const speed = isEnd ? 1500 : isDeleting ? 50 : 100;
    setTimeout(loop, speed);
  }

  loop();
});
