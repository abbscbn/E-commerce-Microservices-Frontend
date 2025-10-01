import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { productService } from "../../services/productService";
import type { ResponseProduct, RequestProduct } from "../../types/product";

function ProductFormWrapper() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ResponseProduct | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      productService.getProductByProductId(Number(id)).then(setProduct);
    }
  }, [id]);

  const handleSubmit = async (data: RequestProduct) => {
    try {
      if (id) {
        await productService.updateProductByProductId(Number(id), data);
      } else {
        await productService.createProduct(data);
      }
      navigate("/admin-dashboard/products");
    } catch (err) {
      console.error(err);
    }
  };

  return <ProductForm product={product} onSubmit={handleSubmit} />;
}

export default ProductFormWrapper;
