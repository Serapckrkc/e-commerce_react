import React, { Component } from "react";
import { DataContext } from "../Context";
import { Link } from "react-router-dom";

import "../css/style.css";

export class Cart extends Component {
  static contextType = DataContext;
  componentDidMount() {
    this.context.getTotal();
  }

  render() {
    const { cart, increase, reduction, removeProduct, total } = this.context;
    if (cart.length === 0) {
      return <h2 style={{ textAlign: "center" }}>Ürün Eklemediniz</h2>;
    } else {
      return (
        <>
          {cart.map((item) => (
            <div className="section">
              <div className="details cart" key={item._id}>
                <img src={item.src} alt="" />
                <div className="box">
                  <div className="row">
                    <h2>{item.title}</h2>
                    <span>{item.price * item.count}TL</span>
                  </div>
                  <p>{item.description}</p>
                  <p>{item.content}</p>
                  <div className="amount">
                    <button
                      className="count"
                      onClick={() => reduction(item._id)}
                    >
                      -
                    </button>
                    <span>{item.count}</span>
                    <button
                      className="count"
                      onClick={() => increase(item._id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="delete" onClick={() => removeProduct(item._id)}>
                  X
                </div>
              </div>
            </div>
          ))}
          <div className="total">
            <Link to="/payment">Ödeme</Link>
            <h3>Total: {total} TL</h3>
          </div>
        </>
      );
    }
  }
}

export default Cart;
