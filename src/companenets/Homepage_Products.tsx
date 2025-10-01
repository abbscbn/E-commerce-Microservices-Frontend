import { useEffect, useState } from "react";
import { productService } from "../services/productService";
import type { ResponseProduct } from "../types/product";
import { Link } from "react-router-dom";

function Homepage_Products() {
  const [products, setProducts] = useState<ResponseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // backend page index 0'dan başlar
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response:any = await productService.getAllProductsWithPageable(
          currentPage,
          productsPerPage
        );

        // Eğer axios direkt response.data dönüyorsa:

        setProducts(response.content || []);
        setTotalPages(response.totalPages || 1);
      } catch (err) {
        console.error("Ürünler alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  if (loading) return <div className="text-center p-5">Yükleniyor...</div>;

  return (
    <div className="p-5">
      <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        {products.map((product) => (
          <div className="col mb-5" key={product.id}>
            <div className="card h-100 shadow-sm">
              {product.stock < 5 && (
                <div
                  className="badge bg-danger text-white position-absolute"
                  style={{ top: "0.5rem", right: "0.5rem" }}
                >
                  Son {product.stock}!
                </div>
              )}
              <img
                className="card-img-top"
                src={
                  product.image?.desktopUrl ||
                  "https://via.placeholder.com/450x300"
                }
                alt={product.name}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body p-4">
                <div className="text-center">
                  <h5 className="fw-bolder">{product.name}</h5>
                  <span className="fw-semibold text-primary">
                    {product.price} ₺
                  </span>
                </div>
              </div>
              <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div className="text-center">
                  <Link
                    to={`/product-details?id=${product.id}`}
                    className="btn btn-outline-dark mt-auto"
                  >
                    Detaya Git
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Kontrolleri */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Önceki
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setCurrentPage(i)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages - 1 ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Sonraki
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Homepage_Products;
