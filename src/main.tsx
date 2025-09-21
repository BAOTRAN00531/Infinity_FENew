// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import {QuizzProvider} from "./contexts/QuizzContext";
import {LanguageProvider} from "./contexts/LanguageContext";
import {UserProvider} from "@/api/UserContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <LanguageProvider>
                <QuizzProvider>
                    <UserProvider>
                        <App/>
                    </UserProvider>
                </QuizzProvider>
            </LanguageProvider>
        </BrowserRouter>
    </React.StrictMode>
);