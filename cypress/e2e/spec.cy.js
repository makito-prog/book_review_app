/* eslint-disable no-undef */
describe('入力フォームのブラウザテスト', () => {
  it('不備がある場合はエラーメッセージが表示される', () => {
    cy.visit('http://localhost:3000/signup'); // テスト対象のページにアクセス
    cy.get('#email-input').type('invalidemail'); // フォームに不備のある値を入力
    cy.get('#submit-button').click(); // フォームを送信
    cy.get('#error-message').should('be.visible'); // エラーメッセージが表示されることを確認
  });

  it('不備がなければエラーメッセージを表示しない', () => {
    cy.visit('http://localhost:3000/signup'); // テスト対象のページにアクセス
    cy.get('#email-input').type('valid@example.com'); // フォームに正しい値を入力
    cy.get('#submit-button').click(); // フォームを送信
    cy.get('#error-message').should('not.exist'); // エラーメッセージが表示されないことを確認
  });
});