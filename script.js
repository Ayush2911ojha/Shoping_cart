const btn = document.querySelector('.fa-cart-plus')
const close = document.querySelector('.fa-window-close')
const carts = document.querySelector('.carts')
const cart = document.querySelector('.cart')
const products = document.querySelector('.products')
const total = document.querySelector('.total')
const cartItems = document.querySelector('.cart-items')
const cartHead = document.querySelector('.cart-head')
const bannerBtn = document.querySelector('.buy-now')
const cartContent = document.querySelector('.cart-content')

let TotalAmountsum = 0
let productCount = 0

const productsContainer = document.createElement('div')
productsContainer.classList.add('products-center')

document.addEventListener('DOMContentLoaded', function () {
  if (productCount == 0) {
    cartHead.innerHTML = `Your Cart Is Empty !! `
  }

  // Fetch the JSON data
  fetch('./products.json')
    .then(response => response.json())
    .then(data => {
      // Process each item and display it
      data.items.forEach(item => {
        displayProduct(item)
      })

      const bagBtn = document.querySelectorAll('.bag-btn')
      // console.log(bagBtn)
      bagBtn.forEach(btn => {
        btn.addEventListener('click', (e) => { 
      
          // Retrieve the associated product element
          const selectedProduct = e.target.closest('.product')

          createCart(selectedProduct);

   
        })
      })

      //   to remove item from cart

      cartContent.addEventListener('click', e => {
        // console.log(cartContent)

        if (e.target.classList.contains('span')) {
          // console.log(e.target)
          remove(e)
          e.stopPropagation()

        }
         // for up icon and down icon
        else if (e.target.classList.contains('fa-chevron-up')) {
          increaseUp(e)
          e.stopPropagation()
        }
        
        else if (e.target.classList.contains('fa-chevron-down')) {
          decreaseDown(e)
          e.stopPropagation()
        }
      })

    })
    .catch(error => console.error('Error fetching data:', error))
  // console.log(carts)
  btn.addEventListener('click', () => {
    carts.classList.add('show-cart')
    cart.classList.add('transparentBcg')
    // document.querySelector('.hero').style.opacity = '0.4'
    // document.querySelector('.hero').style.display = "flex"
  })
  close.addEventListener('click', () => {
    carts.classList.remove('show-cart')
     cart.classList.remove('transparentBcg')
    // document.querySelector('.hero').style.opacity = '1'
  })
})


function displayProduct (item) {
  // console.log(item.fields);
  // console.log(item.fields.title);
  // console.log(item.fields.price);
  // console.log(item.fields);

  const product = document.createElement('article')
  product.classList.add('product')
  // product.setAttribute('data-product-id', item.sys.id)
  const imgContainer = document.createElement('div')
  imgContainer.classList.add('img-container')
  const img = document.createElement('img')
  img.classList.add('product-img')
  const btn = document.createElement('button')
  btn.classList.add('bag-btn')
  const icon = document.createElement('i')
  icon.classList.add('fas', 'fa-shopping-cart')

  btn.appendChild(icon)
  //  btn.textContent += ` Add to bag`;
  const buttonText = document.createTextNode('Add to bag')

  // Append the text node to the button
  btn.appendChild(buttonText)

  const h4 = document.createElement('h4')
  const h3 = document.createElement('h3')

  img.src = item.fields.image.fields.file.url
  h4.innerHTML = item.fields.title
  h3.innerHTML = `${item.fields.price}`

  imgContainer.appendChild(img)
  imgContainer.appendChild(btn)
  product.appendChild(h4)
  product.appendChild(h3)
  product.appendChild(imgContainer)
  product.appendChild(h4)
  product.appendChild(h3)
  productsContainer.appendChild(product)
  products.appendChild(productsContainer)
}

