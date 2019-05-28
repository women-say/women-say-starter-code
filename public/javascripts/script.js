const postWindow = document.querySelector("#post")
const aboutWindow = document.querySelector("#about")
const postButton = document.querySelector(".post-icon")
const aboutButton = document.querySelector(".about-icon")
const closePostBtn = document.querySelector("#close-btn-post .close-btn")
const closeAboutBtn = document.querySelector("#close-btn-about .close-btn")

document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

  postButton.onclick = () => {
    postWindow.style.display = "block";
  };

  aboutButton.onclick = () => {
    aboutWindow.style.display = "block";
  };

  closePostBtn.onclick = () => {
    postWindow.style.display = "none";
  };

  closeAboutBtn.onclick = () => {
    aboutWindow.style.display = "none";
  };


}, false);
