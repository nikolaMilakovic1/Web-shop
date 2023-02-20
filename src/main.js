
let shop = document.getElementById("shop");

let shopItemsData = [
  {
    id: "prvi",
    name: "Jeans",
    price: 45,
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    img: "img/jeans.webp",

  },
  {
    id: "drugi",
    name: "Jacket",
    price: 100,
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    img: "./img/jacket.webp",

  },
  {
    id: "treci",
    name: "Scarf",
    price: 15,
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    img: "img/scarf.jpg",

  },
  {
    id: "cetvrti",
    name: "Sweater",
    price: 20,
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    img: "img/sweeter.jpg",

  },
  {
    id: "peti",
    name: "Bag",
    price: 30,
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    img: "img/bag.jpg",

  },
  {
    id: "sesti",
    name: "Shoes",
    price: 120,
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    img: "img/shoes.jpg",

  },
  {
    id: "sedmi",
    name: "Sunglasses",
    price: 10,
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    img: "img/sunglasses.webp",

  },
  {
    id: "osmi",
    name: "Trousers",
    price: 80,
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    img: "img/trousers.jpg",

  }
]



let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img, item } = x;
      let search = basket.find((x) => x.id === id);
      let quantity = 0;
      if (search != undefined) {
        quantity = search.item;
      }
      return `

      <div class=" item grid text-center" id="product-id-${id}" >
      <div class="details">
          <img src= ${img} class="card-img-top" alt="...">
              <h3>${name}</h3>
              <p>${desc}</p>
            <div class="price-quantity">
            <p class="cart-item-price">$${price}</p>
            <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">
             ${quantity > 0 ? quantity : 0} 
            </div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
        </div>
        </div>
  </div>
      `;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    let item = shopItemsData.find((x) => x.id == selectedItem.id);

    basket.push({
      id: item.id,
      name: item.name,
      img: item.img,
      price: item.price,
      item: 1,
    });
  } else {
    search.item += 1;
  }


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
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);

  document.getElementById(id).innerHTML = search.item;
  calculation()

};

let calculation = () => {

  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = (basket.map((x) => x.item).reduce((x, y) => x + y, 0));

}












