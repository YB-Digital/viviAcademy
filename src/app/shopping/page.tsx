import ShoppingProduct from '@/component/shoppingProduct'
import ShoppingTotal from '@/component/shoppingTotal'

//style
import './shopping.scss'

export default function Page() {
  return (
    <div className='shopping'>
        <div className="container">
            <p className="title font-montserrat">
            Shopping Cart
            </p>
            <div className='shoppingCart'>
              <ShoppingProduct />
              <ShoppingTotal />
            </div>
        </div>
    </div>
  )
}