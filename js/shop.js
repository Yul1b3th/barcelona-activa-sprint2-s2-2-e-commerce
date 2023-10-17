// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
const products = [
 {
  id: 1,
  name: 'Cooking Oil',
  price: 10.5,
  type: 'grocery',
  offer: {
   number: 3,
   percent: 20,
  },
 },
 {
  id: 2,
  name: 'Pasta',
  price: 6.25,
  type: 'grocery',
 },
 {
  id: 3,
  name: 'Instant Cupcake Mixture',
  price: 5,
  type: 'grocery',
  offer: {
   number: 10,
   percent: 30,
  },
 },
 {
  id: 4,
  name: 'All-in-One',
  price: 260,
  type: 'beauty',
 },
 {
  id: 5,
  name: 'Zero Makeup Kit',
  price: 20.5,
  type: 'beauty',
 },
 {
  id: 6,
  name: 'Lip Tints',
  price: 12.75,
  type: 'beauty',
 },
 {
  id: 7,
  name: 'Lawn Dress',
  price: 15,
  type: 'clothes',
 },
 {
  id: 8,
  name: 'Lawn-Chiffon Combo',
  price: 19.99,
  type: 'clothes',
 },
 {
  id: 9,
  name: 'Toddler Frock',
  price: 9.99,
  type: 'clothes',
 },
];

// Array with products (objects) added directly with push(). Products in this array are repeated.
// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
let cartList = [],
 cart = [],
 subtotal = 0,
 discountAmount = 0,
 total = 0;

// References to HTML elements
const subTotalPrice = document.querySelector( '#subtotal-price' );
const descuentos = document.querySelector( '#descuentos' );
const totalPrice = document.querySelector( '#total-price' );
const cartListModal = document.querySelector( '#cart_list' );
const countProduct = document.querySelector( '#count_product' );
const inputElements = document.querySelectorAll( 'input[data-product-id]' );

// Exercise 4
function applyPromotionsCart() {
 discountAmount = 0;
 subtotal = cart.reduce( ( accumulator, product ) => {
  if ( product.offer && product.quantity >= product.offer.number ) {
   const productAmount = product.price * product.quantity;
   product.productDiscount = ( productAmount * product.offer.percent ) / 100;
   discountAmount += product.productDiscount;
  } else {
   product.productDiscount = 0;
  }
  return accumulator + product.price * product.quantity;
 }, 0 );
 descuentos.innerText = discountAmount.toFixed( 2 );
};

function updateButtonQuantitySpan( productId, newQuantity ) {
 const buttons = document.querySelectorAll( `button[data-product-id="${productId}"]` );
 buttons.forEach( ( button ) => {
  let quantitySpan = button.nextElementSibling;

  if ( newQuantity > 0 ) {
   if ( !quantitySpan ) {
    quantitySpan = document.createElement( 'span' );
    quantitySpan.classList.add( 'bg-dark' );
    button.parentNode.insertBefore( quantitySpan, button.nextSibling );
   }
   quantitySpan.textContent = newQuantity;
  } else if ( quantitySpan ) {
   quantitySpan.remove(); // Elimina el span si la cantidad es 0
  }
 } );
}

//agrega un elemento span en los botones de compra
function createButtonSpan( productId ) {
 const addButton = document.querySelector( `button[data-product-id="${productId}"]` );
 const quantitySpan = document.createElement( 'span' );
 quantitySpan.classList.add( 'bg-dark' )
 quantitySpan.textContent = '1';
 addButton.parentNode.insertBefore( quantitySpan, addButton.nextSibling );
};

