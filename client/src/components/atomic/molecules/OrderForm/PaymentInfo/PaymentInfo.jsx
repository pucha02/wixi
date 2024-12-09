import { SelectPayment } from "../../../atoms/OrderForm/Select/SelectPayment"
import './PaymentInfo.css'

export const PaymentInfo = () =>{
    return(
        <div className="payment-info-block">
            <div className="payment-info-head">СПОСІБ ОПЛАТИ</div>
            <SelectPayment/>
        </div>
    )
}