<template>
  <header>
    <div class="l-content">
      <el-button
        @click="handleMenu"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- 面包屑 -->
      <div>
        <span
          class="breadCrumb"
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}
        </span>
      </div>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini" @command="handleClick">
        <span>
          <img class="user" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../images/T1.jpg"),
    };
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    selectMenu() {
      this.$store.commit("selectMenu");
    },
    handleClick(command) {
      if (command === "cancel") {
        Cookie.remove("token");
        Cookie.remove("menu");
        this.$router.push("/login");
      }
    },
  },
};
</script>
<style lang="less" scoped>
header {
  display: flex;
  height: 8%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(80, 80, 80);
}
.l-content {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  .el-button {
    margin-left: 15px;
    transform: scale(0.8);
    margin-right: 10px;
  }

  .breadCrumb {
    margin-left: 5px;
    font-weight: normal;
    font-size: 14px;
    color: #fff;
  }
  .breadCrumb::before {
    content: ">";
    margin-right: 3px;
  }
  .breadCrumb:hover {
    font-size: 16px;
    color: antiquewhite;
  }
}
.r-content {
  .user {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 15px;
  }
}
</style>