// Exercise 1
function buy( id ) {
 const product = products.find( ( product ) => product.id === id );
 if ( !product ) {
  throw new Error( 'El producto no está disponible' );
 }

 cartList.push( { ...product } );
 countProduct.innerText = cartList.length;

 const cartItem = cart.find( ( item ) => item.id === id );
 applyPromotionsCart();

 if ( cartItem ) {
  cartItem.quantity++;
 } else {
  const newItem = { ...product, quantity: 1, productDiscount: 0 };
  cart.push( newItem );
 }

 const productId = id;
 const newQuantity = cartItem ? cartItem.quantity : 1;
 updateButtonQuantitySpan( productId, newQuantity ); // Cambio aquí
 calculateTotal();
 printCart();
}

// Exercise 2
function cleanCart() {
 cart = [];
 cartList = [];
 countProduct.innerText = '0';

 const inputElements = document.querySelectorAll( 'input[data-product-id]' );
 console.log( inputElements );

 inputElements.forEach( ( input ) => {
  const productId = parseInt( input.getAttribute( 'data-product-id' ) );
  input.value = 0;
  updateButtonQuantitySpan( productId, 0 );
 } );

 applyPromotionsCart();
 calculateTotal();
 printCart();
}

// Exercise 3
function calculateTotal() {
 subtotal = cart.reduce( ( acc, product ) => acc + product.price * product.quantity, 0 );
 total = subtotal - discountAmount;
 subTotalPrice.innerText = subtotal.toFixed( 2 );
 totalPrice.innerText = total.toFixed( 2 );
};

// Exercise 5
function printCart() {
 cartListModal.innerHTML = '';
 cart.forEach( ( product ) => {
  if ( product.quantity > 0 ) {
   const newRow = document.createElement( 'tr' );
   newRow.innerHTML = `
        <th>${product.name}</th>
        <td>$${product.price.toFixed( 2 )}</td>
        <td>
          <input type="number" class="form-control" data-product-id="${product.id}" value="${product.quantity}" min="0">
        </td>
        <td style="width:136px;">
          $${( product.price * product.quantity ).toFixed( 2 )}
          ${product.productDiscount > 0 ? `<span class="text-decoration-line-through text-dark fw-bold fst-italic ms-2"><samll>$${product.productDiscount}</small></span>` : ''}
        </td>
      `;

   const inputElement = newRow.querySelector( 'input' );
   configureInputChangeEvent( inputElement );
   cartListModal.appendChild( newRow );
  }
 } );
};

function configureInputChangeEvent( inputElement ) {
 inputElement.addEventListener( 'input', ( event ) => {
  const productId = parseInt( event.target.getAttribute( 'data-product-id' ) );
  let inputValue = event.target.value;

  // Remover cualquier carácter que no sea un número, incluyendo el signo negativo
  inputValue = inputValue.replace( /[^0-9]/g, '' );

  event.target.value = inputValue; // Establecer el valor limpio en el input

  const newQuantity = parseInt( inputValue );

  if ( newQuantity >= 0 ) {
   const cartProduct = cart.find( ( item ) => item.id === productId );

   if ( cartProduct ) {
    cartProduct.quantity = newQuantity;

    if ( cartProduct.offer ) {
     const { number, percent } = cartProduct.offer;
     if ( newQuantity >= number ) {
      cartProduct.productDiscount = ( cartProduct.price * percent ) / 100;
     } else {
      cartProduct.productDiscount = 0;
     }
    }

    // Llama a la función correcta, que es updateButtonQuantitySpan
    updateButtonQuantitySpan( productId, newQuantity );

    // Actualizar el contador de cartList
    const cartListItem = products.find( ( item ) => item.id === productId );
    cartList = cartList.filter( ( item ) => item.id !== productId );
    cartList.push( ...Array( newQuantity ).fill( cartListItem ) );

    countProduct.innerText = cartList.length;
   }

   applyPromotionsCart();
   calculateTotal();
   printCart();
  }
  // createOrUpdateQuantitySpan(productId, newQuantity); // Puedes comentar o eliminar esta línea
 } );
}

function openModal() {
 applyPromotionsCart();
 calculateTotal();
 printCart();
};

inputElements.forEach( ( input ) => {
 configureInputChangeEvent( input );
} );