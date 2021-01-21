<template>
    <main>
      <section class="sigin_part">
        <div class="container">
          <div>
            <div class="sigin_part_form">
              <h3>Welcome To Shoppers! <br/>Create Account.</h3>
              <form>
                <div class="form-group">
                  <input required autocomplete="on" v-model="firstName" autofocus type="text" name="firstName" placeholder="First Name"/>
                </div>
                <div class="form-group">
                  <input required autocomplete="on" v-model="lastName" type="text" name="lastName" placeholder="Last Name"/>
                </div>
                <div class="form-group">
                  <input required autocomplete="on" v-model="email" type="email" name="email" placeholder="E-mail"/>
                </div>
                <div class="form-group phone-group">
                  <input required autocomplete="on" v-model="phoneNumber" type="tel" name="phone" placeholder="Phone Number" />
                </div>
                <div class="form-group password">
                  <input required v-model="password" :type="visiblePassword ? 'text' : 'password'" name="password" placeholder="Password"/>
                  <div class="icon" @click="toggleVisiblePassword">
                    <FontAwesomeIcon v-if="visiblePassword" :icon="faEye"/>
                    <FontAwesomeIcon v-else :icon="faEyeSlash "/>
                  </div>
                </div>
                <div class="form-group password">
                  <input required type="password" v-model="verifyPassword" name="password" placeholder="Re-enter Password"/>
                  <div v-show="verifyPassword.length" class="icon" @click="toggleVisiblePassword">
                    <FontAwesomeIcon class="tickIcon" v-if="isConfirmPassword" :icon="faCheckCircle"/>
                    <FontAwesomeIcon class="wrongIcon" v-else :icon="faTimesCircle "/>
                  </div>
                </div>
                <Button
                  :isLoading="isLoading" 
                  :onClick="registerNewUser" 
                  theme="blue"
                  :style="{
                    width: '100%',
                    padding: '15px',
                    'border-radius': '5px',
                    'margin-top': '30px'
                  }"
                > register</Button>
              </form>
            </div>
            <div class="sigin_part_text">
              <div class="sigin_part_text_inner">
                <h2>Already have an account?</h2>
                <p>There are advances being made in science and technology everyday, and a good example of this is the</p>
                <router-link to="/login" class="color-white">Log in</router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
</template>

<script>
import { reactive, toRefs, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash, faCheckCircle, faTimesCircle  } from '@fortawesome/free-regular-svg-icons';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Button from '@/components/Button';

export default {
  setup(){
    const store = useStore()
    const router = useRouter();
    const data = reactive({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      verifyPassword: '',
      isConfirmPassword: false,
      visiblePassword: false,
      isLoading: false
    });

    watch(() => data.verifyPassword, (value) => {
      if(value === data.password)
        data.isConfirmPassword = true;
      else
        data.isConfirmPassword = false;
    });

    watch(() => data.password, (value) => {
      if(value === data.verifyPassword)
        data.isConfirmPassword = true;
      else
        data.isConfirmPassword = false;
    });

    function toggleVisiblePassword (){
      data.visiblePassword = !data.visiblePassword
    }

    async function registerNewUser (){
      if(!(data.firstName && data.lastName && data.email && data.phoneNumber && data.password)){
        store.commit('popupAlert', { head: 'Unable to register user', body: 'Please fill in all your details', status: 'error'})
      }
      else if(data.password !== data.verifyPassword){
        store.commit('popupAlert', { head: 'Unable to register user', body: 'password and confirm password does not match', status: 'error'})
      } else {
        try {
          data.isLoading = true;
          const newUser = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: data.password
        }
          await store.dispatch('registerUser', newUser);
          data.isLoading = false
          store.commit('popupAlert', { head: 'Registration successful', body: 'Enjoy your shopping', status: 'success'})
          router.replace('/');
        } catch (error) {
          data.isLoading = false
          if(error.status === 409){
            store.commit('popupAlert', { head: 'Unable to register user', body: error.message, status: 'error'})
            } else {
              // for 500 error
              store.commit('popupAlert', { head: 'Unable to register user', body: 'Something happend, but i\'m not telling you what', status: 'error'});
            
            }
        }
      }
    }

    return {
      ...toRefs(data),
      toggleVisiblePassword,
      registerNewUser,
      FontAwesomeIcon,
      faEye,
      Button,
      faEyeSlash,
      faCheckCircle,
      faTimesCircle
    }
  }
}
</script>

