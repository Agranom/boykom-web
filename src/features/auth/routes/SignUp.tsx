import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import SignUpForm from '../components/SignUpForm';
import { eAuthRoutes } from './AuthRoutes';

const SignUp = () => {
    const navigate = useNavigate();
    const successHandler = (data: any) => navigate(`../${eAuthRoutes.SignIn}`, {state: data})

    return (
        <AuthLayout title="Создайте свой аккаунт">
            <SignUpForm onSuccess={successHandler}/>
        </AuthLayout>
    );
};

export default SignUp;
