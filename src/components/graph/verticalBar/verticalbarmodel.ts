export const verticalBarModel:any = (labels:any, label:any, data:any, text:any, backgroundColor:any, barThickness:number) => {
    const datas = {
        labels:labels,
        datasets: [
            {
            label,
            data,
            backgroundColor,
            },
        ],
    }
    const options = {
        maintainAspectRatio:true,
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: text,
            },
        }, 
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
        layout: {
            padding: {
                left: 5,
                right: 10,
                top: 0,
                bottom: 0,
            },
        },
        barThickness: barThickness
    }

    return [datas, options]
}