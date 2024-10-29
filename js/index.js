
// aos init
  AOS.init({
    once: true
  });



// magnifier
const magnifier = ()=>{

    let options = {
        offset: {vertical: 115, horizontal: -310},
        scale: .5,
        "zoomPosition": "right",
        "zoomLensStyle": "display:none;cursor: zoom-in;",
        "zoomStyle": "border: 1px solid #AB886D;scale:1.7;z-index:999999;"
    };
    new ImageZoom(document.getElementById("left1"), options);
}


// switch IMG
let img = document.querySelector('#switchIMG');

  document.querySelector('#swap').addEventListener('click',()=>{

    if(img.classList.contains('front')){//if have "front" class
       img.classList.remove('front');
       img.classList.add('back');
       img.src="./assets/pro2.png";

        //make magnifier active
        magnifier();

    }else{//if have "back" class
        img.classList.remove('back');
        img.classList.add('front');
        img.src="./assets/pro1.png";

           //make magnifier active 
        magnifier();

    }

  });



// check qty for discount
let totalPrice = document.querySelector('#totalPrice');
let qty = document.querySelector('#quantity');

// default discount
const discount = 5;

let youSave = document.querySelector('#youSave');

qty.addEventListener('keyup',()=>{


    if(qty.value === "1"){//if 1
        totalPrice.innerText="150";
        youSave.innerText="";
        document.querySelector('#discount').innerText = `0`;
    }else if(qty.value === ""){//if none
        youSave.innerText="";
        document.querySelector('#discount').innerText = `0`;
        totalPrice.innerText="0";
    }else{

        // check if > 10
        if(qty.value > 10){

            // multiply Quantity from base price
            let subTotal = qty.value*150;

            // set discount max to 50%
            let subDiscount = document.querySelector('#discount').innerText = `50`; 
            
            // get discount percentage total
            let calDiscount = (parseInt(subDiscount) / 100) * subTotal;

            // set saved (Minus 1 for round off)
            youSave.innerText=`You Save! ₱${calDiscount}`;

            // total price total - total discount
            totalPrice.innerText=subTotal-calDiscount;


            // if greater than or equal to 20 the order 
            if(qty.value >= 20){

                //get tag
                let plusQtyTag = document.querySelector("#plusQtyTag");
                //calculate quantity if how many need to add
                let qtyProcess = Math.floor(qty.value / 20);
                //display how many need to add
                plusQtyTag.innerText=`(+${qtyProcess})`;
            }

        }else{

            // for < 10 make every quantity multiple by 5 is equal to discount. (Max: 50%)
            let subTotal = qty.value*150;

        let subDiscount = document.querySelector('#discount').innerText = `${discount*qty.value}`; 

        let calDiscount = (parseInt(subDiscount) / 100) * subTotal;

        youSave.innerText=`You Save! ₱${calDiscount}`;

        totalPrice.innerText=subTotal-calDiscount;
        }
    }

});


// place order

document.querySelector('#placeOrder').addEventListener('click',()=>{
    
    let fullname = document.querySelector('#fullname');
    let address = document.querySelector('#address');
    let contactNumber = document.querySelector('#contactNumber');
    let emailAddress = document.querySelector('#emailAddress');
    let quantity = document.querySelector('#quantity');
    let totalPrice = document.querySelector('#totalPrice');



    if(fullname.value === "" || address.value === "" || contactNumber.value === "" || emailAddress.value === "" || quantity.value ===""){//check if empty
        swal("Please fill up all information", "", "error");
    }else if(quantity.value >= 20){//if >= 20 the quantity

            //get innerText of qty plus
            let getPlusQty = document.querySelector("#plusQtyTag").innerText;

            // all data
            let params = {

                fullName: fullname.value,
                address: address.value,
                contactNum: contactNumber.value,
                emailAddress: emailAddress.value,
                quantity: `${quantity.value}${getPlusQty}`,
                discount: `${document.querySelector('#discount').innerText}%`,
                total: `₱${totalPrice.innerText}`
        
            }
                // send email
            emailjs.send("service_l6rd7e7","template_6tm668u",params);
    swal("Place Order Success!", "", "success");
        

    }else{

            // if < 19 the quantity
        let params = {

            fullName: fullname.value,
            address: address.value,
            contactNum: contactNumber.value,
            emailAddress: emailAddress.value,
            quantity: quantity.value,
            discount: `${document.querySelector('#discount').innerText}%`
    
        }
            // send email
        emailjs.send("service_l6rd7e7","template_6tm668u",params);
    swal("Place Order Success!", "", "success");

    }

});



// media
const media = window.matchMedia('(min-width: 926px)');

// check media
if (media.matches) { 
    
    magnifier();

  }else{

    let swiper = new Swiper(".left2", {
        slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }

      });

  }
