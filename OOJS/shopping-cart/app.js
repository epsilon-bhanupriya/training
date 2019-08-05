let products;
// to fetch JSON Data
fetch(`products.json`)
    .then(function (response) {
        return response.json();
    })
    .then(function (res) {
        products = res;
        listing.createTemplate(res);
    })
    .catch(error => console.error('Error:', error));

let listing = {
    createTemplate: (res) => {
        let outputTemplate = '';
        res.map((product) => {
            outputTemplate += listing.productTemplate(product)
        })

        document.getElementById('shoppingItems').innerHTML = outputTemplate;
    },
    productTemplate: (data) => {
        return `
        <div class="shop-item">
            <span class="shop-item-title">${data.productName}</span>
            <img class="shop-item-image" src="${data.productImage}">
            <div class="shop-item-details">
                <span class="shop-item-price">&#8377; ${data.productPrice}</span>
                <button class="btn btn-primary shop-item-button" type="button" onclick="addToCart(${data.productId})">ADD TO CART</button>
            </div>
        </div>`
    },
    cartTemplate: (data) => {
        return `<div class="cart-container"><div class="cart-item cart-column">
            <img class="cart-item-image" src="${data.productImage}" width="100" height="100">
            <span class="cart-item-title">${data.productName}</span>
        </div>
        <span class="cart-price cart-column">&#8377; ${data.productPrice}</span>
        <div class="cart-quantity cart-column">
            <input onkeyup="updatePrice(${data.productId})" id="${data.productId}" onchange="updatePrice(${data.productId})" class="form-control" type="number" value="1" min="1" max="5" />
            <button class="btn btn-danger" type="button" onclick="deleteItem(${data.productId})">REMOVE</button>
        </div></div>`
    }
};

class cartItem {
    constructor(cart) {
        this.productId = cart.productId;
        this.productName = cart.productName;
        this.productPrice = cart.productPrice;
        this.productImage = cart.productImage;
    }
}

let cartArr = []
//let x = [];
addToCart = (itemId) => {
    let currProduct = products.filter((prod) => {
        return prod.productId === itemId
    })
    let currCartItem = new cartItem(currProduct[0]);
    const found = cartArr.some(el => el.productId === itemId);
    if (!found) cartArr.push(currCartItem);
    localStorage.cartItems = JSON.stringify(cartArr);
    loadCartItems();
    //x = itemId;
}

loadCartItems = () => {
    let cartItems = JSON.parse(localStorage.cartItems)
    let cartItemTemp = ''
    let totalPrice = 0;
    cartItems.map((item) => {
        cartItemTemp += listing.cartTemplate(item)
        totalPrice += item.productPrice
    })
    document.getElementById('cartItems').innerHTML = cartItemTemp;
    document.getElementById('total').innerHTML = "&#8377; " + totalPrice;

}

loadCartItems();

deleteItem = (prodId) => {
    let cartItems = JSON.parse(localStorage.cartItems)
    let currCartItem = cartItems.filter((item) => {
        return item.productId !== prodId
    })
    
    localStorage.cartItems = JSON.stringify(currCartItem);
    loadCartItems();
    location.reload();
}

updatePrice = (prodId) => {
    let cartItems = JSON.parse(localStorage.cartItems);
    let currQty = document.getElementById(prodId).value;

    let totalPrice = 0;
    cartItems.map((item) => {
        if (item.productId === prodId) {
            totalPrice += item.productPrice * currQty;
        } else {
            totalPrice += item.productPrice
        }
    })
    document.getElementById('total').innerHTML = "&#8377; " + totalPrice;
}


//Object.entries(x).map((object) => {

//    object[1].addEventListener("click", function () {
//        alert();
//        // Output innerHTML of the clicked element
//        console.log("Hello " + this +
//            " (" + this.innerHTML + ") from map method...");
//    });
//});

