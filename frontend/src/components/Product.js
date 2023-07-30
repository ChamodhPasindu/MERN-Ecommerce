import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Link style={{height:'375px'}} to={`/product/${product.slug}`}>
        <img style={{height:'100%'}}
          src={`data:image/jpeg;base64,${product.image}`}
          className="card-img-top"
          alt={product.name}
        />
      </Link>
      <Card.Body
        style={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link
          style={{ textDecoration: "none" }}
          to={`/product/${product.slug}`}
        >
          <Card.Title style={{ color: "#2911f4", textDecoration: "none" }}>
            {product.name.substring(0, 25)}
          </Card.Title>
        </Link>
        <Card.Text style={{ fontSize: "20px" }}>
          Rs.{product.price}.00
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="secondary" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            variant="outline-light"
            style={{ backgroundColor: "#f95607", color: "white" }}
            onClick={() => addToCartHandler(product)}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
