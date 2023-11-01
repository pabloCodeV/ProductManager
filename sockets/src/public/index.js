console.log('init my chat')
const cardContainer = document.getElementById('card-container')


const socket = io();

socket.on("connect", () => {
    console.log("customer connect")
});

socket.on("disconnect", () => {
    console.log("service maganer disconect")
});


socket.on("allProducts", allProducts => {
    cardContainer.innerHTML = ''
    console.log(allProducts)
    allProducts.forEach(product =>{
        let article = $(`<article class="card">
                            <input type="text" class="inputDelete" value="${product.id}" hidden/>
                            <div class="front-pic"><p>NO IMG</p></div>
                            <div class="data">
                                <h1>${product.title}</h1>
                                <p><b><i>${product.sku}<i></b></p>
                                <p>${product.price}</p>
                            </div>
                            <div class="center">  <button class="deleteProduct" data-id="${product.id}">Borrar</button></div>
                        </article>`)
                        cardContainer.append(article[0])
    })

    $('.deleteProduct').on('click', function() {
        const productId = $(this).data('id');

        socket.emit("deleteProduct", productId);
    });
    
    
});