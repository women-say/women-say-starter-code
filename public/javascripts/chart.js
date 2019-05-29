axios.get("http://localhost:3000/erjason")
  .then(response => {

    console.log("Response.data", response.data)

    const labels = [2000, 2005, 2010, 2011, 2012, 2013, 2014, 2015]

    let countries = response.data.map((obj) => {

      return obj.Country
    })

    let datasetsArr = response.data.map((obj, idx) => {

      let datasets = {}

      datasets.label = obj.Country
      datasets.fill = false
      if (idx < 50) datasets.borderColor = "red"

      datasets.data = []
      labels.forEach(label => {
        datasets.data.push(obj[label])
      })


      return datasets
    })
    console.log(datasetsArr)

    let data = []

    datasetsArr.forEach(obj => {
      data.push(obj)
    })

    console.log("data", data)

    // console.log(countries)

    var ctx = document.getElementById('myChart').getContext('2d');
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
