import { CartItemContainer, ItemDetails, Name } from './cart-item.styles';

export const CartItem = ({ cartItem }) => {
    const { name, quantity, price, imageUrl } = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <Name>{name}</Name>
                <span>{quantity} X ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem;