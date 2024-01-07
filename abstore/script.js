document.addEventListener("DOMContentLoaded", function() {

    const wrapper = document.querySelector(".sliderWrapper");
    const menuItem = document.querySelectorAll(".menuItem");

    //wrapper.style.transform = translateX(-400vw); every -100vw display the next item 

    const products = [
        {
            id: 1,
            title: "Sweater",
            price: 119,
            colors: [
                {
                    code: "black",
                    img: "./img/sweater.png",
                },
                {
                    code: "#FFC47E",
                    img: "./img/sweater2.png",
                },
            ],
            sizes: ["M", "L", "XL"]
        },

        {
            id: 2,
            title: "Backpack",
            price: 149,
            colors: [
                {
                    code: "lightgray",
                    img: "./img/backpack.png",
                },
                {
                    code: "#186F65",
                    img: "./img/backpack2.png",
                },
            ],
            sizes: ["30L", "50L", "80L"]
        },
        {
            id: 3,
            title: "Blazer",
            price: 109,
            colors: [
                {
                    code: "lightgray",
                    img: "./img/blazer.png",
                },
                {
                    code: "green",
                    img: "./img/blazer2.png",
                },
            ],
            sizes: [42, 43, 44]
        },
        {
            id: 4,
            title: "Jacket",
            price: 129,
            colors: [
                {
                    code: "#F4BBBB",
                    img: "./img/jacket.png",
                },
                {
                    code: "black",
                    img: "./img/jacket2.png",
                },
            ],
            sizes: ["M", "L", "XL"]
        },
        {
            id: 5,
            title: "t-shirt",
            price: 99,
            colors: [
                {
                    code: "#DBCC95",
                    img: "./img/t-shirt2.png",
                },
                {
                    code: "#A8A196",
                    img: "./img/t-shirt.png",
                },
            ],
            sizes: ["S", "M", "L"]
        },
    ];

    const addToCart = document.querySelector(".addToCart");

    //notification of the normal navbar
    var currentShippedItem = document.querySelector(".numberOfItem");

    //notification of the sidebar 
    var shippedItemNo = document.querySelector(".numberOfItem2");

    let productButtonArray = [];
    let productButtonData = {}; // Define productButtonData in the outer scope


    //retrieving data if any
    const storedArray = localStorage.getItem("productButtonArray");

    if(storedArray){
        productButtonArray = JSON.parse(storedArray);
        console.log(productButtonArray);
        if(productButtonArray.length != 0){

            if(window.innerWidth <= 1052){
                // for adding the notification of the cart  
                shippedItemNo.style.display = "flex";
                shippedItemNo.innerHTML = productButtonArray.length;
            }else{
                // controlling the notification of the item that being shipped
                currentShippedItem.style.display = "block"
                currentShippedItem.innerHTML = productButtonArray.length;
            }
        }
    }
    


    

    const currentProductImg = document.querySelector(".productImg");
    const currentProductTitle = document.querySelector(".productTitle");
    const currentProductPrice = document.querySelector(".productPrice");
    const currentProductColors = document.querySelectorAll(".color");
    const currentProductSizes = document.querySelectorAll(".size");

    // controlling the flow of the chosenProduct and indexOfColor as a default reference
    var chosenProduct = products[0];
    var indexOfColor = 0;

    

    menuItem.forEach((item, index) =>{

        item.addEventListener("click", () => {
            // control the index of the menuitem if the navTopMobile is being called the index might differ
            if(index >= products.length){
                index -= products.length;
            }
            
            //change the current slide
            wrapper.style.transform = `translateX(${-100 * index}vw)`; // Use backticks for proper string interpolation

            //resetting the indexOfColor to be sit as 0 when the item get loaded first
            indexOfColor = 0;

            //change the chosen product
            chosenProduct = products[index];

            //change text of current product 
            currentProductTitle.textContent = chosenProduct.title;

            currentProductPrice.textContent = "$" + String(chosenProduct.price);

            currentProductImg.src = chosenProduct.colors[0].img;

            //assign new color
            currentProductColors.forEach((color, index) => {
                color.style.backgroundColor = chosenProduct.colors[index].code;
            });

            //assigning sizes based on the item type
            document.querySelector(".size1").innerHTML = chosenProduct.sizes[0];
            document.querySelector(".size2").innerHTML = chosenProduct.sizes[1];
            document.querySelector(".size3").innerHTML = chosenProduct.sizes[2];
            
        });

    });

    
    //color of the item
    currentProductColors.forEach((color, index) => {
        color.addEventListener("click", ()=>{
            currentProductImg.src = chosenProduct.colors[index].img;
            indexOfColor = index;
        });
    });


    addToCart.addEventListener("click", function(){
        productButtonData = {
            imgSrc: chosenProduct.colors[indexOfColor].img,
            title: chosenProduct.title,
            detail: 'loremkjbf fjknagl kkgnal',
            seller: 'sneaker',
            warranty: '30 days warranty',
            price: chosenProduct.price
        };
        productButtonArray.push(productButtonData);
        console.log(productButtonArray);

        if(window.innerWidth <= 1052){
            shippedItemNo.style.display = "flex";
            shippedItemNo.innerHTML = productButtonArray.length;
        }else{
            // controlling the notification of the item that being shipped
            currentShippedItem.style.display = "block"
            currentShippedItem.innerHTML = productButtonArray.length;
        }

        localStorage.setItem('productButtonArray', JSON.stringify(productButtonArray));
    });

    currentProductSizes.forEach((size, index)=>{
        size.addEventListener("click", ()=>{
            // before changing the button to bg black and color white it will set all product back to the default color AND THEN change the intended size color
            currentProductSizes.forEach((size)=>{
                size.style.backgroundColor = "white";
                size.style.color = "black";
            });

            size.style.backgroundColor = "black";
            size.style.color = "white";
        });
    });

    //constrolling the flow of the navTopMobile

    const menuIcon = document.querySelector(".menuIcon");
    const crossIcon = document.querySelector(".crossIcon");
    const navTopMobile = document.querySelector(".navTopMobile");

    menuIcon.addEventListener("click", function(){
        navTopMobile.style.display = "flex";

        // adding the notification of items if exists
        shippedItemNo.style.display = "flex";
        shippedItemNo.innerHTML = productButtonArray.length;
    });

    crossIcon.addEventListener("click", function(){
        navTopMobile.style.display = "none";
    });

    //holder of the contact form & overlay
    const contactForm = document.querySelector(".contact");
    const overlay = document.querySelector('.overlay');

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

});
