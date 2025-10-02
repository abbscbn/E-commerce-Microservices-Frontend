import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { productService } from "../services/productService";
import type { ResponseProduct } from "../types/product";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addItem, setBasket } from "../slices/basketSlice";
import { Snackbar, Alert } from "@mui/material"; // MUI snackbar
import { orderBasketService } from "../services/orderBasketService";

function Product_Details() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { basket } = useAppSelector((state) => state.basket);

  const [product, setProduct] = useState<ResponseProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ResponseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState<number>(1);

  const [openSnackbar, setOpenSnackbar] = useState(false); // snackbar state

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const productId = queryParams.get("id");

  useEffect(() => {
    const fetchProduct = async () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (!productId) return;
      try {
        const data = await productService.getProductByProductId(
          Number(productId)
        );
        setProduct(data);

        // Related Products: rastgele 4 ürün

        const res: any = await productService.getAllProductsWithPageable(0, 8);

        const pageableAllProducts: ResponseProduct[] = res.content;

        const filtered = pageableAllProducts
          .filter((p) => p.id !== Number(productId))
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Ürün alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;
    if (quantity <= 0 || Number.isNaN(quantity)) {
      alert("Miktar 0'dan büyük olmalıdır");
      return;
    }

    try {
      let updatedBasket;

      if (!basket || !basket.items || basket.items.length === 0) {
        // ✅ İlk ürün ekleniyor → saveBasket
        const newBasket = {
          // backend ignore edecek
          userId: user?.id, // buraya auth.user.id koyabilirsin
          items: [
            {
              // backend otomatik verecek
              productId: product.id,
              quantity,
            },
          ],
        };
        updatedBasket = await orderBasketService.saveBasket(newBasket);
      } else {
        // ✅ Zaten sepet var → updateBasket
        const existingItems = basket.items.map((i) => ({ ...i })); // <-- deep copy

        const itemIndex = existingItems.findIndex(
          (i) => i.productId === product.id
        );

        if (itemIndex > -1) {
          // ürün zaten sepette → miktarı artır
          existingItems[itemIndex] = {
            ...existingItems[itemIndex],
            quantity: existingItems[itemIndex].quantity + quantity,
          };
        } else {
          // ürün yeni → pushla
          existingItems.push({
            productId: product.id,
            quantity,
          });
        }

        const newBasket = {
          ...basket, // eski basket’in shallow copy’si
          items: existingItems,
        };

        updatedBasket = await orderBasketService.updateBasket(newBasket);
      }
      console.log(updatedBasket);
      // ✅ Redux’a güncel sepeti yaz
      dispatch(setBasket(updatedBasket));
      console.log("son nokta");
      setQuantity(1);
      setOpenSnackbar(true);
    } catch (err) {
      console.error("Sepet güncellenemedi:", err);
      alert("Sepet güncellenemedi");
    }
  };

  if (loading) return <div className="text-center p-5">Yükleniyor...</div>;
  if (!product) return <div className="text-center p-5">Ürün bulunamadı</div>;

  return (
    <>
      <section className="py-1">
        <div className="container px-5 px-lg-5 my-1">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={
                  product.image?.desktopUrl ||
                  "https://via.placeholder.com/600x700"
                }
                alt={product.name}
              />
            </div>
            <div className="col-md-6">
              <h1 className="display-5 fw-bolder">{product.name}</h1>

              <div className="mb-3">
                <strong>ID:</strong> {product.id}
              </div>
              <div className="mb-3">
                <strong>Fiyat:</strong> {product.price} ₺
              </div>
              <div className="mb-3">
                <strong>Stok:</strong>{" "}
                {product.stock > 0 ? (
                  <span className="text-success">{product.stock}</span>
                ) : (
                  <span className="text-danger">Stokta Yok</span>
                )}
              </div>
              <div className="mb-3">
                <strong>Açıklama:</strong>
                <p>{product.description}</p>
              </div>

              <div className="d-flex align-items-center">
                <input
                  className="form-control text-center me-3"
                  id="inputQuantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.valueAsNumber || 1)}
                  style={{ maxWidth: "4rem" }}
                  min={1}
                  step={1}
                />
                <button
                  onClick={handleAddToCart}
                  className="btn btn-outline-dark flex-shrink-0"
                  type="button"
                  disabled={product.stock <= 0}
                >
                  <i className="bi-cart-fill me-1" />
                  Sepete Ekle
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-5 bg-light">
          <div className="container px-4 px-lg-5 mt-5">
            <h2 className="fw-bolder mb-4">İlgili Ürünler</h2>
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {relatedProducts.map((p) => (
                <div className="col mb-5" key={p.id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      className="card-img-top"
                      src={
                        p.image?.desktopUrl ||
                        "https://via.placeholder.com/450x300"
                      }
                      alt={p.name}
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                    <div className="card-body p-4">
                      <div className="text-center">
                        <h5 className="fw-bolder">{p.name}</h5>
                        <span className="fw-semibold text-primary">
                          {p.price} ₺
                        </span>
                      </div>
                    </div>
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center">
                        <Link
                          to={`/product-details?id=${p.id}`}
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
          </div>
        </section>
      )}

      {/* ✅ Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Ürün sepete eklendi!
        </Alert>
      </Snackbar>
    </>
  );
}

export default Product_Details;
