//Use jquery to listen for eventkey up
//Send request to ../instant-search 
//Parse response and update view 

// $("#q2").keyup(function () {
//     $("#q2").css("background-color", "white");

// });
// $("#q2").keydown(function () {
//     $("#q2").css("background-color", "yellow");
// });

$("#q2").keyup(() => {
    $("#productSearchResults").empty()

    $.ajax({
        url: "/api/products/instant-search",
        dataType: 'json',
        data: {
            q2: $("#q2").val()
        },
        method: 'POST',

        success: (result) => {
            console.log(result.products);

            for (item of result.products) {
                $("#productSearchResults").append(
                    `<div class="col">
                        <div class="card">
                            <a href="/api/products/${item._id}">
                            <img class="card-img-top" src="/images/trumpass.jpg" alt="Card image cap" />
                            </a>
                            <div class="card-body">
                                <h5 class="card-title">Name:${item._source.name}</h5>
                                <p class="card-text">Category: ${item._source.category.name}</p>
                                <p class="card-text">$ ${item._source.price}</p>
                            
                            </div>
                        </div>
                    </div>
                    `
                )
            }
        }
    });
});

http://localhost:3000/api/products/5dbb3261831b2500170165e2
{/* <form class='form-inline my-2 my-lg-12' action="/api/products/instant-search" method="POST">
    <input type="text" class="form-control mr-ms-2 col-lg-11" placeholder="Search" aria-label="Search" id='q2'
        name="q2">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> */}