import React, { Component } from "react";

export const DataContext = React.createContext();

export class DataProvider extends Component {
  state = {
    products: [
      {
        _id: "1",
        title: "Channel 4'lü Göz Farı",
        src: "https://cdn.dsmcdn.com/ty89/product/media/images/20210403/09/7e03eb73/6404986/1/1_org.jpg",
        description: "Eye Shadow Les 4 Ombres ",
        content:
          "Quasi fuga labore autem molestiae ipsam aspernatur veritatis, at omnis excepturi ex doloremque et consequatur laborum libero.",
        price: 495,
        colors: ["Gri", "Pempe", "Mor"],
        count: 1,
      },
      {
        _id: "2",
        title: "Channel Bakım Kremi",
        src: "https://cdn.dsmcdn.com/ty86/product/media/images/20210403/11/5715aba0/7911669/1/1_org.jpg",
        description: "Sublimage La Creme Texture Fine",
        content:
          "Quasi fuga labore autem molestiae ipsam aspernatur veritatis, at omnis excepturi ex doloremque et consequatur laborum libero.",
        price: 3130,
        colors: ["Gri", "Pempe", "Mor"],
        count: 1,
      },
      {
        _id: "3",
        title: "Channel Likit Ruj",
        src: "https://cdn.dsmcdn.com/ty6/product/media/images/20200710/13/4039883/76282621/0/0_org.jpg",
        description: "Rouge Allure Ink Fusion Likit Ruj - 818 ",
        content:
          "Quasi fuga labore autem molestiae ipsam aspernatur veritatis, at omnis excepturi ex doloremque et consequatur laborum libero.",
        price: 335,
        colors: ["Gri", "Pempe", "Mor"],
        count: 1,
      },
      {
        _id: "4",
        title: "Channel Parfüm",
        src: "https://cdn.dsmcdn.com/ty80/product/media/images/20210311/11/70607895/6405149/1/1_org.jpg",
        description: "Allure Sensuelle Edt 100 ml Kadın Parfüm ",
        content:
          "Quasi fuga labore autem molestiae ipsam aspernatur veritatis, at omnis excepturi ex doloremque et consequatur laborum libero.",
        price: 1050,
        colors: ["Gri", "Pempe", "Mor"],
        count: 1,
      },
      {
        _id: "5",
        title: "Channel Kaş Maskarası",
        src: "https://cdn.dsmcdn.com/ty73/product/media/images/20210403/00/8b16e65e/12613625/1/1_org.jpg",
        description: "Le Gel Sourcils 360 Blond",
        content:
          "Quasi fuga labore autem molestiae ipsam aspernatur veritatis, at omnis excepturi ex doloremque et consequatur laborum libero.",
        price: 310,
        colors: ["Gri", "Pempe", "Mor"],
        count: 1,
      },
      {
        _id: "6",
        title: "Channel Allık",
        src: "https://cdn.dsmcdn.com/ty51/product/media/images/20210112/5/51377659/7911638/1/1_org.jpg",
        description: "Joues Contraste 64 Pink Explosion",
        content:
          "Quasi fuga labore autem molestiae ipsam aspernatur veritatis, at omnis excepturi ex doloremque et consequatur laborum libero.",
        price: 410,
        colors: ["Gri", "Pempe", "Mor"],
        count: 1,
      },
    ],
    cart: [],
    total: 0,
  };

  addCart = (id) => {
    const { products, cart } = this.state;
    const check = cart.every((item) => {
      return item._id !== id;
    });

    if (check) {
      const data = products.filter((product) => {
        return product._id === id;
      });
      this.setState({ cart: [...cart, ...data] });
    }
  };

  reduction = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item._id === id) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    this.setState({ cart: cart });
  };

  increase = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item._id === id) {
        item.count += 1;
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
  };

  removeProduct = (id) => {
    if (window.confirm("Silmek İstediğinize Emin Misiniz ?")) {
      const { cart } = this.state;
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      this.setState({ cart: cart });
      this.getTotal();
    }
  };

  getTotal = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
      return prev + item.price * item.count;
    }, 0);
    this.setState({ total: res });
  };

  componentDidUpdate() {
    localStorage.setItem("dataCart", JSON.stringify(this.state.cart));
    localStorage.setItem("dataTotal", JSON.stringify(this.state.total));
  }

  componentDidMount() {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    if (dataCart !== null) {
      this.setState({ cart: dataCart });
    }

    const dataTotal = JSON.parse(localStorage.getItem("dataTotal"));
    if (dataTotal !== null) {
      this.setState({ total: dataCart });
    }
  }

  render() {
    const { products, cart, total } = this.state;
    const { reduction, increase, removeProduct, getTotal } = this;
    const { addCart } = this;
    return (
      <div>
        <DataContext.Provider
          value={{
            products,
            addCart,
            cart,
            reduction,
            increase,
            removeProduct,
            total,
            getTotal,
          }}
        >
          {this.props.children}
        </DataContext.Provider>
      </div>
    );
  }
}
