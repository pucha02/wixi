import { useHttp } from "../hooks/http.hook";

const useGetDataUser = () => {
    const { request, clearError, process, setProcess } = useHttp();

    const _urlGetUserData = 'http://localhost:5000/api/auth/get-information-for-user-account';

    const getAllUserData = async () => {
        const token = localStorage.getItem('token');
        const result = await request(_urlGetUserData, 'GET', null, { 'Authorization': `Bearer ${token}`});
        return result;
    };
    return {
        getAllUserData,
        process,
        setProcess,
        clearError,
    };
};

export default useGetDataUser;