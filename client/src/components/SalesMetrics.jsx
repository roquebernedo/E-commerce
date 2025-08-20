import React, { useEffect, useState } from "react"
import { priceFormat } from "../helpers/priceFormat";
import '../styles/Publications.scss'
import '../styles/SaleMetrics.scss'

const SalesMetrics = ({ publications }) => {
    const [minSale, setMinSale] = useState(false);
    const [maxSale, setMaxSale] = useState(false);
    const percenter = (num) => {
        let aux = Math.round((num * 100) / maxSale);
        if (aux > 99) {
        return 99;
        } else if (aux > 10) {
        return aux;
        } else {
        return 10;
        }
    };

    useEffect(() => {
            
        let maxSale = 0;
        //console.log(props[0])
        let minSale = publications?.sales[0] && publications?.sales[0]
        //console.log(props[0].price)
        ? publications.sales[0].price * publications.sales[0].quantity
        : 0;
        console.log(minSale)
        console.log(maxSale)
        publications.sales?.forEach((s) => {
            
        maxSale < s.price * s.quantity && (maxSale = s.price * s.quantity);
        minSale > s.price * s.quantity && (minSale = s.price * s.quantity);
        }); 
        console.log(maxSale)
        setMinSale(minSale);
        setMaxSale(maxSale);
            
            
            // let maxSale = 0;
            // console.log(props[0])
            // let minSale = props?.sales[0]
            // //console.log(props[0].price)
            // ? props.sales[0].price * props.sales[0].quantity
            // : 0;
            // console.log(minSale)
            // console.log(maxSale)
            // props?.sales.forEach((s) => {
         
            // maxSale < s.price * s.quantity && (maxSale = s.price * s.quantity);
            // minSale > s.price * s.quantity && (minSale = s.price * s.quantity);
            // }); 
            // console.log(maxSale)
            // setMinSale(minSale);
            // setMaxSale(maxSale);
            
        // eslint-disable-next-line 
    }, []);
    console.log(publications)   
    return (
    <div className="sales-metrics-graph">
        <div className="sales-metrics-graph-container">
            <span>Últimas ventas:</span>
            {React.Children.toArray(
            publications.sales.map((s) => (
                <div
                    className="sales-metrics-graph-bar"
                    style={{
                        height: `${percenter(s.price * s.quantity)}%`,
                        background: `rgb(100, 213, 0, ${
                        percenter(s.price * s.quantity) / 100
                        })`,
                    }}
                >
                <div className="metrics-tooltip">
                    <p>{`Total: $${priceFormat(s.price * s.quantity).int}`}</p>
                    <p>{`Unidades: ${s.quantity}`}</p>
                    <p>{`${new Date(
                    parseInt(s.payment_date)
                    ).toLocaleDateString("es-Ar")}`}</p>
                </div>
                </div>
            ))
            )}
                <div className="metric-graph-indicator">
                ${priceFormat(maxSale).int}
                </div>
                {minSale !== maxSale && (
                <div
                    className="metric-graph-indicator"
                    style={{ top: `calc(4rem + ${85.3 - percenter(minSale)}%)` }}
                >
                    ${priceFormat(minSale).int}
                </div>
                )}
        </div>
        
    </div>
    )
}
export default SalesMetrics