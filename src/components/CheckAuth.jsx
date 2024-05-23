import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // js-cookie パッケージをインポート

const CheckAuth = ({ children }) => {
  const navigate = useNavigate();

  // クッキーからトークンを取得
  const token = Cookies.get('token');

  // トークンがあるかどうかをチェックし、ログイン状態を判断する
  const isAuthenticated = !!token;

  // ログインされていない場合はログインページにリダイレクトする
  if (!isAuthenticated) {
    navigate('/login');
    return null; // リダイレクト後に即座に null を返して子コンポーネントがレンダリングされないようにする
  }

  // ログインされている場合は、子コンポーネントをレンダリングする
  return children;
};

export default CheckAuth;
