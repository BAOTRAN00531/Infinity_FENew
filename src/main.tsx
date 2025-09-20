// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { QuizzProvider } from "./contexts/QuizzContext";
import {UserProvider} from "@/api/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <QuizzProvider>
                <UserProvider> {/* Bọc App bằng UserProvider */}
                    <App />
                </UserProvider>
            </QuizzProvider>
        </BrowserRouter>
    </React.StrictMode>
);