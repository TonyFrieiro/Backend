import {faker} from "@faker-js/faker"

faker.locale = "es"

export const generateProduct = ()=>{
    return{
        nombre:faker.commerce.productName(),
        precio:faker.commerce.price(),
        foto:faker.image.fashion(200, 100,true)
    }
}


