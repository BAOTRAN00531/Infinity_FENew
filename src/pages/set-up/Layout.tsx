// @ts-nocheck
import Header from "../../components/layouts/Header";

function Layout({ children }) {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="max-w-7xl mx-auto px-5 mt-6 mb-8 flex flex-col items-center justify-center gap-10">
                {children}
            </main>
        </div>
    );
}

export default Layout;