<style>
  main{
    margin-top: 25px;
    margin-bottom: 150px;
    min-height: calc(100vh - 150px);
  }

  .sigin_part {
    padding: 100px 0;
  }

  .sigin_part .container > div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .sigin_part_text {
    background-image: linear-gradient(to bottom, rgba(36,58,111, .5), rgba(36,58,111)), url('../assets/images/slide-07.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    padding: 80px 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    box-sizing: border-box;
  }

  .sigin_part_text h2 {
    font-size: 24px;
    font-weight: 700;
    line-height: 35px;
    margin-bottom: 17px;
  }

  .sigin_part_text p {
    line-height: 25px;
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: normal;
  }

  .wrongIcon {
    color: #bd362f;
  }

  .tickIcon {
    color: #3bb75e;
  }

  .sigin_part_text a {
    display: inline-block;
    border: 1px solid #fff;
    background-color: transparent;
    font-size: 14px;
    margin-top: 28px;
    padding: 18px 36px;
    border-radius: 5px;
    text-transform: uppercase;
    font-weight: 400;
    
  }

  .sigin_part_form {
    padding: 80px 70px;
    display: table;
    box-sizing: border-box;
  }

  .sigin_part_form h3 {
    font-size: 26px;
    line-height: 36px;
    font-weight: 700;
    margin-bottom: 60px;
    margin-top: 0;
  }

  .password {
    position: relative;

  }

  .password .icon {
    display: inline-flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    cursor: pointer;
    right: 0;
  }

  .form-group input[type="email"], .form-group input[type="tel"], .form-group input[type="text"], .sigin_part_form input[type="password"] {
    border: 0px solid transparent;
    border-bottom: 1px solid #ddd;
    border-radius: 0;
    background: #fff;
    outline: none;
    width: 100%;
    padding: .4rem 1rem;
    font-size: 2rem;
    line-height: 1.5;
    color: #495057;
    box-sizing: border-box;
  }


  .form-group input[type="email"]:focus, .form-group input[type="tel"]:focus, .form-group input[type="text"]:focus, .sigin_part_form input[type="password"]:focus {
    border-bottom: 4px double #243a6f; 

  }

  .sigin_part_form a {
    display: block;
    text-align: right;
    color: #fc7c7c;
    font-size: 14px;
  }

  

  .form-group{
    margin-bottom: 20px;
  }

  .auth_submit_btn {
    display: block;
    width: 100%;
    margin: 30px 0 17px;
    padding: 18px 36px;
    border-radius: 5px;
    background-color: transparent;
    border: 1px solid #243a6f;
    font-size: 15px;
    color: #243a6f;
    text-transform: uppercase;
    font-weight: 400;
    transition: .2s;
  }

  .auth_submit_btn:hover {
    background-color: #243a6f;
    color: #fff;
  }

  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    box-sizing: border-box;
  }

  @media (max-width: 1200px) {
    .container {
        max-width: 960px;
    }
  }

  @media (max-width: 991px) {
    .container {
      max-width: 720px;
    }

    .sigin_part .sigin_part_text, .sigin_part .sigin_part_form {
      padding: 30px;
      height: 400px;
    }

    .sigin_part {
      padding: 50px 0;
      width: 100%;
    }
  }

  @media (max-width: 769px) {
    .container {
      max-width: 540px;
    }

    .auth_link {
      color: #fff
    }

    .sigin_part {
      padding-bottom: 0;
    }

    .sigin_part .sigin_part_text {
      order: 1
    }

    .sigin_part .sigin_part_form {
      padding-left: 0;
      padding-right: 0;
      order: 2
    }

    .sigin_part .container > div {
      grid-template-columns: 1fr;
    }

  }

</style>