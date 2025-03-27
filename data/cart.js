export let cart;
loadFromStorage()
export function loadFromStorage(){
cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart= [{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionId:'1'
    },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId:'2'
    }];
}
}


function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}


export function addToCart(productId){

    let matchingItem;

        cart.forEach((cartitem) =>{
            if(productId===cartitem.productId){
                matchingItem=cartitem;
            }
        });

        if(matchingItem){
            matchingItem.quantity+=1;
        }
        else{
            cart.push({
                productId:productId,
                quantity:1,
                deliveryOptionId:'1'
            });

        }
        saveToStorage();
        
}

export function removeFromart(productId){
    const newCart=[];
    cart.forEach((cartItem) =>{
        if(cartItem.productId !==productId){
            newCart.push(cartItem);
        }
    });
    cart=newCart;
    saveToStorage();

}

export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;

    cart.forEach((cartitem) =>{
        if(productId===cartitem.productId){
            matchingItem=cartitem;
        }
    });
    
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}
export let products =[];


export function loadPCart(fun){

  const xhr =new XMLHttpRequest();
  xhr.addEventListener('load',()=>{
    console.log(xhr.response);
   
    
    fun();

  });
 
  xhr.open('GET','https://supersimplebackend.dev/Cart');
  xhr.send();
}
export async function loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    const text = await response.text();
    console.log(text);
    return text;
}

// Extra feature: make the cart empty after creating an order.
export function resetCart() {
  cart = [];
  saveToStorage();
}