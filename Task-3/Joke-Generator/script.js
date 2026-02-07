// State management
let currentJoke = null;
let favorites = JSON.parse(localStorage.getItem("favoriteJokes")) || [];
let isDarkMode = localStorage.getItem("darkMode") === "true";

// DOM elements
const jokeContent = document.getElementById("jokeContent");
const errorMessage = document.getElementById("errorMessage");
const newJokeBtn = document.getElementById("newJokeBtn");
const favoriteBtn = document.getElementById("favoriteBtn");
const categorySelect = document.getElementById("categorySelect");
const themeToggle = document.getElementById("themeToggle");
const favoritesSection = document.getElementById("favoritesSection");
const favoritesList = document.getElementById("favoritesList");
const favoriteCount = document.getElementById("favoriteCount");

// Initialize
init();

async function init() {
  applyTheme();
  updateFavoritesDisplay();
  await fetchJoke();

  // Event listeners
  newJokeBtn.addEventListener("click", fetchJoke);
  favoriteBtn.addEventListener("click", saveToFavorites);
  categorySelect.addEventListener("change", fetchJoke);
  themeToggle.addEventListener("click", toggleTheme);
}

// Fetch joke from API
async function fetchJoke() {
  try {
    clearError();
    showLoading();
    disableButtons(true);

    const category = categorySelect.value;
    const apiUrl = `https://v2.jokeapi.dev/joke/${category}?safe-mode`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.message || "Failed to fetch joke");
    }

    currentJoke = data;
    displayJoke(data);
  } catch (error) {
    showError(`Oops! ${error.message}. Please try again.`);
    console.error("Error fetching joke:", error);
  } finally {
    disableButtons(false);
  }
}

// Display joke
function displayJoke(joke) {
  let html = "";

  if (joke.type === "twopart") {
    html = `
                    <div class="joke-category">${joke.category}</div>
                    <div class="joke-setup">${escapeHtml(joke.setup)}</div>
                    <div class="joke-punchline">${escapeHtml(joke.delivery)}</div>
                `;
  } else {
    html = `
                    <div class="joke-category">${joke.category}</div>
                    <div class="joke-single">${escapeHtml(joke.joke)}</div>
                `;
  }

  jokeContent.innerHTML = html;
  jokeContent.classList.add("fade-in");
  setTimeout(() => jokeContent.classList.remove("fade-in"), 500);
}

// Show loading state
function showLoading() {
  jokeContent.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Loading a hilarious joke for you...</p>
                </div>
            `;
}

// Show error
function showError(message) {
  errorMessage.innerHTML = `<div class="error">${message}</div>`;
  jokeContent.innerHTML = `
                <div class="empty-state">
                    <p>😕 Couldn't load a joke right now</p>
                </div>
            `;
}

// Clear error
function clearError() {
  errorMessage.innerHTML = "";
}

// Save to favorites
function saveToFavorites() {
  if (!currentJoke) return;

  const jokeText =
    currentJoke.type === "twopart"
      ? `${currentJoke.setup} — ${currentJoke.delivery}`
      : currentJoke.joke;

  // Check if already in favorites
  const isDuplicate = favorites.some((fav) => fav.text === jokeText);

  if (isDuplicate) {
    showError("This joke is already in your favorites!");
    setTimeout(clearError, 3000);
    return;
  }

  const favorite = {
    id: Date.now(),
    text: jokeText,
    category: currentJoke.category,
  };

  favorites.unshift(favorite);
  localStorage.setItem("favoriteJokes", JSON.stringify(favorites));
  updateFavoritesDisplay();

  // Visual feedback
  favoriteBtn.innerHTML = "✅ Saved!";
  setTimeout(() => {
    favoriteBtn.innerHTML = "⭐ Save Favorite";
  }, 2000);
}

// Update favorites display
function updateFavoritesDisplay() {
  if (favorites.length === 0) {
    favoritesSection.style.display = "none";
    return;
  }

  favoritesSection.style.display = "block";
  favoriteCount.textContent = favorites.length;

  favoritesList.innerHTML = favorites
    .map(
      (fav) => `
                <div class="favorite-item">
                    <div class="favorite-text">${escapeHtml(fav.text)}</div>
                    <button class="remove-btn" onclick="removeFavorite(${fav.id})">✕</button>
                </div>
            `,
    )
    .join("");
}

// Remove favorite
function removeFavorite(id) {
  favorites = favorites.filter((fav) => fav.id !== id);
  localStorage.setItem("favoriteJokes", JSON.stringify(favorites));
  updateFavoritesDisplay();
}

// Toggle theme
function toggleTheme() {
  isDarkMode = !isDarkMode;
  localStorage.setItem("darkMode", isDarkMode);
  applyTheme();
}

// Apply theme
function applyTheme() {
  if (isDarkMode) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    document.documentElement.removeAttribute("data-theme");
    themeToggle.textContent = "🌙";
  }
}

// Disable buttons
function disableButtons(disabled) {
  newJokeBtn.disabled = disabled;
  favoriteBtn.disabled = disabled;
  categorySelect.disabled = disabled;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Make removeFavorite available globally
window.removeFavorite = removeFavorite;
