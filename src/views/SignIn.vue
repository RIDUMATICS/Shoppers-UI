  <template>
    <main>
      <section class="login_part">
        <div class="container">
          <div>
            <div class="login_part_text">
              <div class="login_part_text_inner">
                <h2>New to our Shop</h2>
                <p>There are advances being made in science and technology everyday, and a good example of this is the</p>
                <router-link :to="{ name: 'register' }" class="color-white">create an Account</router-link>
              </div>
            </div>
            <div class="login_part_form">
              <h3>Welcome Back! <br/>Please Sign in now.</h3>
              <form @submit.prevent="loginUser">
                <div class="form-group">
                  <input type="email" name="email" placeholder="E-mail" v-model="email"/>
                </div>
                <div class="form-group">
                  <input type="password" name="password" placeholder="Password" v-model="password"/>
                </div>
                <Button
                  :isLoading="isLoading" 
                  :onClick="loginUser" 
                  theme="blue"
                  :style="{
                    width: '100%',
                    padding: '15px',
                    'border-radius': '5px',
                    'margin-top': '30px'
                  }"
                > log in</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Button from '@/components/Button'

export default {
  setup(){
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const event = reactive({
      email: '',
      password: '',
      isLoading: false
    })


    async function loginUser(){
      try {
        event.isLoading = true;
        await store.dispatch('loginUser', { email: event.email, password: event.password })
        store.commit('popupAlert', { head: 'LogIn successful', body: 'Enjoy your shopping', status: 'success'})
        event.isLoading = false;
        if(route.query.redirect){
          router.replace(route.query.redirect)
        } else {
          router.replace('/');
        }
      } catch (error) {
        event.isLoading = false;
        if( error.status === 500 ){
          store.commit('popupAlert', { head: 'Unable to login user', body: 'Something happend, but i\'m not telling you what', status: 'error'})
        } else {
          store.commit('popupAlert', { head: 'Unable to login user', body: error.message, status: 'error'})
        }
      }
    }

    return {
      ...toRefs(event),
      Button,
      loginUser
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

  .login_part {
    padding: 100px 0;
  }

  .login_part .container > div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .login_part_text {
    background-image: linear-gradient(to bottom, rgba(36,58,111, .5), rgba(36,58,111)), url('../assets/slide-07.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    padding: 80px 70px;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    box-sizing: border-box;
  }

  .login_part_text h2 {
    font-size: 24px;
    font-weight: 700;
    line-height: 35px;
    margin-bottom: 17px;
  }

  .login_part_text p {
    line-height: 25px;
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: normal;
  }

  .login_part_text a {
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

  .login_part_form {
    padding: 80px 70px;
    display: table;
    box-sizing: border-box;
  }

  .login_part_form h3 {
    font-size: 26px;
    line-height: 36px;
    font-weight: 700;
    margin-bottom: 60px;
    margin-top: 0;
  }

  .form-group input[type="email"], .login_part_form input[type="password"] {
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


  .form-group input[type="email"]:focus, .login_part_form input[type="password"]:focus {
    border-bottom: 4px double #243a6f; 

  }

  .login_part_form a {
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

    .login_part .login_part_text, .login_part .login_part_form {
      padding: 30px;
      height: 400px;
    }

    .login_part {
      padding: 50px 0;
    }
  }

  @media (max-width: 769px) {
    .container {
      max-width: 540px;
    }

    .login_part {
      padding-bottom: 0;
    }

    .login_part .login_part_form {
      padding-left: 0;
      padding-right: 0;
    }

    .login_part .container > div {
      grid-template-columns: 1fr;
    }

  }

  /* @media only screen and (max-width: 1056px) {
    .container {
        max-width: 960px;
    }

    .login_part .login_part_text, .login_part .login_part_form {
      padding: 30px !important;
      height: 400px;
    }
  }

  @media (min-width: 768px) {
    .container {
        max-width: 720px;
    }
  } */

</style>