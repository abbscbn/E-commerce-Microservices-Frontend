import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  clearBasket,
  removeItem,
  updateItemQuantity,
} from "../slices/basketSlice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { orderBasketService } from "../services/orderBasketService";
import { orderService } from "../services/orderService";
import { productService } from "../services/productService";

function BasketPage() {
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [issuccess, setIssucces] = useState(false);
  const [isfaild, setIsfaild] = useState(false);
  const [fullMessageArray, setFullMessageArray] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

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

  // 🟣 Sipariş oluşturma
  const handleCreateOrder = async () => {
    if (!basket || !user) return;
    try {
      const orderItems = basket.items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        price: i.price,
      }));

      const createdOrder = await orderService.createOrder(user.id, orderItems);

      setSnackbarMessage("Siparişiniz işleniyor...");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);

      const checkOrderStatus = async (orderId: number, retries = 10) => {
        for (let i = 0; i < retries; i++) {
          await new Promise((res) => setTimeout(res, 3000));
          const orders = await orderService.getOrderByUserId(user.id);

          const currentOrder = orders.find((o) => o.id === orderId);

          if (!currentOrder) return;

          if (currentOrder.status === "CONFIRMED") {
            setSnackbarMessage("Siparişiniz başarıyla tamamlandı 🎉");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);

            dispatch(clearBasket());
            await orderBasketService.deleteBasketByUserId(user.id);

            setIssucces(true);
            return;
          }

          if (currentOrder.status === "FAILED") {
            const messageArray: string[] = [];
            if (currentOrder.failedMessages?.length) {
              for (let i = 0; i < currentOrder.failedMessages.length; i++) {
                const product = await productService.getProductByProductId(
                  currentOrder.failedMessages[i].productId
                );
                const productName = product.name;
                const message = currentOrder.failedMessages[i].message;
                messageArray.push(`${productName} için ${message}`);
              }
            }
            setFullMessageArray(messageArray);
            setIsfaild(true);
            return;
          }
        }

        setSnackbarMessage(
          "Sipariş durumu doğrulanamadı. Lütfen daha sonra kontrol edin."
        );
        setSnackbarSeverity("warning");
        setSnackbarOpen(true);
      };

      checkOrderStatus(createdOrder.id);
    } catch (err) {
      console.error("Sipariş oluşturma hatası:", err);
      setSnackbarMessage("Sipariş oluşturulamadı. Lütfen tekrar deneyin.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const totalPrice = basket?.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ❌ Başarısız sipariş sayfası
  if (isfaild) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#fff5f5"
      >
        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
          <Typography variant="h4" gutterBottom color="error.main">
            Siparişiniz Gerçekleştirilemedi 😔
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Aşağıdaki hatalar nedeniyle siparişiniz tamamlanamadı:
          </Typography>
          <Box textAlign="left" mb={3}>
            {fullMessageArray.map((msg, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{
                  p: 1.5,
                  mb: 1,
                  borderColor: "error.light",
                  bgcolor: "#fff0f0",
                }}
              >
                <Typography variant="body2" color="error.dark">
                  • {msg}
                </Typography>
              </Paper>
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Lütfen hatalı ürünleri sepetinizden çıkararak tekrar deneyin.
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/")}
            sx={{ borderRadius: 2, px: 4 }}
          >
            Alışverişe Geri Dön
          </Button>
        </Paper>
      </Box>
    );
  }

  // ✅ Başarılı sipariş sayfası
  if (issuccess) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f5f9f6"
      >
        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            maxWidth: 500,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
          <Typography variant="h4" gutterBottom color="success.main">
            Siparişiniz Başarılı! 🎉
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Siparişiniz başarıyla alınmıştır. En kısa sürede hazırlanıp size
            ulaştırılacaktır.
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/")}
            sx={{ borderRadius: 2, px: 4 }}
          >
            Alışverişe Devam Et
          </Button>
        </Paper>
      </Box>
    );
  }

  // 🛒 Sepet sayfası
  return (
    <div>
      <Header />
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Sepetim
        </Typography>

        {basket?.items.map((item) => (
          <Card
            key={item.productId}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
              p: 1,
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 100, borderRadius: 1 }}
              image={item.productImgUrl || "/placeholder.png"}
              alt={item.name}
            />

            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Birim Fiyat: {item.price.toFixed(2)} ₺
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Miktar: {item.quantity}
              </Typography>

              <Box mt={1}>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() =>
                    handleUpdateQuantity(item.productId, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  sx={{ mr: 1 }}
                >
                  -
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  onClick={() =>
                    handleUpdateQuantity(item.productId, item.quantity + 1)
                  }
                >
                  +
                </Button>
              </Box>
            </CardContent>

            <IconButton
              color="error"
              onClick={() => handleRemoveItem(item.productId)}
              sx={{ ml: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Card>
        ))}

        <Box mt={3} textAlign="right">
          <Typography variant="h6">Toplam: {totalPrice?.toFixed(2)} ₺</Typography>
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            onClick={handleCreateOrder}
          >
            Satın Al
          </Button>
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
}

export default BasketPage;
