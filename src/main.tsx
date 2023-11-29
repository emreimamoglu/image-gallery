import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout";
import ImageList from "./components/ImageList";
import "./assets/css/reset.css";
import { ImageContextProvider } from "./contexts/images";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ImageContextProvider>
      <Layout>
        <ImageList />
      </Layout>
    </ImageContextProvider>
  </React.StrictMode>
);
