export const linechartmodel:any = (labels:any, label:any, data:any, text:any, borderColor:any, backgroundColor:any) => {
    const datas = {
        labels:labels,
        datasets: [
            {
            label,
            data,
            borderColor,
            backgroundColor,
            },
        ],
    }
    const options = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color:'rgb(134, 191, 255)'
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color:'rgb(134, 191, 255)'
                }
            },
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: text,
            },
        }, 
    }

    return [datas, options]
}