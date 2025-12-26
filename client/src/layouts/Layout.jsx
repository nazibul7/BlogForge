import FooterCom from "../components/FooterCom";
import Header from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <Header />
            <div className="flex-1 min-h-screen flex flex-col justify-center">
                {children}
            </div>
            <FooterCom/>
        </div>
    )
}
