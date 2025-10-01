import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productService } from "../../services/productService";
import type { ResponseProduct } from "../../types/product";

function ProductList() {
  const [products, setProducts] = useState<ResponseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/admin-dashboard/products/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      try {
        await productService.deleteProductByProductId(id);
        setProducts(products.filter((p) => p.id !== id));
      } catch (err: any) {
        console.error(err.message);
      }
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 text-gray-800">Ürünler</h1>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin-dashboard/products/new")}
        >
          Yeni Ürün Ekle
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Görsel</th>
            <th>İsim</th>
            <th>Fiyat</th>
            <th>Stok</th>
            <th>Açıklama</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                {p.image?.desktopUrl ? (
                  <img
                    src={p.image.desktopUrl}
                    alt={p.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEdit(p.id)}
                  />
                ) : (
                  <span>Yok</span>
                )}
              </td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>{p.description}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(p.id)}
                >
                  Düzenle
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(p.id)}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
