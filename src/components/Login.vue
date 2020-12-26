<template>
    <div class="section"></div>

    <h5 class="indigo-text center-align">Please, login into your account</h5>
    <div class="section center-align"></div>

    <div class="center-align">
      <div
        class="z-depth-1 grey lighten-4 row"
        style="
          display: inline-block;
          padding: 32px 48px 0px 48px;
          border: 1px solid #eee;
        ">
        <form class="col s12" method="post" @submit.prevent="doLogin">
          <div class="row">
            <div class="col s12"></div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input class='validate' v-model="loginData.nickName" type="text" name='nickName' id='nickName' />
              <label for='nickName'>Enter your login</label>
            </div>
          </div>

          <div class="row center-align">
            <div class="input-field col s12">
              <input
                class="validate"
                type="password"
                name="password"
                v-model="loginData.password"
                id="password"
              />
              <label for="password">Enter your password</label>
            </div>
            <label style="float: right">
              <a class="pink-text" href="#!"><b>Forgot Password?</b></a>
            </label>
          </div>

          <br />
            <div class="row center-align">
              <button
                type="submit"
                name="btn_login"
                class="col s12 btn btn-large waves-effect indigo darken-4"
              >
                Login
              </button>
            </div>
        </form>
      </div>
    </div>
    <div class="center-align"><a href="#!" class="">Create account</a></div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import Service from '@/modules/service';

const DO_LOGIN_ENDPOINT = "/login";

export default {
  setup() {
    const route = useRouter()
    
    const loginData = reactive({
        nickName: '',
        password: ''
    });

    function doLogin() {
      Service.post(DO_LOGIN_ENDPOINT, loginData, (code, data) => {
        if (code === 200) {
          localStorage.setItem('nickname', data.nickName);
          localStorage.setItem('token', data.token);

          route.push('/protected/home')
        }
      }); 
    }

    return {
        loginData,
        doLogin
    };
  },
};
</script>