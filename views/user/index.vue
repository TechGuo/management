<template>
  <div class="manage">
    <el-dialog
      title="请输入信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 用户的表单信息 -->
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :inline="true"
        :rules="rules"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-col :span="20">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-DD"
              v-model="form.birth"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="handleAdd"> + 新增 </el-button>
      <!-- 这里是搜索区 -->
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table stripe height="90%" :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="sexLabel" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="sexLabel" label="性别">
          <template slot-scope="scope">
            <span>
              <el-button size="mini" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev,pager,next"
          :total="total"
          @current-change="handlePage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { addUser, delUser, editUser, getUser } from "../../api/data.js";

export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "亲，记得输入姓名呀！" }],
        age: [{ required: true, message: "亲，年龄不要忘记哦！" }],
        sex: [{ required: true, message: "亲，性别是一定要选的啊！" }],
        birth: [{ required: true, message: "亲，出生日期是必要的呢！" }],
        addr: [{ required: true, message: "亲，有地址才方便找你噢！" }],
      },
      tableData: [],
      modelType: 0, //这里是0， 则表示的是当前展开的是添加数据的form
      total: 0, //当前总的数据条数
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: "",
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          //后续对表单数据进行处理
          if (this.modelType === 0) {
            addUser(this.form).then(() => {
              //重新获取列表的接口
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              //重新获取列表的接口
              this.getList();
            });
          }
          console.log(this.form, "form");
        }

        //关闭弹窗
        this.dialogVisible = false;
      });
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    handleEdit(row) {
      this.modelType = 1;
      this.dialogVisible = true;
      //注意这里需要对当前行数据进行深拷贝，否则会出错
      this.form = JSON.parse(JSON.stringify(row));
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功！",
            });
            // 重新获取列表接口
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
          // console.log(e);
        });
    },

    handleAdd() {
      this.modelType = 0;
      this.dialogVisible = true;
    },

    //获取列表的数据
    getList() {
      // console.log(this.pageData, "pagedata");
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(
        ({ data }) => {
          this.tableData = data.list;
          this.total = data.count || 0;
          // console.log(this.tableData, "tabledata", this.total, "total");
        }
      );
    },
    handlePage(val) {
      this.pageData.page = val;
      this.getList();
      console.log(this.pageData.page, "val");
      getUser({ params: this.pageData });
    },
    //列表的查询
    onSubmit() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    position: relative;
    height: ~"calc(100% - 30px)"; //这个样式不能正常显示，不知道是不是需要穿刺
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>
