import React, { useState } from 'react';
import { Header } from "../components/Header";
import './signup.css';
import { Link, useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

export const SignUp = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false); // アップロード中の状態を管理するstate
  const [error, setError] = useState(null); // エラーメッセージを管理するstate

  const handleFileChange = (e, setFieldValue) => {
    const selectedFile = e.target.files[0];
    // ファイルのリサイズ
    new Compressor(selectedFile, {
      quality: 0.6, // 画質を設定します
      maxWidth: 800, // 幅を最大800pxに設定します
      success(result) {
        setFieldValue("file", result);
      },
      error(err) {
        console.error('Error occurred while resizing image:', err);
        setError('画像のリサイズ中にエラーが発生しました。');
      },
    });
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // 1. ユーザー情報を登録する
      const registerResponse = await fetch('https://railway.bookreview.techtrain.dev/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          name: values.name,
          password: values.password,
        }),
      });
  
      if (!registerResponse.ok) {
        throw new Error('Failed to register user');
      }
  
      // 2. 登録されたユーザー情報からトークンを取得する
      const responseData = await registerResponse.json();
      const token = responseData.token;

      document.cookie = `token=${token}; path=/;`;

  
      // 4. 画像をアップロードする
      const uploadUrl = 'https://railway.bookreview.techtrain.dev/uploads';
      const formData = new FormData();
      formData.append('icon', values.file);
      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!uploadResponse.ok) {
        throw new Error('Failed to upload icon');
      }
  
      console.log('Uploaded icon successfully');
  
      setSubmitting(false);
      navigate('/');
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <>
      <Header />
      <div className="signup">
        <h1>サインアップ</h1>
        <Formik
          initialValues={{
            email: '',
            name: '',
            password: '',
            file: null
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('※有効なメールアドレスを入力してください')
              .required('※メールアドレスは必須です'),
            name: Yup.string().required('※ユーザー名は必須です'),
            password: Yup.string()
              .min(6, '※パスワードは少なくとも6文字でなければなりません')
              .required('※パスワードは必須です'),
          })}
          onSubmit={handleSubmit} // フォームの送信処理をhandleSubmitに変更
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <div className="input">
                <label>Mailaddres</label>
                <Field type="email" name="email" id="email-input" />
                <ErrorMessage name="email" component="div" id="error-message" />
              </div>
              <div className="input">
                <label>Username</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div"  />
              </div>
              <div className="input">
                <label>Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <div className="input">
                <label>Usericon</label>
                <input type="file" onChange={(e) => handleFileChange(e, setFieldValue)} />
                {values.file && <p>選択されたファイル: {values.file.name}</p>}
              </div>
              <button type="submit" className="signup-button" id="submit-button" disabled={isSubmitting || uploading}>
                {uploading ? 'Uploading...' : 'Sign Up'}
              </button>
              {/* エラーメッセージを表示 */}
              {error && <div className="error-message">{error}</div>} 
              <Link className="link-login" to="/login">ログインページへ</Link>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
