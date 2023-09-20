export const doughnutModel:any = (labels:any, label:any, data:any, backgroundColor:any, borderColor:any) => {
    const datas = {
        labels:labels,
        datasets: [
            {
                label,
                data,
                backgroundColor,
                borderColor,
                borderWidth: 1,
            }
        ],
    }

    const options = {
        plugins: {
            legend: {
                display: false, // This will hide the legend
            },
        },
    };
    return [datas, options]
}