<template>
  <div id="sidebar">
    <avatar></avatar>
    <div class="icons">
      <router-link to="/note" title="笔记"><i class="iconfont icon-note"></i></router-link>
      <router-link to="/notebooks" title="笔记本"><i class="iconfont icon-notebook"></i></router-link>
      <router-link to="/trash" title="回收站"><i class="iconfont icon-trash"></i></router-link>
    </div>
    <div class="logout">
      <i class="iconfont icon-logout" @click="onLoginOut"></i>
    </div>
  </div>
</template>

<script>
import avatar from '@/components/Avatar'
import {mapActions}from 'vuex'

export default {
  components: {
    avatar
  },
  methods:{
    ...mapActions(['logout']),

    onLoginOut(){
      this.logout({path:'/login'})
    }
  }
}

</script>

<style lang="less" scoped>

#sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #5055BE;
  .icons {
    margin-top: 15px;
    a {
      padding: 6px 0;
      display: block;
    }
    .router-link-active {
      background-color: #FDDB8A;
    }
  }
  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }

  .iconfont {
    color: #fff;
  }
}

</style>
