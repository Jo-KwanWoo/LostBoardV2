import { useState } from "react";

function Calculation(){
    const [price, setPrice] = useState();
    const [reasonablePrice, setReasonablePrice] = useState(0);

    const savePrice = event =>{
        setPrice(event.target.value) 
    }

    const calculatePrice = (number) => {
        let p = price * 0.95;
        setReasonablePrice(p * ((number-1) / number));
    }

    return(
        <div className="content">
            <div className="calculation-box">
                <h3>계산기</h3>
                <input type="number" placeholder="가격" value={price} onChange={savePrice}/>
                <div className="headcount">
                    <button onClick={() => calculatePrice(4)}>4인</button>
                    <button onClick={() => calculatePrice(8)}>8인</button>
                    <button onClick={() => calculatePrice(16)}>16인</button>
                </div>
                <div>적정가: {Math.floor(reasonablePrice)}</div>
                <div>10%이득: {Math.floor(reasonablePrice / 1.1)}</div>
            </div>
        </div>
    )
}

export default Calculation;