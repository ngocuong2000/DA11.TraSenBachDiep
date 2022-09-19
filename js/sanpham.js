$('.nav-link-cart').click(function(){
    $('.cart-wrap').css({
        'display':'block',
    });
});

$('.cart-close').click(function(){
    $('.cart-wrap').css({
        'display':'none',
    });
});


const allproduct = []
const btns = $('.btn-product')
const parent_btns = $('.main__list-outside')
const span_quantity = document.querySelector('.header .header-all .header-right .header-right-info span')
var allcoast = 0

for (let i = 0; i < btns.length; i++) {
    $(btns[i]).click(()=>{
        var add = true
        var quantity = 1
        var img = $('.main__list-outside .item-card .item-card-link .item-img img')[i].innerText
        var name = $('.main__list-outside .item-card .item-card-link .item-name')[i].innerText
        var coast = parseInt($('.main__list-outside .item-card .item-card-link .item-btm .mb-0')[i].children[0].innerText).toFixed(4)
        var total = (parseInt(quantity) * coast).toFixed(4)
        var infoProduct = new Array(img, name, coast, quantity, total)
        allcoast += parseInt(total)
        allcoast = parseInt(allcoast)

        for (let j = 0; j < allproduct.length; j++) {
            if (name === allproduct[j][0]) {
                add = false
                allproduct[j][2] += 1
                allproduct[j][3] = parseInt(allproduct[j][2] * allproduct[j][1]).toFixed(4)
                console.log(allproduct);
                break
            }
        }
        if (add) {
            allproduct.push(infoProduct)
        }

        sessionStorage.setItem("allproduct", JSON.stringify(allproduct))

        showProduct()
        totalproduct()
        addQuantity()

    })
}

function totalproduct() {
    $('.cart-wrap-content-2 .total').text(allcoast) 
}

function showProduct() {
    var allproduct = JSON.parse(sessionStorage.getItem("allproduct"))
    if (allproduct) {
        var show = document.querySelector('.cart-wrap .cart-wrap-content')
        var t=""

        for (let i = 0; i < allproduct.length; i++) {
            if (show) {
                t +=`
                <div class="d-flex cart-wrap-content-1">
                    <div class="cart-wrap-content-img">
                        ${allproduct[i][0]}
                    </div>
                    <div class="cart-wrap-content-info">
                        <h3>${allproduct[i][1]}</h3>
                        <p class="price" data-value="2000">Đơn giá: ${allproduct[i][2]}</p>
                        <input type="number" name="soLuong" id="soLuong" value="1" min="1">${allproduct[i][3]}
                        <p class="thanh-tien" data-value="2000">Thành tiền: ${allproduct[i][4]}</p>
                    </div>
                    <button onclick="deleteProduct(this)" class="delete">xóa</button>
                </div>
                `
            }            
        }
        show.innerHTML = t
    }
}

function deleteProduct(e) {

    for (let i = 0; i < allproduct.length; ++i) {
        if (e.parentElement.parentElement.children[0].children[0].innerText == allproduct[i][0]) {
            allcoast -= allproduct[i][2]
            allproduct.splice(i, 1)
            sessionStorage.setItem("allproduct", JSON.stringify(allproduct))
            totalproduct()
            showProduct()
            addQuantity()

        }
    }
}


function deleteAll() {
    // allproduct = []
    sessionStorage.setItem("allproduct", JSON.stringify([]))
    allcoast = 0

    showProduct()
    totalproduct()
    addQuantity()

}

function addQuantity() {
    document.getElementById('quantity').innerText = allproduct.length
    span_quantity.classList.add('changeSpan')
    setTimeout(() => {
        span_quantity.classList.remove('changeSpan')
    }, 200)
}