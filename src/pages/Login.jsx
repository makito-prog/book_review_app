import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import './login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch('https://railway.bookreview.techtrain.dev/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          setErrors({ general: 'メールアドレスまたはパスワードが間違っています' });
        }
        throw new Error('ログインに失敗しました');
      }
  
      // ログイン成功後の処理
      const responseData = await response.json();
      const token = responseData.token;
  
      // トークンをクッキーに保存
      document.cookie = `token=${token}; path=/;`;
  
      // リダイレクト
      navigate('/home');
    } catch (error) {
      // エラーメッセージをセット
      setErrors({ general: 'メールアドレスまたはパスワードが間違っています' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className="signin">
          <h1>ログインフォーム</h1>
          <Formik
            initialValues={{
              email: '',
              password: '',
              general: '',
            }}
            validationSchema={Yup.object({
              email: Yup.string().email('※有効なメールアドレスを入力してください').required('※メールアドレスは必須です'),
              password: Yup.string().required('※パスワードは必須です'),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="input">
                  <label htmlFor="email">Mailaddress</label>
                  <Field type="email" name="email" id="email" />
                  <ErrorMessage name="email" component="div" />
                </div>
                <div className="input">
                  <label htmlFor="password">Password</label>
                  <Field type="password" name="password" id="password" />
                  <ErrorMessage name="password" component="div" />
                </div>
                <ErrorMessage name="general" component="div" className="error-message" />
                <button type="submit" disabled={isSubmitting} className="login-button" name="Login">
                  {isSubmitting ? '送信中...' : 'ログイン'}
                </button>
              </Form>
            )}
          </Formik>
          <div className="new-acount">
            アカウントをお持ちでないですか？ <Link to="/signup">新規登録</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
