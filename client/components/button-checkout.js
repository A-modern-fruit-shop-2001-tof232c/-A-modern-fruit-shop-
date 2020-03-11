import React from 'react'
import {connect} from 'react-redux'
import {checkoutCart, checkoutGuestCart} from '../store/cart'
import Checkout from './checkout'

class ButtonCheckout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      previousCartId: this.props.cartId,
      previousTotal: this.props.orderTotal,
      displayCheckOut: true
    }
    this.onCheckout = this.onCheckout.bind(this)
  }

  onCheckout(event) {
    event.preventDefault()
    if (this.props.isLoggedIn) {
      this.props.checkoutCart(this.props.cartId)
      this.setState({
        previousCartId: this.props.cartId,
        previousTotal: this.props.orderTotal,
        displayCheckOut: false
      })
    } else {
      this.props.checkoutGuestCart()
      this.setState({
        previousCartId: Math.ceil(Math.random() * 100),
        displayCheckOut: false
      })
    }
  }
  render() {
    return this.state.displayCheckOut ? (
      <div>
        <button type="button" onClick={this.onCheckout}>
          {' '}
          CHECKOUT{' '}
        </button>
      </div>
    ) : (
      <div>
        <Checkout
          order={this.state.previousCartId}
          orderTotal={this.state.previousTotal}
        />
        {/* Thank you for your order! Your Confirmation Number is{' '}
        {this.state.previousCartId} */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkoutCart: id => dispatch(checkoutCart(id)),
    checkoutGuestCart: () => dispatch(checkoutGuestCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonCheckout)
