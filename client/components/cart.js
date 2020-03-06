import React from 'react'
import {connect} from 'react-redux'
import {getCart, getGuestCart, removeItem} from '../store/cart'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.cart
    this.componentDidMount = this.componentDidMount.bind(this)
    this.deleteItemHandler = this.deleteItemHandler.bind(this)
    this.incrementQuantityHandler = this.incrementQuantityHandler.bind(this)
    this.decrementQuantityHandler = this.deleteItemHandler.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
  }

  deleteItemHandler(event) {
    event.preventDefault()
    // When click will remove the item from the cart
    const fruitId = event.target.dataset.fruitid
    this.props.removeItem(fruitId)
    return false
  }

  incrementQuantityHandler(event) {
    event.preventDefault()
    // When click will increment the quantity of the cart by one
  }

  decrementQuantityHandler(event) {
    event.preventDefault()
    // When click will decrement the quantity of the item by one.
  }

  render() {
    let cart = this.props.cart
    if (cart.fruits) {
      return (
        <div id="cart">
          <div>
            <h2>Fruit Basket</h2>
          </div>
          <div>
            {/* Map over all fruit in the cart*/}
            {cart.fruits.map(fruit => {
              return (
                <div key={fruit.id}>
                  <h4>{fruit.name}</h4>
                  <button
                    onClick={this.deleteItemHandler}
                    data-fruitid={fruit.id}
                  >
                    Remove Item
                  </button>
                  <img
                    src={fruit.imgURL}
                    style={{maxWidth: '100px', maxHeigth: '100px'}}
                  />

                  <div>
                    <button onClick={this.incrementQuantityHandler}>+</button>
                    <div>QTY: {fruit.orderFruit.quantity}</div>
                    <button onClick={this.decrementQuantityHandler}>-</button>
                  </div>
                  <div>Price Per Item: {fruit.orderFruit.itemPrice} </div>
                  <div>Item Total: {fruit.orderFruit.itemTotal}</div>
                </div>
              )
            })}
          </div>
          <div>
            <h3>Subtotal: {cart.orderTotal}</h3>
          </div>
          <div>
            <button>PROCEED TO CHECK OUT</button>
            <Link to="/fruit">
              <button>CONTINUE SHOPPING</button>
            </Link>
          </div>
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  getGuestCart: () => dispatch(getGuestCart()),
  removeItem: fruitId => dispatch(removeItem(fruitId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
