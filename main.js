

let carticon = document.querySelector("#carticon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

carticon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

const contenedorProductos = document.querySelector("#container");

const carritoContenedor = document.querySelector("#cartcontent");

const botonComprar = document.querySelector(".btn-buy");

const total = document.querySelector(".total-price");


const obtenerDatos = () => {
    fetch("datos.json")
    .then(response => response.json())
    .then((result) => {
        let datos = result;
        datos.forEach(product => {
            const productos = document.createElement("div")
            productos.classList.add("producto")
            productos.innerHTML = `
            <div class="shop-content">
            <div class="producto-box">
                <img class="product-img" src="${product.img}">
                <h2 class="product-title">${product.nombre}</h2>
                <span class="price">${product.precio}</span>
                <svg id="${product.id}" class="addCart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle><path d="M21 7H7.334L6.18 4.23A1.995 1.995 0 0 0 4.333 3H2v2h2.334l4.743 11.385c.155.372.52.615.923.615h8c.417 0 .79-.259.937-.648l3-8A1.003 1.003 0 0 0 21 7zm-4 6h-2v2h-2v-2h-2v-2h2V9h2v2h2v2z"></path></svg>
            </div>
            `
            contenedorProductos.appendChild(productos)

            const boton = document.getElementById(`${product.id}`)
            boton.addEventListener("click", () => {
                agregarCarrito(product.id)
            })

            const agregarCarrito = (prodId) => {
                const cantidadQ = carrito.some (prod => prod.id === prodId)

                if(cantidadQ) {
                    const prod = carrito.map (prod => {
                        if (prod.id === prodId) {
                            prod.cantidad++
                        }
                    })
                } else {

                const item = datos.find((prod) => prod.id === prodId)
                carrito.push(item) 
            }
            Toastify({
            
                text: "Producto anadido",
                
                duration: 1500
                
                }).showToast();
            actualizarCarrito() 
        }
        });
    })
}

obtenerDatos();

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        actualizarCarrito()
    }
})

const actualizarCarrito = () => {
    carritoContenedor.innerHTML = "";
    carrito.forEach((prod) => {
        const div = document.createElement("div")
        div.className = ("cartcontent")
        div.innerHTML = `
        <div class="cartcontent">
        <article class="cart-box">
        <img src="${prod.img}" class="cart-img">
        <div class="detail-box">
        <p class="cart-producto-titulo">${prod.nombre}</p>
        <span class="cart-price">${prod.precio}</span>
        <span class="cart-cantidad">Cantidad ${prod.cantidad}</span>
        </div>
        <svg id="cart-eliminar"  xmlns="http://www.w3.org/2000/svg" width="18" height="18"
        style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
        <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path>
        </svg>
        </article>
        </div>
        `
        carritoContenedor.append(div);
        div.querySelector("#cart-eliminar").addEventListener("click", deleteCartItem);
        localStorage.setItem("carrito",JSON.stringify(carrito))
    })
    total.innerText = carrito.reduce((acc, prod) => acc + JSON.parse(prod.precio), 0);
}


const deleteCartItem = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item);
    carrito.splice(indice,1)
    actualizarCarrito()
}


botonComprar.addEventListener("click",()=>{
    swal({
        calssName:"swal-modal",
        title:"Comprado",
        text: "Compra procesada",
        icon: "success",
      });
    carrito.length = 0
    actualizarCarrito()
})

