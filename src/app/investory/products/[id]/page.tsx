"use client";

import { useState, useEffect } from "react";
import productsData from "../sample/dummy_products.json";
import inventoriesData from "../sample/dummy_inventories.json";

// ui
import Heading from "@/app/ui/Heading";

type ProductData = {
  id: number;
  name: string;
  price: number;
  description: string;
};

type InvestoryData = {
  id: number;
  type: string;
  date: string;
  unit: number;
  quantity: number;
  price: number;
  investory: number;
};

export default function Page({ params }: { params: { id: number } }) {
  // 読み込みデータを保持
  const [product, setProduct] = useState<ProductData>({
    id: 0,
    name: "",
    price: 0,
    description: "",
  });
  const [data, setData] = useState<Array<InvestoryData>>([]);

  useEffect(() => {
    const selectedProduct: ProductData = productsData.find(
      (v) => v.id == params.id
    ) ?? {
      id: 0,
      name: "",
      price: 0,
      description: "",
    };
    setProduct(selectedProduct);
    setData(inventoriesData);
  }, []);

  return (
    <div>
      <Heading>商品在庫管理</Heading>
      <h3>在庫処理</h3>
      <form>
        <div>
          <label>商品名：</label>
          <span>{product.name}</span>
        </div>
        <div>
          <label>数量：</label>
          <input type="text" />
        </div>
        <button>商品を仕入れる</button>
        <button>商品を卸す</button>
      </form>
      <h3>在庫履歴</h3>
      <table>
        <thead>
          <tr>
            <th>処理種別</th>
            <th>処理日時</th>
            <th>単価</th>
            <th>数量</th>
            <th>価格</th>
            <th>在庫数</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data: InvestoryData) => (
            <tr key={data.id}>
              <td>{data.type}</td>
              <td>{data.date}</td>
              <td>{data.unit}</td>
              <td>{data.quantity}</td>
              <td>{data.price}</td>
              <td>{data.investory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
