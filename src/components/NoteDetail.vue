<template>
  <div id="note" class="detail">
    <NoteSidebar @update:notes="value => this.notes =value"></NoteSidebar>
    <div id="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
        <div v-show="curNote.id" class="show-empty">
          <div class="note-bar">
            <span>创建时间：{{ curNote.createdAtFriendly }}</span>
            <span>更新时间：{{ curNote.updatedAtFriendly }}</span>
            <span>{{ statusText }}</span>
            <span class="iconfont icon-delete" @click="onDeleteNote"></span>
            <span class="iconfont icon-fullscreen" @click="isShowPreview = !isShowPreview"></span>
          </div>
          <div class="note-title">
            <input type="text" v-model:value="curNote.title" @input="onUpdateNote" @keydown="statusText='正在输入...'"
                   placeholder="输入标题">
          </div>
          <div class="editor">
            <textarea v-show="!isShowPreview" v-model:value="curNote.content" @input="onUpdateNote"
                      @keydown="statusText='正在输入...'" placeholder="输入内容，支持markdown语法"></textarea>
            <div class="preview markdown-body" v-show="isShowPreview" v-html="previewContent">
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from '@/components/NoteSidebar'
import _ from 'lodash'
import MarkdownIt from 'markdown-it'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'


let md = new MarkdownIt()

export default {
  components: {
    NoteSidebar
  },

  data() {
    return {
      statusText: '笔记未改动',
      isShowPreview: false
    }
  },

  created() {
    this.checkLogin({path:'/login'})
  },
  computed: {
    ...mapGetters([
      'notes',
      'curNote'
    ]),

    previewContent() {
      return md.render(this.curNote.content || '')
    }
  },

  methods: {
    ...mapMutations([
      'setCurNote'
    ]),

    ...mapActions([
      'updateNote',
      'deleteNote',
      'checkLogin'
    ]),

    onUpdateNote: _.debounce(function () {
      this.updateNote({noteId: this.curNote.id, title: this.curNote.title, content: this.curNote.content})
        .then(data => {
          this.statusText = '已保存'
        }).catch(data => {
        this.statusText = '保存出错'
      })
    }, 1000),

    onDeleteNote() {
      this.deleteNote({ noteId: this.curNote.id })
        .then(data => {
          this.$router.replace({ path: '/note' })
        })
      console.log(this.curNote.id);
      console.log(this.notes)
    }

  },

  beforeRouteUpdate(to, from, next) {
    this.setCurNote({curNoteId:to.query.noteId})
    next()
  },

}

</script>

<style lang="less" scoped>
@import url(../assets/css/note-detail.less);

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>
