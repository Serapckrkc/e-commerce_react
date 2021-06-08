import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../Context";
import "../css/style.css";

export class Products extends Component {
  static contextType = DataContext;
  render() {
    const { products } = this.context;
    return (
      <div id="product">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <Link to={`/product/${product._id}`}>
              <img src={product.src} alt="" />
            </Link>
            <div className="content">
              <h3>
                <Link to={`/product/${product._id}`}> {product.title}</Link>
              </h3>
              <span>{product.price}TL</span>
              <p>{product.description}</p>
              <button onClick={() => this.context.addCart(product._id)}>
                Sepete Ekle
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Products;
