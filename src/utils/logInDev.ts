const mode = import.meta.env.MODE;


export default function logInDev(...args: any[]){
    if(mode === "development"){
        console.log(...args)
    }
}