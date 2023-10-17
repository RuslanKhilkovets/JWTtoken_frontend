export const getItemFromStorage = (itemName: string) => {
    const getItem = JSON.parse(localStorage.getItem(itemName));
    return getItem;
}


export const setItemInStorage = (itemName: string, itemData: any) => {
    const setItem = localStorage.setItem(itemName, JSON.stringify(itemData));
    return setItem;
}