import { useLocation, useNavigate } from 'react-router-dom';
import { eAppRoutes } from '../../../const/app-routes.enum';
import AuthLayout from '../components/AuthLayout';
import SignInForm from '../components/SignInForm';

const SignIn = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    return (
        <AuthLayout title="Ввойдите в свой аккаунт">
            <SignInForm onSuccess={() => navigate(`${eAppRoutes.Home}`)} email={state?.email} password={state?.password}/>
        </AuthLayout>
    );
};

export default SignIn;
