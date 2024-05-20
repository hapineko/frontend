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

type InputData = {
  id: string;
  name: string;
  price: string;
  description: string;
};

export default function Page() {
  // 読み込みデータを保持
  const [data, setData] = useState<Array<ProductData>>([]);

  useEffect(() => {
    setData(productsData);
  }, []);

  // 登録データを保持
  const [input, setInput] = useState<InputData>({
    id: "",
    name: "",
    price: "",
    description: "",
  });

  // 登録データの値を更新
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const {value, name} = event.target;
    setInput({...input, [name]:value});
  }

  // 新規登録処理、新規登録行の表示状態を保持
  const [shownNewRow, setShownNewRow] = useState(false);
  const handleShowNewRow = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setShownNewRow(true);
  };
  const handleAddCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setShownNewRow(false);
  };
  const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // バックエンドを使用した登録処理を呼ぶ
    setShownNewRow(false);
  };

  const [editingRow, setEditingRow] = useState(0);
  const handleEditRow: any = (id: number) => {
    setShownNewRow(false);
    setEditingRow(id);
    const SelectedProduct: ProductData = data.find((v) => v.id === id) as ProductData;
    setInput({
      id: id.toString(),
      name: SelectedProduct.name,
      price: SelectedProduct.price.toString(),
      description: SelectedProduct.description,
    });
  };
  const handleEditCancel: any = (id: number) => {
    setEditingRow(0);
  };
  const handleEdit: any = (id: number) => {
    setEditingRow(0);
  };
  const handleDelete: any = (id: number) => {
    setEditingRow(0);
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
              <td>
                <input type="text" name="name" placeholder="商品名" />
              </td>
              <td>
                <input type="number" name="price" placeholder="価格" />
              </td>
              <td>
                <input type="text" name="description" placeholder="説明" />
              </td>
              <td></td>
              <td>
                <button
                  onClick={(event) => {
                    handleAddCancel(event);
                  }}
                >
                  キャンセル
                </button>
                <button
                  onClick={(event) => {
                    handleAdd(event);
                  }}
                >
                  登録する
                </button>
              </td>
            </tr>
          ) : (
            ""
          )}
          {data.map((data: any) =>
            editingRow === data.id ? (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>
                  <input type="text" name="name" value={input.name} onChange={handleInput} />
                </td>
                <td>
                  <input type="number" name="price" value={input.price} onChange={handleInput} />
                </td>
                <td>
                  <input type="text" name="description" value={input.description} onChange={handleInput} />
                </td>
                <td></td>
                <td>
                  <button
                    onClick={() => {
                      handleEditCancel(data.id);
                    }}
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={() => {
                      handleEdit(data.id);
                    }}
                  >
                    更新する
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(data.id);
                    }}
                  >
                    削除する
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.price}</td>
                <td>{data.description}</td>
                <td>
                  <Link href={`/investory/products/${data.id}`}>在庫処理</Link>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleEditRow(data.id);
                    }}
                  >
                    更新・削除
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
