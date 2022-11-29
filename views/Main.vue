<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container class="haah">
      <common-header></common-header>
      <!-- 下面是tag标签 -->
      <common-tag></common-tag>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import CommonAside from "../src/components/CommonAside.vue";
import CommonHeader from "../src/components/CommonHeader.vue";
import CommonTag from "../src/components/CommonTag.vue";
// import home from "./home/inde/x.vue";
export default {
  name: "Main",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.haah {
  background: rgb(219, 219, 219);
  flex-direction: column;
}
.el-main {
  padding-top: 0;
}
</style>
