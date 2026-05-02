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
                <div className="calculation-box__header">
                    <h3 className="calculation-box__title">거래소 적정가 계산기</h3>
                    <p className="calculation-box__desc">수수료 5% 적용 후 인원수별 적정 구매가를 계산합니다</p>
                </div>

                <div className="calculation-box__body">
                    <div className="calculation-input-group">
                        <label className="calculation-label">판매 가격</label>
                        <input
                            className="calculation-input"
                            type="number"
                            placeholder="골드 입력"
                            value={price}
                            onChange={savePrice}
                        />
                    </div>

                    <div className="calculation-box__section-label">인원 선택</div>
                    <div className="headcount">
                        <button onClick={() => calculatePrice(4)}>4인</button>
                        <button onClick={() => calculatePrice(8)}>8인</button>
                        <button onClick={() => calculatePrice(16)}>16인</button>
                    </div>

                    {reasonablePrice > 0 && (
                        <div className="calculation-result">
                            <div className="calculation-result__item">
                                <span className="calculation-result__label">적정가</span>
                                <span className="calculation-result__value calculation-result__value--gold">
                                    {Math.floor(reasonablePrice).toLocaleString()} G
                                </span>
                            </div>
                            <div className="calculation-result__item">
                                <span className="calculation-result__label">10% 이득가</span>
                                <span className="calculation-result__value calculation-result__value--positive">
                                    {Math.floor(reasonablePrice / 1.1).toLocaleString()} G
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Calculation;