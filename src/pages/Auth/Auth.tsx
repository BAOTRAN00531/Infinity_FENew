import { useParams } from "react-router-dom";
import useAuthComponent from "../../hooks/useAuthComponent";
import HeaderAuthComponent from "../../components/auth-component/HeaderAuthComponent/HeaderAuthComponent";

const Auth = () => {
    const { action } = useParams();
    const main = useAuthComponent(action);

    return (
        <div className="max-w-7xl mx-auto relative">
            <HeaderAuthComponent action={action} />

            <main className="flex flex-col items-center justify-center gap-10 mt-3 mb-8">
                <div className="w-full max-w-[340px]">
                    {main}
                </div>
            </main>
        </div>
    );
};

export default Auth;
