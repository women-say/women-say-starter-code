const bgIntro = document.querySelector(".intro-bg")
const postWindow = document.querySelector("#post")
const aboutWindow = document.querySelector("#about")
const postButton = document.querySelector(".post-icon")
const aboutButton = document.querySelector(".about-icon")
const closePostBtn = document.querySelector("#close-btn-post")
const closeAboutBtn = document.querySelector("#close-btn-about")
const modalBg = document.querySelector(".modal-bg")


window.onload = function () {
  setTimeout(function () { 
    bgIntro.style.display = "none"
   }, 5000);
};
document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

  postButton.onclick = () => {
    postWindow.classList.remove("out-of-the-way-right")
    postWindow.classList.add("move-in-right")
    modalBg.classList.add("appear")
    // modalBg.style.display = "block"
    if (aboutWindow.classList.contains("move-in-left")) {
      aboutWindow.classList.add("out-of-the-way")
      aboutWindow.classList.remove("move-in-left")
    }

  };

  aboutButton.onclick = () => {
    aboutWindow.classList.remove("out-of-the-way")
    aboutWindow.classList.add("move-in-left")
  };

  closePostBtn.onclick = () => {
    postWindow.classList.add("out-of-the-way-right")
    postWindow.classList.remove("move-in-right")
    modalBg.classList.remove("appear")
    // modalBg.style.display = "none"

  };

  closeAboutBtn.onclick = () => {
    aboutWindow.classList.add("out-of-the-way")
    aboutWindow.classList.remove("move-in-left")
  };


}, false);
