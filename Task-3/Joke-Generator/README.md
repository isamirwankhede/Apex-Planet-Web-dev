# 😂 Random Joke Generator

A simple web app that fetches random jokes using the free **JokeAPI** and displays them instantly.

---

## 🚀 Features
- Get random jokes on button click
- Supports single & two-part jokes
- Uses public JokeAPI
- Beginner-friendly project

---

## 🛠 Tech Stack
- HTML
- CSS
- JavaScript
- JokeAPI

---

## 📦 Project Structure
random-joke-generator/
│── index.html
│── style.css
│── script.js
│── README.md



---

## ▶️ How to Run
1. Download or clone the project
2. Open `index.html` in your browser
3. Click **Get Joke** 😂

---


## 🔗 API Used
```js
https://v2.jokeapi.dev/joke/${category}?safe-mode
const category = "Programming";

fetch(`https://v2.jokeapi.dev/joke/${category}?safe-mode`)
  .then(res => res.json())
  .then(data => {
    if (data.type === "single") {
      console.log(data.joke);
    } else {
      console.log(data.setup + " " + data.delivery);
    }
  });
```