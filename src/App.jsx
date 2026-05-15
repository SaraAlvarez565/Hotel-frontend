import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";
import Success from "./pages/Success";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import ReservationHistory from "./pages/ReservationHistory";
import Reserve from "./pages/Reserve";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layout/Layout";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />

        <Route path="/product/:id" element={
          <Layout>
            <ProductDetail />
          </Layout>
        } />

        <Route path="/login" element={
          <Layout>
            <Login />
          </Layout>
        } />

        <Route path="/register" element={
          <Layout>
            <Register />
          </Layout>
        } />

        <Route path="/favorites" element={
          <Layout>
            <Favorites />
          </Layout>
        } />

        <Route path="/history" element={
          <ProtectedRoute>
            <Layout>
              <ReservationHistory />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/reserve/:id" element={
          <Layout>
            <Reserve />
          </Layout>
        } />

        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <Layout>
              <Admin />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/success" element={
          <Layout>
            <Success />
          </Layout>
        } />


      </Routes>

    </BrowserRouter>
  );
}

export default App;