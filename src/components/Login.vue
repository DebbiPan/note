<template>
  <div class="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"></div>
          <div class="from">
            <h3 @click="showRegister">创建账号</h3>
            <transition name="slide">
              <div :class="{show: isShowRegister}" class="register">
                <input type="text" v-model="register.username" placeholder="用户名">
                <input type="password" v-model="register.password" placeholder="密码">
                <p :class="{error: register.isError}">{{ register.notice }}</p>
                <button @click="onRegister">创建账号</button>
              </div>
            </transition>
            <h3 @click="showLogin">登录</h3>
            <transition name="slide">
              <div :class="{show: isShowLogin}" class="login">
                <input type="text" v-model="login.username" placeholder="用户名">
                <input type="password" v-model="login.password" placeholder="密码">
                <p v-bind:class="{error: login.isError}">{{ login.notice }}</p>
                <button @click="onLogin">登录</button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {
      isShowLogin: true,
      isShowRegister: false,
      login: {
        username: '',
        password: '',
        notice: '请输入用户名和密码',
        isError: false
      },
      register: {
        username: '',
        password: '',
        notice: '创建账号后请记住用户名和密码',
        isError: false
      }
    }
  },
  methods: {
    ...mapActions({
      loginUser: 'login',
      registerUser: 'register'
    }),

    showLogin() {
      this.isShowLogin = true
      this.isShowRegister = false
    },
    showRegister() {
      this.isShowLogin = false
      this.isShowRegister = true
    },
    onRegister() {
      if (!/^[a-zA-Z_0-9_\u4e00-\u9fa5]{3,15}$/.test(this.register.username)) {
        this.register.isError = true
        this.register.notice = '用户名必须是3~15个字符串，限于字母数字下划线中文'
        return
      }
      if (!/^[a-zA-Z_0-9_\u4e00-\u9fa5]{3,15}$/.test(this.register.password)) {
        this.register.isError = true
        this.register.notice = '密码长度为6~16个字符'
        return
      }

      this.registerUser({
        username: this.register.username,
        password: this.register.password
      }).then(() => {
        this.register.isError = false
        this.register.notice = ''
        this.$router.push({path: 'notebooks'})
      }).catch(data => {
        this.register.isError = true
        this.register.notice = data.msg
      })

      console.log(this.registerUser.username);
    },
    onLogin() {
      if (!/^[a-zA-Z_0-9_\u4e00-\u9fa5]{3,15}$/.test(this.login.username)) {
        this.login.isError = true
        this.login.notice = '用户名必须是3~15个字符串，限于字母数字下划线中文'
        return
      }
      if (!/^[a-zA-Z_0-9_\u4e00-\u9fa5]{3,15}$/.test(this.login.password)) {
        this.login.isError = true
        this.login.notice = '密码长度为6~16个字符'
        return
      }
      this.loginUser({
        username: this.login.username,
        password: this.login.password
      }).then(() => {
        this.login.isError = false
        this.login.notice = ''
        this.$router.push({path: 'notebooks'})
      }).catch(data => {
        this.login.isError = true
        this.login.notice = data.msg
      })
    },

  }
}
</script>


<style lang="less">
* {
  box-sizing: border-box;
}

.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(242, 247, 255, .7);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  height: 500px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;

  .main {
    flex: 1;
    background: #FDDB8A url(//cloud.hunger-valley.com/17-12-13/38476998.jpg-middle) center center no-repeat;
    background-size: contain;
  }

  .from {
    width: 270px;
    border-left: 1px solid #ccc;
    background-color: #FFFFFF;
    overflow: hidden;

    h3 {
      padding: 10px 20px;
      font-weight: normal;
      font-size: 25px;
      border-top: 1px solid #eee;
      cursor: pointer;
      text-align: center;
      margin-top: -1px;
    }

    button {
      background-color: #FDDB8A;
      height: 36px;
      lin-height: 26px;
      display: block;
      border: none;
      border-radius: 3px;
      width: 220px;
      font-size: 16px;
      margin-bottom: 10px;
    }

    .register, .login {
      padding: 0 20px;
      border-top: 1px solid #eee;
      height: 0;
      overflow: hidden;
      transition: height .4s;

      &.show {
        height: 193px;
      }

      input {
        height: 35px;
        width: 220px;
        background: #fff;
        border-radius: 3px;
        margin-bottom: 10px;
        border-color: #ccc;
      }

      input:focus {
        border: 3px solid #5055BE;
      }

      p {
        font-size: 12px;
        margin-top: 10px;
        color: #444;
        margin-bottom: 10px;
      }

      .error {
        color: red;
      }

      .login {
        border-top: 0;
      }
    }
  }
}


</style>

