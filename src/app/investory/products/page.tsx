"use client";

import React, { useState, useEffect } from "react";
import productsData from "./sample/dummy_products.json";
import Link from "next/link";

type ProductData = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export default function Page() {
  // 読み込みデータを保持
  const [data, setData] = useState<Array<ProductData>>([]);

  useEffect(() => {
    setData(productsData);
  }, []);

  // 新規登録処理、新規登録行の表示状態を保持
  const [shownNewRow, setShownNewRow] = useState(false);
  const handleShowNewRow = (event:React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setShownNewRow(true);
  };
  const handleAddCancel = (event:React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setShownNewRow(false);
  };
  const handleAdd = (event:React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // バックエンドを使用した登録処理を呼ぶ
    setShownNewRow(false);
  };

  return (
    <div>
      <h2 className="text-2xl p-8 bg-slate-200">商品一覧</h2>
      <button onClick={handleShowNewRow}>商品を追加する</button>
      <table>
        <thead>
          <tr>
            <th>商品ID</th>
            <th>商品名</th>
            <th>単価</th>
            <th>説明</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {shownNewRow ? (
            <tr>
              <td></td>
              <td><input type="text" placeholder="商品名" /></td>
              <td><input type="number" placeholder="価格" /></td>
              <td><input type="text" placeholder="説明" /></td>
              <td></td>
              <td>
                <button onClick={handleAddCancel}>キャンセル</button>
                <button onClick={handleAdd}>登録する</button>
              </td>
            </tr>
          ): ""}
          {data.map((data: any) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.price}</td>
              <td>{data.description}</td>
              <td>
                <Link href={`/investory/products/${data.id}`}>在庫処理</Link>
              </td>
              <td>
                <button>更新・削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
