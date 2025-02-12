// Updates final timeline box with current month and year
function loadDate() {
	
	const currentDate = new Date();

	const monthNames = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
	];
	const currentMonth = monthNames[currentDate.getMonth()];
	const currentYear = currentDate.getFullYear();

	document.getElementById("specialDate").innerText = `${currentMonth} ${currentYear} – The Future is Bright`;
}

/*document.addEventListener("DOMContentLoaded", function () {
  const profiles = document.querySelectorAll("#bgg4 > div"); // Select all member divs
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const bgg4 = document.getElementById("bgg4");

  let currentProfileIndex = 0;

  // Set the width of each profile to 100%
  profiles.forEach((profile) => {
    profile.style.width = "calc((100% - 30px) / 3)";
  });

  // Set the display property of the container to flex
  bgg4.style.display = "flex";
  bgg4.style.overflow = "hidden";

  // Function to update the profile display
  function updateProfileDisplay() {
    profiles.forEach((profile, index) => {
      if (index === currentProfileIndex) {
        profile.style.transform = "translateX(0)";
        profile.style.opacity = "1";
        profile.style.zIndex = "1";
      } else if (index < currentProfileIndex) {
        profile.style.transform = "translateX(-100%)";
        profile.style.opacity = "0.5";
        profile.style.zIndex = "0";
      } else {
        profile.style.transform = "translateX(100%)";
        profile.style.opacity = "0.5";
        profile.style.zIndex = "0";
      }
    });
  }

  // Show the first profile initially
  updateProfileDisplay();

  // Left arrow click handler
  leftArrow.addEventListener("click", function () {
    currentProfileIndex = (currentProfileIndex === 0) ? profiles.length - 1 : currentProfileIndex - 1;
    updateProfileDisplay();
  });

  // Right arrow click handler
  rightArrow.addEventListener("click", function () {
    currentProfileIndex = (currentProfileIndex === profiles.length - 1) ? 0 : currentProfileIndex + 1;
    updateProfileDisplay();
  });
});*/

document.addEventListener("DOMContentLoaded", function () {
    const audioPlayers = document.querySelectorAll(".audio-player");
    let currentlyPlaying = null;

    audioPlayers.forEach(player => {
        const audio = player.querySelector(".audio-file");
        const playPauseBtn = player.querySelector(".play-pause");
        const progressBar = player.querySelector(".progress");
        const timestamp = player.querySelector(".timestamp");

        const albumContainer = player.closest(".albumcontainer");
        const songNames = Array.from(albumContainer.querySelectorAll("p"));

        let nowPlayingSong = songNames[Math.floor(Math.random() * songNames.length)];

        function updateSongOpacity(playingSong) {
            songNames.forEach(song => {
                if (song === playingSong) {
                    song.style.opacity = "1";
                    song.style.fontWeight = "bold";
                } else {
                    song.style.opacity = "0.4";
                    song.style.fontWeight = "normal";
                }
            });
        }

        function resetSongOpacity() {
            songNames.forEach(song => {
                song.style.opacity = "1";
                song.style.fontWeight = "normal";
            });
        }

        playPauseBtn.addEventListener("click", function () {
            if (audio.paused) {
                if (currentlyPlaying && currentlyPlaying !== audio) {
					resetSongOpacity();
                    currentlyPlaying.pause();
					currentlyPlaying.currentTime = 0;
                    currentlyPlaying.closest(".albumcontainer").querySelector(".play-pause").textContent = "▶";
                }

                audio.play();
                playPauseBtn.textContent = "⏸";
                currentlyPlaying = audio;
                updateSongOpacity(nowPlayingSong);
            } else {
                audio.pause();
                playPauseBtn.textContent = "▶";
                resetSongOpacity();
            }
        });
		
		audio.addEventListener("timeupdate", function () {
            const currentTime = audio.currentTime;
            const duration = audio.duration || 1;
            progressBar.value = (currentTime / duration) * 100;
            timestamp.textContent = formatTime(currentTime);
        });

        progressBar.addEventListener("input", function () {
            const duration = audio.duration || 1;
            audio.currentTime = (progressBar.value / 100) * duration;
        });

        audio.addEventListener("ended", function () {
            playPauseBtn.textContent = "▶";
            resetSongOpacity();
        });
    });
	
	function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    }
});

