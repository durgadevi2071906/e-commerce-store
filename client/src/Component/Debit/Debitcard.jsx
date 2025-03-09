import React from 'react'
import './debit.css'

const Dabitcard = (image) => {

  return (
      <form id="card">
        <div class="card">
          <div class="row">
            <div class="input-field">
              <label for="">Card Number</label>
              <div class="box input">
                <div id="cc-number"></div>
                <img src={image} alt=""/>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="input-field1">
              <label for="">Expiration date</label>
              <div class="input" id="cc-expiry"></div>
            </div>
            <div class="input-field1">
              <label for="">Sicurity Code</label>
              <div class="input" id="cc-cvc"></div>
            </div>
          </div>
        </div>
        <div id="card-errors" class="error"></div>
      </form>
  )
}

export default Dabitcard