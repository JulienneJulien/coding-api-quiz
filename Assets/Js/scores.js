function printyourScores() {
    // either get scores from localstorage or set to empty array
    var yourScores = JSON.parse(window.localStorage.getItem("yourScores")) || [];
  
    // sort highscores by score property in descending order
    yourScores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    yourScores.forEach(function(score) {
      // create li tag for each high score
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      // display on page
      var olEl = document.getElementById("yourScores");
      olEl.appendChild(liTag);
    });
  }
  
  function clearyourScores() {
    window.localStorage.removeItem("yourScores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearyourScores;
  
  // run function when page loads
  printyourScores();
  