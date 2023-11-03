import Button from "../../components/UI/Button/Button";


import cl from "./PayloadPage.module.scss"


export const PayloadPage = () => {
    localStorage.removeItem("formData");
    return(
        <div className={cl.Tab4}>
            <div className={cl.Tab4__Container}>
                <div className={cl.Tab4__Image}></div>
                <div className={cl.Tab4__Content}>
                    <p className={cl.Tab4__Title}>
                        Предварительный заказ успешно оформлен. Осталось оплатить Ваш заказ
                    </p>
                    <Button active>
                        ОПЛАТИТЬ В ЕРИП
                    </Button>
                    <p className={cl.Tab4__Subtitle}>
                        Номер Вашего заказа 8100016925.
                        Действует до 05.07.2020
                    </p>
                    <p className={cl.Tab4__Subtitle}>
                        В течение 10 минут Вам будет отправлено SMS-сообщение с номером заказа и документ «Подтверждение заказа» на указанный Вами e-mail. Спасибо Вам за выбор нашей лаборатории !
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PayloadPage;