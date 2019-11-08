<template>
  <div class="mid-box">
    <div class="sel-box">
      <div
        class="hover-sel"
        @click="dropdownBox = false"
        v-show="dropdownBox"
      ></div>
      <input
        type="text"
        ref="input"
        class="sel-input"
        placeholder="请输入"
        @input="requestSearch"
        @focus="focusFunc"
        v-model="searchModel"
      />

      <div class="dropdown" v-show="dropdownBox">
        <div
          class="not-found"
          v-show="options1.length === 0 && loading === false"
        >
          无匹配数据
        </div>
        <ul class="list" v-show="options1.length > 0 && loading === false">
          <li
            :key="option.Id"
            v-for="option in options1"
            @click="selectChange(option, option.Id)"
          >
            <p :class="active === option.Id ? 'active' : false">
              {{ option.Name }}
            </p>
            <div class="icon-box">
              <Icon
                type="ios-create-outline"
                @click.stop="addEditFunc('edit', option.Name, option.Id)"
              />
              <Icon type="ios-close" @click.stop="deleteFunc(option.Id)" />
            </div>
          </li>
        </ul>

        <div class="loading" v-show="loading">加载中</div>

        <div
          class="add"
          v-show="loading === false"
          @click="addEditFunc('add', '')"
        >
          <Icon type="ios-add" />
        </div>
      </div>
    </div>

    <Modal width="300" @on-ok="cofDelete" v-model="deleteModal">
      <p>是否确认删除？</p>
    </Modal>

    <router-link :to="{ name: 'GetPictrue' }">跳转</router-link>
    <router-link :to="{ name: 'EchartsTest' }">echarts</router-link>
    <router-link :to="{ name: 'NavIndex' }">导航页</router-link>
  </div>
</template>

<script>
import request from "@/network/config";

export default {
  name: "HelloWorld",
  data() {
    return {
      firstFocus: true,
      dropdownBox: false,
      searchModel: "",
      active: false,
      loading: false,
      options1: [],
      deleteId: null,
      deleteModal: false,
      debounceExe: null,
      addEditModal: true
    };
  },
  created() {
    this.debounceExe = this.debounce();
  },
  methods: {
    focusFunc() {
      if (this.firstFocus) {
        this.remoteMethod1();
      }

      this.firstFocus = false;
      this.dropdownBox = true;
    },
    // 防抖
    debounce() {
      let timer = null;

      return func => {
        if (timer !== null) clearTimeout(timer);
        timer = setTimeout(() => {
          func();
        }, 800);
      };
    },
    // 动态搜索
    requestSearch() {
      this.debounceExe(this.remoteMethod1);
    },
    // 接口请求
    async remoteMethod1() {
      this.loading = true;

      let query = this.searchModel;
      let res = await request.get("/getuserlist", { params: { name: query } });

      if (res.status === 200) {
        this.options1 = res.data.Table;
      }

      this.loading = false;
    },
    // 选择下拉选项
    selectChange(value, id) {
      if (this.active === id) return false;

      this.active = id;
      this.searchModel = value.Name;

      this.remoteMethod1();
    },
    // 删除下拉选项
    deleteFunc(id) {
      this.deleteId = id;
      this.deleteModal = true;
    },
    // 二次确认删除
    async cofDelete() {
      let res = await request.post(`/DeleteUser?id=${this.deleteId}`);

      if (res.status === 200 && res.data === true) {
        for (let i = 0; i < this.options1.length; i++) {
          let item = this.options1[i];

          if (item.Id === this.deleteId) {
            this.options1.splice(i, 1);
          }
        }
      }
    },
    // 添加/修改
    addEditFunc(type, name, id) {
      let _this = this;
      let val = type === "add" ? "" : name;
      let phd = type === "add" ? "请输入添加内容" : "";

      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: val,
              autofocus: true,
              placeholder: phd
            },
            on: {
              input: value => {
                val = value;
              }
            }
          });
        },

        onOk() {
          if (type === "add") {
            _this.requestAdd(val);
          } else {
            _this.requestEdit(id, val);
          }
        }
      });
    },
    // 添加接口
    async requestAdd(name) {
      let res = await request.post(`AddUser?Name=${name}`);

      if (res.status === 200 && res.data === true) {
        this.remoteMethod1();
      }
    },
    // 编辑接口
    async requestEdit(id, name) {
      let res = await request.post(`UpdateUser?Id=${id}&Name=${name}`);

      if (res.status === 200 && res.data === true) {
        this.remoteMethod1();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.mid-box {
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  padding: 10px;
  background: #eeeeee;

  .sel-box {
    width: 200px;
    height: auto;
    border-radius: 4px;
    background-color: #ffffff;
    position: relative;

    .hover-sel {
      display: block;
      content: "";
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .sel-input {
      display: block;
      width: 100%;
      height: auto;
      line-height: 32px;
      padding: 0 24px 0 8px;
      font-size: 14px;
      outline: 0;
      border: none;
      color: #515a6e;
      cursor: pointer;
      border-radius: 4px;
      background-color: transparent;
      border: 1px solid #dcdee2;

      &:hover {
        border-color: #57a3f3;
      }

      &:focus {
        border-color: #57a3f3;
        outline: rgba(77, 145, 254, 0.7) auto 5px;
      }
    }
    .sel-input::-webkit-input-placeholder {
      color: #c5c8ce;
    }
    .sel-input:-moz-placeholder {
      color: #c5c8ce;
    }
    .sel-input:-ms-input-placeholder {
      color: #c5c8ce;
    }

    .dropdown {
      width: 100%;
      max-height: 200px;
      overflow-x: hidden;
      overflow-y: scroll;
      padding: 5px 0;
      border-radius: 4px;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      background-color: #ffffff;
      position: absolute;
      top: 39px;
      left: 0;
      z-index: 999;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .list {
      width: 100%;
      height: auto;

      li {
        cursor: pointer;
        list-style: none;
        padding: 7px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:hover {
          background-color: #f3f3f3;
        }

        p {
          color: #515a6e;
          line-height: 16px;
          max-width: 130px;
        }

        .icon-box {
          width: 32px;
          height: 16px;
          display: none;
          align-items: center;
          justify-content: space-between;
        }

        &:hover .icon-box {
          display: flex;
        }

        .active {
          color: #2d8cf0;
        }
      }
    }

    .not-found,
    .loading,
    .add {
      color: #c5c8ce;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
    }
  }
}
</style>
