<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>
      {{ isCollapse ? "后台" : "通用后台管理系统" }}
    </h3>

    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.name">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title"> {{ item.label }} </span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">
          {{ subItem.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 48px;
    white-space: nowrap;
  }
}
</style>

<script>
// import { mapState } from "vueX";
import Cookie from "js-cookie";
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    //点击菜单
    clickMenu(item) {
      // console.log(item);
      this.$router.push({
        name: item.name,
      });
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    // ...mapState(["name"]),
    menuData() {
      // 判断当前数据,如果缓存中没有,当前store中去获取
      return JSON.parse(Cookie.get("menu")) || this.$store.state.tab.menu;
    },
  },
};
</script>