function getGraph(x, y) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: x,
            datasets: [{
                label: '# of Votes',
                data: y,
                backgroundColor: [
                    'rgba(255, 99, 132, 0)',
                ],
                borderColor: [
                    'rgba(0, 0, 0, 1)',
                ],
                borderWidth: 1
            }]
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
}