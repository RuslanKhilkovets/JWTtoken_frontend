interface IShoppingCart {
    id: number;
    name: string;
    price: number;
    deadline: number;
}


export type TShoppingCart = {
    shoppingCartItems: IShoppingCart[]
}