function remove (e) {
  const cartItem = e.target.closest('.cart-container')
  const removedPrice = parseFloat(cartItem.querySelector('.h4P').innerHTML)
  const Quantity = parseInt(cartItem.querySelector('p').innerHTML)
  
  // Update TotalAmountsum and display the total with 2 decimal places
  TotalAmountsum -= removedPrice * Quantity
  total.textContent = `Total Amount: $${TotalAmountsum.toFixed(2)}`

  // Update product count
  productCount = productCount - Quantity

  if (productCount == 0) {
    cartHead.innerHTML = `Your Cart Is Empty !!`
     }
  cartItems.innerHTML = `${productCount}`

  // Remove the cart item from the cartContent
  cartItem.remove()
}

function increaseUp (e) {
  console.log(e.target.closest('.qty'))
  const cartItem = e.target.closest('.cart-container')
  const price = cartItem.querySelector('.h4P').innerHTML
  console.log(price)
  const up = cartItem.querySelector('.fa-chevron-up')
  let paraqty = Number(cartItem.querySelector('p').innerHTML)
  console.log(paraqty)
  ++paraqty
 cartItem.querySelector('p').innerHTML = paraqty
 TotalAmountsum += parseFloat(price)
  total.textContent = `Total Amount: $${TotalAmountsum.toFixed(2)}`
  productCount++
  cartItems.innerHTML = `${productCount}`
}

function decreaseDown (e) {
  console.log(e.target.closest('.qty'))
  const cartItem = e.target.closest('.cart-container')
  const price = cartItem.querySelector('.h4P').innerHTML
  console.log(price)
  const up = cartItem.querySelector('.fa-chevron-up')
  let quantity = Number(cartItem.querySelector('p').innerHTML)
  if (quantity > 1) {
    quantity--
    cartItem.querySelector('p').innerHTML = quantity

    TotalAmountsum -= price
    total.textContent = `Total Amount: $${TotalAmountsum.toFixed(2)}`

    productCount--
    cartItems.innerHTML = `${productCount}`
  } else {
    // If quantity is 1 or less, remove the item
    remove(e)
  }
}

function createCart(selectedProduct) {

       // Retrieve specific information from the selected product
          const imgSrc = selectedProduct.querySelector('.product-img').src
          const title = selectedProduct.querySelector('h4').innerHTML
          const price = selectedProduct.querySelector('h3').innerHTML

          // Log or use the information as needed
          console.log('Selected Product:', {
            imgSrc: imgSrc,
            title: title,
            price: price
          })
  

          productCount++
          cartHead.innerHTML = 'Your Cart'
          bannerBtn.innerContent = 'Buy Now'
          cartItems.innerHTML = `${productCount}`
          TotalAmountsum = TotalAmountsum + Number(price)
          total.textContent = `Total Amount: $${TotalAmountsum.toFixed(2)}`
          // You can now use this information to add the product to the cart section
          // For example, you can create a new cart item element and append it to the cart

          

          const cartContainer = document.createElement('div')
          cartContainer.classList.add('cart-container')

          const img = document.createElement('img')
          img.classList.add('cart-img')

          img.src = imgSrc
          img.alt = `products images`
          cartContainer.appendChild(img)

          const cartInfo = document.createElement('div')
          cartInfo.classList.add('cart-info')
          const h4 = document.createElement('h4')
          const h4P = document.createElement('h4')
          h4P.classList.add('h4P')

          h4.innerHTML = title
          h4P.innerHTML = `${price}`
          const span = document.createElement('span')
          span.classList.add('span')
          span.innerHTML = 'remove'

          cartInfo.appendChild(h4)
          cartInfo.appendChild(h4P)
          cartInfo.appendChild(span)
          cartContainer.appendChild(cartInfo)

          const qty = document.createElement('div')
          qty.classList.add('qty')
          const iconUp = document.createElement('i')
          iconUp.classList.add('fas', 'fa-chevron-up')

          const paraQty = document.createElement('p')
          paraQty.innerHTML = 1
          const iconDown = document.createElement('i')
          iconDown.classList.add('fas', 'fa-chevron-down')

          qty.appendChild(iconUp)

          qty.appendChild(paraQty)
          qty.appendChild(iconDown)

          cartContainer.appendChild(qty)
          cartContent.appendChild(cartContainer)
}
