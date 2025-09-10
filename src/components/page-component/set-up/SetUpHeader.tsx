import Logo from "../../layouts/Logo";
import Button from "../../reuseables/Button";

function SetUpHeader() {
    return (
        <header className="mt-3 flex items-center justify-between px-5">
            <Logo/>
        </header>
    );
}

export default SetUpHeader;
