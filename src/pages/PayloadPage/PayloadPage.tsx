import Button from "../../components/UI/Button/Button";


import cl from "./PayloadPage.module.scss"


export const PayloadPage = () => {
    localStorage.removeItem("formData");
    return(
        <div className={cl.PayloadPage}>
            <div className={cl.PayloadPage__Container}>
                <div className={cl.PayloadPage__Image}></div>
                <div className={cl.PayloadPage__Content}>
                    <p className={cl.PayloadPage__Title}>
                        Предварительный заказ успешно оформлен. Осталось оплатить Ваш заказ
                    </p>
                    <Button active>
                        ОПЛАТИТЬ В ЕРИП
                    </Button>
                    <p className={cl.PayloadPage__Subtitle}>
                        Номер Вашего заказа 8100016925.
                        Действует до 05.07.2020
                    </p>
                    <p className={cl.PayloadPage__Subtitle}>
                        В течение 10 минут Вам будет отправлено SMS-сообщение с номером заказа и документ «Подтверждение заказа» на указанный Вами e-mail. Спасибо Вам за выбор нашей лаборатории !
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PayloadPage;