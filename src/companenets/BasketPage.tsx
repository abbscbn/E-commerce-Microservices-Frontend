import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { removeItem, updateItemQuantity } from "../slices/basketSlice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { orderBasketService } from "../services/orderBasketService";

function BasketPage() {
  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 🔴 Sepetten ürün silme
  const handleRemoveItem = async (productId: number) => {
    if (!basket) return;
    try {
      const updatedBasket = {
        ...basket,
        items: basket.items.filter((i) => i.productId !== productId),
      };

      await orderBasketService.updateBasket(updatedBasket);
      dispatch(removeItem(productId));
    } catch (err) {
      console.error("Sepetten silme hatası:", err);
    }
  };

  // 🟢 Ürün miktarını güncelleme
  const handleUpdateQuantity = async (
    productId: number,
    newQuantity: number
  ) => {
    if (!basket) return;
    try {
      const updatedBasket = {
        ...basket,
        items: basket.items.map((i) =>
          i.productId === productId ? { ...i, quantity: newQuantity } : i
        ),
      };

      await orderBasketService.updateBasket(updatedBasket);
      dispatch(updateItemQuantity({ productId, quantity: newQuantity }));
    } catch (err) {
      console.error("Miktar güncelleme hatası:", err);
    }
  };

  if (!basket || basket.items.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h5">Sepetiniz boş</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate("/shop")}
        >
          Alışverişe Başla
        </Button>
      </Box>
    );
  }

  const totalPrice = basket.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Header />
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Sepetim
        </Typography>

        {basket.items.map((item) => (
          <Card
            key={item.productId}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
              p: 2,
            }}
          >
            {/* Ürün görseli */}
            <CardMedia
              component="img"
              sx={{ width: 100, borderRadius: 2 }}
              image={item.productImgUrl || "/placeholder.png"}
              alt={item.name}
            />

            {/* Ürün bilgileri */}
            <CardContent sx={{ flex: 1, ml: 2 }}>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Fiyat: <b>{item.price} ₺</b>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Seçilen Miktar: <b>{item.quantity}</b>
              </Typography>

              {/* Miktar butonları */}
              <Stack direction="row" spacing={1} mt={1}>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() =>
                    handleUpdateQuantity(item.productId, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() =>
                    handleUpdateQuantity(item.productId, item.quantity + 1)
                  }
                >
                  +
                </Button>
              </Stack>
            </CardContent>

            {/* Silme butonu */}
            <IconButton
              color="error"
              onClick={() => handleRemoveItem(item.productId)}
            >
              <DeleteIcon />
            </IconButton>
          </Card>
        ))}

        {/* Toplam fiyat */}
        <Box mt={3} textAlign="right">
          <Typography variant="h6">Toplam: {totalPrice} ₺</Typography>
          <Button variant="contained" color="success" sx={{ mt: 2 }}>
            Satın Al
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default BasketPage;
