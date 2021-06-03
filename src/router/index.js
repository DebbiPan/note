import Vue from 'vue'
import Router from 'vue-router'
import NotebookList from '@/components/NotebookList'
import NoteDetail from '@/components/NoteDetail'
import TrashDetail from '@/components/TrashDetail'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      alias:'/notebooks',
      component:NotebookList
    },
    {
      path: '/note',
      component:NoteDetail
    },
    {
      path: '/trash',
      component:TrashDetail
    },
    {
      path: '/login',
      component:Login
    }
  ]
})
