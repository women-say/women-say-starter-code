const bgIntro = document.querySelector(".intro-bg")
const postWindow = document.querySelector("#post")
const aboutWindow = document.querySelector("#about")
const postButton = document.querySelector(".post-icon")
const aboutButton = document.querySelector(".about-icon")
const chartButton = document.querySelector("#chart-icon")
const closePostBtn = document.querySelector("#close-btn-post")
const closeAboutBtn = document.querySelector("#close-btn-about")
const modalBg = document.querySelector(".modal-bg")
let closeChartBtn

const printChart1 = () => {
  const chartContainer = document.createElement("div");
  chartContainer.classList.add("chart-container")
  document.body.appendChild(chartContainer)
  chartContainer.innerHTML = '<div class="close-container close-btn" id="close-btn-post"><div class="leftright"></div><div class="rightleft"></div></div><canvas id="myChartindex"></canvas>'



  closeChartBtn = document.querySelector(".closeChartButton")
  closeChartBtn.onclick = () => {
    closeChart1()
  };

}

const closeChart1 = () => {
  const chartContainer = document.querySelector(".chart-container")
  chartContainer.classList.add("fast-disappear")

  setTimeout(() => {
    chartContainer.parentNode.removeChild(chartContainer);
  }, 400);
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

  chartButton.onclick = () => {
    printChart1()
    paintChart()
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


/////// CHART PAINTING
const paintChart = function (nameofnation) {

  axios.get("http://localhost:3000/erjason")
    .then(response => {

      console.log("Response.data", response.data)

      const labels = [2000, 2005, 2010, 2011, 2012, 2013, 2014, 2015]

      // let countries = response.data.map((obj) => {

      //   return obj.Country
      // })

      let datasetsArr1 = response.data.map((obj, idx) => {

        let datasets = {}

        datasets.label = obj.Country
        datasets.fill = false
        if (idx < 50) datasets.borderColor = "red"

        datasets.data = []
        labels.forEach(label => {
          if (obj[label] > 0.25 && obj[label] < 1.04)
            datasets.data.push(obj[label])
        })
        return datasets
      })
      // AQUI EJEMPLO SI QUISIESES SOLO LOS PRIMEROS DIEZ, CAMBIA EL NOMBRE DE DATASETSARR EN DATASETSARR1
      // let datasetsArr = []
      // datasetsArr1.forEach((element, idx) => {
      //   if (idx < 10) {
      //     datasetsArr.push(element)
      //   }
      // });

      let datasetsArr = []
      datasetsArr1.forEach((element, idx) => {

        datasetsArr.push(element)

      });
      // console.log(datasetsArr)

      // let data = []

      // datasetsArr.forEach(obj => {
      //   data.push(obj)
      // })

      // console.log("data", data)

      // console.log(countries)

      var ctx = document.getElementById('myChartindex').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasetsArr
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    })
}