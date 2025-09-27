function Homepage_Products() {
  const products = [
    {
      name: "Fancy Product",
      price: "$40.00 - $80.00",
      img: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    },
    {
      name: "Special Item",
      price: "$18.00",
      oldPrice: "$20.00",
      img: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
      sale: true,
      rating: 5,
    },
    {
      name: "Fancy Product",
      price: "$40.00 - $80.00",
      img: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    },
    {
      name: "Fancy Product",
      price: "$40.00 - $80.00",
      img: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    },
    {
      name: "Fancy Product",
      price: "$40.00 - $80.00",
      img: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    },
    {
      name: "Fancy Product",
      price: "$40.00 - $80.00",
      img: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    },
    {
      name: "Fancy Product",
      price: "$40.00 - $80.00",
      img: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    },
    {
      name: "Fancy Product",
      price: "$40.00 - $80.00",
      img: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    },
  ];
  return (
    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center p-5">
      {products.map((product, index) => (
        <div className="col mb-5" key={index}>
          <div className="card h-100">
            {product.sale && (
              <div
                className="badge bg-dark text-white position-absolute"
                style={{ top: "0.5rem", right: "0.5rem" }}
              >
                Sale
              </div>
            )}
            <img
              className="card-img-top"
              src={product.img}
              alt={product.name}
            />
            <div className="card-body p-4">
              <div className="text-center">
                <h5 className="fw-bolder">{product.name}</h5>
                {product.rating && (
                  <div className="d-flex justify-content-center small text-warning mb-2">
                    {Array.from({ length: product.rating }).map((_, i) => (
                      <div className="bi-star-fill" key={i} />
                    ))}
                  </div>
                )}
                {product.oldPrice && (
                  <span className="text-muted text-decoration-line-through">
                    {product.oldPrice}
                  </span>
                )}{" "}
                {product.price}
              </div>
            </div>
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div className="text-center">
                <a
                  className="btn btn-outline-dark mt-auto"
                  href="product-details"
                >
                  {product.sale ? "Detaya Git" : "Detaya Git"}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Homepage_Products;
