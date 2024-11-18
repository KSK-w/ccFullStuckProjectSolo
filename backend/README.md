# 環境構築

- `cd backend`で移動

- `npm i`を実行
- `createdb pokemon_data`を実行して DB を作成（もしくは`psql`でログイン後`create database pokemon_data`を実行）

- `npm run migrate`を実行してテーブルを作成
- `npm run seed`を実行してテーブルに初期データを作成

- `env.sample`を参考に`env.local`を作成
- `npm run start`を実行してバックエンドを起動
