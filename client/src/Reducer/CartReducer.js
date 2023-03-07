import axios from "axios";
const CartReducer = (state, action) => {

  if (action.type === "ADD_TO_CART") {

    let { id, price, images, name, userId,quantity,unit } = action.payload;
    let existingProduct = state.cart.find(
      (curItem) => curItem.id === id
    );
    // agar product exist krta hai
    if (existingProduct) {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === id) {
          let newAmount = curElem.Quantity + 1;
          if (newAmount >= curElem.max) {
            newAmount = curElem.max;
          }

          if (userId !== undefined) {
            axios.post(`/cart/updatecart/${userId}`, { productId: id, quantity: newAmount });
          }
          return {
            ...curElem,
            Quantity: newAmount,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    }
    else {
      let cartProduct = {
        id: id,
        name: name,
        price: price,
        Quantity: 1,
        images: images[0].imgUrl,
        max: 6,
        total_cost: price,
        Weight:quantity,
        unit:unit,
        
      };
      // console.log(userId);
      if (userId !== undefined) {
        axios.post(`/cart/addtocart/${userId}`, { productId: id, quantity: 1 })
        // .then((res)=>{console.log("cart me addd ho gaya")});
      }
      // console.log(state.cart);
      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }

  if (action.type === "SET_DECREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      let { id, userId } = action.payload;
      if (curElem.id === id) {
        // console.log("reached");
        let decAmount = curElem.Quantity - 1;

        if (decAmount <= 1) {
          decAmount = 1;
        }
        if (userId !== undefined) {
          axios.post(`/cart/updatecart/${userId}`, { productId: id, quantity: decAmount });
        }

        return {
          ...curElem,
          Quantity: decAmount,
          total_cost: decAmount * (curElem.price),
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      let { id, userId } = action.payload;
      if (curElem.id === id) {
        // console.log("reached");
        let incAmount = curElem.Quantity + 1;

        if (incAmount >= curElem.max) {
          incAmount = curElem.max;
        }
        if (userId !== undefined) {
          axios.post(`/cart/updatecart/${userId}`, { productId: id, quantity: incAmount });
        }
        return {
          ...curElem,
          Quantity: incAmount,
          total_cost: incAmount * (curElem.price)
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }
  if (action.type === "REMOVE_ITEM") {
    let { id, userId } = action.payload;
    let updatedCart = state.cart.filter(
      (curItem) => curItem.id !== id
    );
    if (userId !== undefined) {
      axios.get(`/cart/removefromcart/${userId}/${id}`);
    }
    return {
      ...state,
      cart: updatedCart,
    };
  }

  const callapi = async () => {
    await axios.post("/cart/clearcart", {})
  }

  // to empty or to clear to cart
  if (action.type === "CLEAR_CART") {
    // console.log("clearcart")
    // axios.get('/cart/clearcart/');

    return {
      ...state,
      cart: [],
    };
  }
  if (action.type === "TOTAL_ITEMS") {
    let updated = state.cart.reduce((initial, curElem) => {
      initial = initial + curElem.Quantity;
      return initial;
    }, 0);
    return { ...state, total_items: updated };
  }
  if (action.type === "TOTAL_AMOUNT") {

    let updated = state.cart.reduce((initial, curElem) => {
      initial = initial + curElem.total_cost;

      return initial;
    }, 0)
    return { ...state, total_price: updated };
  }
  // set delivery charge
  if (action.type === "SET_DISCOUNT") {
    let { disc, place } = action.payload;
    let wt=0,t,updated;
     
    state.cart.map((curElem)=>{
      console.log(curElem.unit);
      if(curElem.unit==="kg")
      wt+=(curElem.Weight*1000)*curElem.Quantity;
      else if(curElem.unit=='lit' ||curElem.unit=='ml')
      wt+=500*curElem.Quantity;
      else
      wt+=(curElem.Weight)*curElem.Quantity;
    });


    console.log(wt);
    // os->other state , oc->other city,
  
     // 25 ruppes per 500gm ,13 for 250 gm;
    if (place === "os") {
      updated = (wt/500)*25+( (wt%500)?13:0) ;
      t = 0
    }
    else if (place === "oc") {
      updated =(wt/500)*25+((wt%500)?13:0) ;
      t = 0;
    }
    else {
      updated = disc;
      t = 1;
    }
    updated=Math.floor(updated);
    console.log(updated,t);
    return { ...state, shipping_fee: updated, city: t }
  }

  if (action.type === "FINAL_AMOUNT") {
    // let discount=(state.total_price*5)/100;
    let discount = 0;
    // console.log(state.total_price);
    if (state.total_items === 0)
      state.shipping_fee = 0
    // else
    //   state.shipping_fee = 80

    let updated = state.total_price - discount + state.shipping_fee;
    if (state.total_price >= 2000 && state.city===1) {
      updated -= state.shipping_fee;
      discount += state.shipping_fee;
      // console.log(discount);
      return { ...state, final_amount: updated, Discount: discount, hurray: 1 };
    }
    else
      return { ...state, final_amount: updated, Discount: discount, hurray: 0 };
  }

  // if (action.type === "CART_TOTAL_ITEM") {
  //   console.log("hello2");
  //   let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
  //     let { Quantity } = curElem;

  //     initialVal = initialVal +Quantity;
  //     return initialVal;
  //   }, 0);

  //   return {
  //     ...state,
  //     total_item: updatedItemVal,
  //   };
  // }

  // if (action.type === "CART_TOTAL_PRICE") {
  //   let total_price = state.cart.reduce((initialVal, curElem) => {
  //     let { price, Quantity } = curElem;

  //     initialVal = initialVal + price * Quantity;
  //     // 25000 + 0 = 25000
  //     // 10199 + 25000 = 121

  //     return initialVal;
  //   }, 0);

  //   return {
  //     ...state,
  //     total_price,
  //   };
  // }

  return state;
};

export default CartReducer;
