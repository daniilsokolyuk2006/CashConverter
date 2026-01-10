

function CustomTooltip ({active, payload, label}) {
    if(active && payload && payload.length) {
        return (
            <div className="tooltip">
                <p>Date: {label}</p>
                <p>Change: {payload[0].value.toFixed(4)}</p>
            </div>
        )
    }

    return null;
}

export default CustomTooltip;