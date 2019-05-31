const bgIntro = document.querySelector(".intro-bg")
const postWindow = document.querySelector("#post")
const aboutWindow = document.querySelector("#about")
const postButton = document.querySelector(".post-icon")
const aboutButton = document.querySelector(".about-icon")
const chartButton = document.querySelector("#chart-icon")
const closePostBtn = document.querySelector("#close-btn-post")
const closeAboutBtn = document.querySelector("#close-btn-about")
const modalBg = document.querySelector(".modal-bg")
const submitButton = document.querySelector("#submit")
const navbar = document.querySelector(".sidebar")

let closeChartBtn

const closePost = () => {

  postWindow.classList.add("out-of-the-way-right")
  postWindow.classList.remove("move-in-right")
  modalBg.classList.remove("appear")

}

const disappearNav = () => {
  navbar.classList.add("disappear-opacity")
}

const appearNav = () => {
  navbar.classList.remove("disappear-opacity")
}

const printChart1 = () => {
  if (postWindow.classList.contains("move-in-right")) closePost()


  const chartContainer = document.createElement("div");
  chartContainer.classList.add("chart-container")
  document.body.appendChild(chartContainer)
  chartContainer.innerHTML = '<div class="close-chart-cont-btn"><div class="close-container close-btn" id="close-btn-post"><div class="leftright1"></div><div class="rightleft1"></div></div></div><div class="chartContainer row" ><div class="col-left" id="myChartLegend"></div><div class="col"><canvas id="myChart" width="400" height="350"></canvas></div></div>'

  closeChartBtn = document.querySelector(".close-chart-cont-btn")
  closeChartBtn.onclick = () => {
    closeChart1()
  };

  disappearNav()
}

const closeChart1 = () => {
  const chartContainer = document.querySelector(".chart-container")
  chartContainer.classList.add("fast-disappear")

  setTimeout(() => {
    chartContainer.parentNode.removeChild(chartContainer);
  }, 400);

  appearNav()
}

window.onload = function () {
  setTimeout(function () {
    bgIntro.style.display = "none"
  }, 4000);
};
document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

  postButton.onclick = () => {
    postWindow.classList.remove("out-of-the-way-right")
    postWindow.classList.add("move-in-right")
    // modalBg.classList.add("appear")

    if (aboutWindow.classList.contains("move-in-left")) {
      aboutWindow.classList.add("out-of-the-way")
      aboutWindow.classList.remove("move-in-left")
    }


  };

  closePostBtn.onclick = () => {
    closePost()
  }

  aboutButton.onclick = () => {
    aboutWindow.classList.remove("out-of-the-way")
    aboutWindow.classList.add("move-in-left")
  };

  chartButton.onclick = () => {
    printChart1()
    paintChart()

  };


  closeAboutBtn.onclick = () => {
    aboutWindow.classList.add("out-of-the-way")
    aboutWindow.classList.remove("move-in-left")
  };

  submitButton.onclick = e => {
    e.preventDefault()
    let locationInput = document.querySelector(".geocoder input").value
    let postTextInput = document.querySelector(".post-text").value
    const place = {
      location: locationInput,
      text: postTextInput
    }

    axios.post('/', place)
      .then(response => getPosts(map))
      .catch(error => console.log('¡ops! error:', error))

    document.querySelector(".geocoder input").value = ""
    document.querySelector(".post-text").value = ""

    closePost()

  }

}, false);

