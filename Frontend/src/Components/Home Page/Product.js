import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Product.css"
const Product = (curElem) => {
  const {_id, name, images, price } = curElem
  return (
    <NavLink className="singleProduct-origin" to={`/SingleProduct/${_id}`}>
      <div className="product-card">
        <figure>
          <img src={images[0].imgUrl} alt={name}/>
          {/* <figcaption className='caption'>{}</figcaption> */}
        </figure>
        <div className="card-data">
          <div className="card-data-flex">
            <p className='card-data--name'>{name}</p>
            <p className='card-data--price'>
              {price}
            </p>
          </div>
        </div>
      </div>
    </NavLink>
  )
}

export default Product