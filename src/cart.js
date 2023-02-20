let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");



let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};




let generateCarItems = () => {

  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket.map((x) => {
      let { id, item } = x
      let search = basket.find((y) => y.id === id) || []
      //let {img, name, price} = search
      return `
        <div class= "cart-item">
        <img src="${search.img}" alt="" />
        <div class="details">
        <div class="title-price">
            <h4>
                <p>${search.name}</p>
                <p class="cart-item-price">$${search.price}</p>
                <i onclick ="remove(${search.id})"class="bi bi-x-lg"></i>

            </h4>
           
        </div>
        
        <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item} </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
        <h3>$ ${item * search.price}</h3>
    </div>
    </div>
        
        `
    }).join(""));
  } else {
    ShoppingCart.innerHTML = ``
    label.innerHTML = `  <h2 style="margin-top: 40px;">Cart is empty</h2>
      <a href="index.html">

          <button class="HomeBtn">Back to home</button>
      </a>
      `
  }

};

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCarItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCarItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);

  document.getElementById(id).innerHTML = search.item;
  TotalAmount();

};

generateCarItems();


let remove = (id) => {

  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id)
  generateCarItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
}

let clearCart = () => {
  basket = [];
  generateCarItems();
  localStorage.setItem("data", JSON.stringify(basket));

}

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = basket.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    console.log(amount);
    label.innerHTML = `
    <h2 style="margin-top: 40px">Total Bill : $ ${amount}</h2>
    <button onclick="checkout()" class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};

let checkout = () =>{
  window.alert("Your order has been received");
}

TotalAmount();










