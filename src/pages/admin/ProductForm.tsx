import { useState, useEffect, type FormEvent } from "react";
import type { RequestProduct, ResponseProduct } from "../../types/product";

interface ProductFormProps {
  product?: ResponseProduct; // Update ise dolu gelir
  onSubmit: (formData: RequestProduct) => void;
}

function ProductForm({ product, onSubmit }: ProductFormProps) {
  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [desktopImage, setDesktopImage] = useState<File | null>(null);
  const [tabletImage, setTabletImage] = useState<File | null>(null);
  const [mobileImage, setMobileImage] = useState<File | null>(null);

  // Mevcut product geldiğinde state'leri güncelle
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
    }
  }, [product]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const requestData: RequestProduct = {
      name,
      price,
      stock,
      description,
      desktopImage: desktopImage || undefined,
      tabletImage: tabletImage || undefined,
      mobileImage: mobileImage || undefined,
    };
    onSubmit(requestData);
  };

  return (
    <form onSubmit={handleSubmit} className="container p-4">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">İsim</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ürün ismi"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Fiyat</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Fiyat"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Stok</label>
          <input
            type="number"
            className="form-control"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            placeholder="Stok"
          />
        </div>

        <div className="col-12">
          <label className="form-label">Açıklama</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ürün açıklaması"
            rows={3}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Desktop Görsel</label>
          {product?.image?.desktopUrl && !desktopImage && (
            <img
              src={product.image.desktopUrl}
              alt="Desktop"
              className="d-block mb-2"
              style={{ width: "100px", borderRadius: "4px" }}
            />
          )}
          <input
            type="file"
            className="form-control"
            onChange={(e) => setDesktopImage(e.target.files?.[0] || null)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Tablet Görsel</label>
          {product?.image?.tabletUrl && !tabletImage && (
            <img
              src={product.image.tabletUrl}
              alt="Tablet"
              className="d-block mb-2"
              style={{ width: "100px", borderRadius: "4px" }}
            />
          )}
          <input
            type="file"
            className="form-control"
            onChange={(e) => setTabletImage(e.target.files?.[0] || null)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Mobile Görsel</label>
          {product?.image?.mobileUrl && !mobileImage && (
            <img
              src={product.image.mobileUrl}
              alt="Mobile"
              className="d-block mb-2"
              style={{ width: "100px", borderRadius: "4px" }}
            />
          )}
          <input
            type="file"
            className="form-control"
            onChange={(e) => setMobileImage(e.target.files?.[0] || null)}
          />
        </div>

        <div className="col-12 mt-3">
          <button type="submit" className="btn btn-primary">
            {product ? "Güncelle" : "Ekle"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProductForm;
