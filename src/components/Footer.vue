<template>
  <footer id="footer" class="section footer">
    <div class="container">
      <div class="footer-container">
        <div class="footer-center">
          <h3>EXTRAS</h3>
          <a href="#">Brands</a>
          <a href="#">Gift Certificates</a>
          <a href="#">Affiliate</a>
          <a href="#">Specials</a>
          <a href="#">Site Map</a>
        </div>
        <div class="footer-center">
          <h3>INFORMATION</h3>
          <a href="#">About Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Contact Us</a>
          <a href="#">Site Map</a>
        </div>
        <div class="footer-center">
          <h3>MY ACCOUNT</h3>
          <a href="#">My Account</a>
          <a href="#">Order History</a>
          <a href="#">Wish List</a>
          <a href="#">Newsletter</a>
          <a href="#">Returns</a>
        </div>
        <div class="footer-center contact">
          <h3>CONTACT US</h3>
          <div>
            <span>
              <font-awesome-icon :icon="faMapMarkerAlt" />
            </span>
            42 Dream House, Dreammy Street.
          </div>
          <div>
            <span>
              <font-awesome-icon :icon="faEnvelope" />
            </span>
            customer-service@shoppers.com
          </div>
          <div>
            <span>
              <font-awesome-icon :icon="faPhoneAlt" />
            </span>
            +234-812-268-9423
          </div>
          <div>
            <span>
              <font-awesome-icon :icon="faPaperPlane" />  
            </span>
            Dream City, USA
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMapMarkerAlt, faPaperPlane, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
export default {
  name: "Footer",

  setup(){
    return {
      FontAwesomeIcon,
      faMapMarkerAlt,
      faPaperPlane,
      faPhoneAlt,
      faEnvelope
    }
  }
}
</script>

<style>
  .footer {
    background-color: #222;
    padding: 6rem 1rem;
    line-height: 3rem;
  }

  .footer-center {
    margin-right: 1rem;
  }

  .footer-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr) auto;
    color: #fff;
  }

  .footer-center a:link,
  .footer-center a:visited {
    display: block;
    color: #f1f1f1;
    font-size: 1.4rem;
    transition: .6s;
  }

  .footer-center a:hover {
    color: #f60091;
  }

  .footer-center div {
    color: #f1f1f1;
    font-size: 1.4rem;
  }


  .footer-center h3 {
    font-size: 1.8rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }

  @media only screen and (max-width: 996px){
    .footer-container {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 2rem;
    }
  }
  
  @media only screen and (max-width: 668px){
    .footer-container {
      grid-template-columns: 1fr; 
    }
  }

</style>