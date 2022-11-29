<template>
  <div class="tags">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleMenu(item, index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>
<style lang="less" scoped>
.tags {
  padding: 10px 20px;
  .el-tag {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations(["closeTag"]),
    changeMenu(item) {
      //点击tag跳转功能
      this.$router.push({ name: item.name });
    },
    handleMenu(item, index) {
      //删除tag标签操作
      this.closeTag(item, index);
      const length = this.tags.length;
      //删除后的跳转操作
      if (item.name !== this.$route.name) {
        return;
      }
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>
