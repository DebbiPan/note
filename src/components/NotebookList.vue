<template>
  <div class="detail" id="notebook-list">
    <header>
      <el-button href="#" class="btn" @click="onCreate"><i class="iconfont icon-plus"></i>新建笔记本</el-button>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" :to="`/note?notebookId=${notebook.id}`" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span>
              {{notebook.title}}
              <span>{{notebook.noteCounts}}</span>
              <div class="action" @click.stop.prevent="onEdit(notebook)">编辑</div>
              <div class="action" @click.stop.prevent="onDelete(notebook)">删除</div>
              <div class="date">{{notebook.createdAtFriendly}}</div>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState ,mapActions,mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  created() {
    this.checkLogin({path:'/login'})
    this.getNotebooks()
  },
  computed:{
    ...mapGetters(['notebooks'])
  },
  methods: {
    ...mapActions([
      'getNotebooks',
      'addNotebook',
      'deleteNotebook',
      'updateNotebook',
      'checkLogin'
    ]),

    onCreate() {
      this.$prompt('输入新笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({ value }) => {
        this.addNotebook({title:value})
      })
    },
    onEdit(notebook) {
      let title = ''
      this.$prompt('输入新笔记本标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({value}) => {
        title = value
        this.updateNotebook({notebookId:notebook.id, title})
      })
    },
    onDelete(notebook) {
      this.$confirm('确认要删除笔记本吗?', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteNotebook({ notebookId:notebook.id})
      })
    }
  }

}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>
