const storedArray = localStorage.getItem("productButtonArray");
const parsedArray = JSON.parse(storedArray);

console.log(parsedArray);

const emptyCart = document.querySelector(".emptyCart");
const psTitle = document.querySelector(".psTitle");
const psPrice = document.querySelector(".psPrice");
const totalPrice = document.querySelector(".tpNumber");

let totalItemPrice = 0

//to display the block of the empty cart 
if(parsedArray.length === 0){
    emptyCart.style.display = "flex";
}

//checking for the existing of the array
if(storedArray){
    console.log(parsedArray);
    for(var i = 0; i < parsedArray.length; i++){
        addShippedItem(parsedArray[i].imgSrc, parsedArray[i].title, parsedArray[i].detail, parsedArray[i].seller, parsedArray[i].warranty);

        totalItemPrice += parsedArray[i].price;
    }

    //setting the price of the item
    psTitle.innerHTML = "Subtotal (" + parsedArray.length+ " item)";
    psPrice.innerHTML = "USD " + totalItemPrice.toFixed(2);
    totalPrice.innerHTML = "USD " + totalItemPrice.toFixed(2);
}else{
    console.log('array doesn\'t exist');
}


// const retrieve = require("./script");
// console.log(retrieve.productButtonArray);

//creating new element in this cart.html
function addShippedItem(imgSrc, title, detail, seller, warranty) {
    const shippingSlider = document.querySelector(".shippingSlider");

    // Create elements for the new shipped item
    const newShippedItem = document.createElement("div");
    newShippedItem.classList.add("shippedItem");

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = "";
    img.classList.add("itemImg");

    const itemDesc = document.createElement("div");
    itemDesc.classList.add("itemDesc");

    const itemTitle = document.createElement("span");
    itemTitle.classList.add("itemTitle");
    itemTitle.textContent = title;

    const itemDetails = document.createElement("span");
    itemDetails.classList.add("itemDetails");
    itemDetails.textContent = detail;

    const sellerName = document.createElement("span");
    sellerName.classList.add("sellerName");
    sellerName.innerHTML = `sold by <b>${seller}</b>`;

    const itemWarranty = document.createElement('span');
    itemWarranty.classList.add("warranty");
    itemWarranty.innerHTML = `<b>${warranty}</b>`;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add("removeBtn");

    const deleteImg = document.createElement("img");
    deleteImg.src = './img/delete.png';
    deleteImg.alt = "";
    deleteImg.classList.add('delete');

    const removeText = document.createTextNode('remove');
    removeBtn.appendChild(deleteImg);
    removeBtn.appendChild(removeText);

    itemDesc.appendChild(itemTitle);
    itemDesc.appendChild(itemDetails);
    itemDesc.appendChild(sellerName);
    itemDesc.appendChild(itemWarranty);
    itemDesc.appendChild(removeBtn);

    newShippedItem.appendChild(img);
    newShippedItem.appendChild(itemDesc);
    
    shippingSlider.appendChild(newShippedItem);
}


/*popping out the payment method*/
const productPayment = document.querySelector(".checkoutBtn");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");
const shippingCart = document.querySelector(".shippingCart");
const payBtn = document.querySelector(".payButton");

//overlay holder for bluring
const overlay = document.querySelector('.overlay');



productPayment.addEventListener("click", function(){
    payment.style.display = "flex";
    overlay.style.display = 'block'; // Show the overlay when contact form is displayed
});


close.addEventListener("click", ()=>{
    payment.style.display = "none";
    overlay.style.display = 'none'; // Hide the overlay when contact form is closed
});

payBtn.addEventListener("click", function(){
    payment.style.display = "none";
    overlay.style.display = 'none'; // Hide the overlay when contact form is closed
})




// fixed itemPrice to be visible with scrolling in the top 

// document.addEventListener("DOMContentLoaded", function() {

//     var itemPrice = document.querySelector('.itemPrice');
//     var initialOffset = itemPrice.getBoundingClientRect().top + window.scrollY;

//     window.addEventListener("scroll", function() {
//         var scrollTop = window.scrollY || window.pageYOffset; // Account for different browsers
//         if (scrollTop > initialOffset) {
//         itemPrice.classList.add('fixed');
//         } else {
//         itemPrice.classList.remove('fixed');
//         }
//     }); 
//     window.addEventListener("resize", function() {
//     initialOffset = itemPrice.getBoundingClientRect().top + window.scrollY; // Recalculate initialOffset on window resize
//     });
// });


//remove button action for the shippedItem 
const shippedItem = document.querySelectorAll(".shippedItem");

shippedItem.forEach((item, index) => {
    item.addEventListener("click", function(e){
        if(e.target.tagName === "BUTTON"){
            e.target.parentElement.parentElement.remove();

            //remove the item from the localStorage
            if(parsedArray.length != 0){
                totalItemPrice -= parsedArray[index].price;
                parsedArray.splice(index, 1);
                console.log(parsedArray);

                localStorage.setItem("productButtonArray", JSON.stringify(parsedArray));

                //resetting the order summary
                // timeout for the data to be processed at first so we prevent the runtime error
                // setTimeout(function() {
                //     localStorage.setItem("productButtonArray", JSON.stringify(parsedArray));
                // }, 1000);
                
                psTitle.innerHTML = "Subtotal (" + parsedArray.length+ " item)";
                psPrice.innerHTML = "USD " + totalItemPrice.toFixed(2);
                totalPrice.innerHTML = "USD " + totalItemPrice.toFixed(2);

                
                //checking for empty cart 
                if(parsedArray.length === 0){
                    emptyCart.style.display = "flex";
                    psTitle.innerHTML = "Subtotal (0 item)";
                    psPrice.innerHTML = "USD 0.00";
                    totalPrice.innerHTML = "USD 0.00";  
                }
            }
        }else{
            console.log("something went wrong");
        }
    })
});

//holder of the contact form
const contactForm = document.querySelector(".contact");



//controlling the contact pop out
const contactPopOut = document.querySelector(".fContact");

contactPopOut.addEventListener("click", function(){
    contactForm.style.display = "flex";
    contactForm.classList.remove("hide");
    contactForm.classList.add("show");
    overlay.style.display = 'block'; // Show the overlay when contact form is displayed
})

//controlling the cross of the contact form to close the pop out
const closeContactPopOut = document.querySelector(".close-contact-icon");

closeContactPopOut.addEventListener("click", function(){
    contactForm.style.display = "none";
    contactForm.classList.remove("show");
    contactForm.classList.add("hide");
    overlay.style.display = 'none'; // Hide the overlay when contact form is closed
})


