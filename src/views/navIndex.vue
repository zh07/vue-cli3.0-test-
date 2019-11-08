<template>
  <div class="content" @contextmenu="stopDefault($event)">
    <div class="lf">
      <div
        :class="['lf-nav', activeId === item.id ? 'active' : '']"
        @click="navFunc(item.id)"
        v-for="item in lfNav"
        :key="item.id"
      >
        {{ item.txt }}
      </div>
    </div>
    <div class="rt">
      <div class="nav-box">
        <div
          v-for="item in navList"
          :key="item.id"
          @click="switchFunc(item.id)"
        >
          {{ item.txt }}
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lfNav: [
        {
          id: 0,
          txt: "test1",
          path: "test1"
        },
        {
          id: 1,
          txt: "test2",
          path: "test2"
        }
      ],
      navList: [],
      activeId: null
    };
  },

  created() {
    if (this.$route.name === "NavIndex") localStorage.clear();

    const gStrg = this.getLocalStorage("navList");

    if (gStrg !== null) {
      this.navList = gStrg.navList;
      this.activeId = gStrg.activeId;
    }

    this.refresh();
  },

  methods: {
    stopDefault(e) {
      console.log(e);
      e.preventDefault();
    },

    refresh() {
      window.addEventListener("beforeunload", () => {
        const obj = {};
        obj.activeId = this.activeId;
        obj.navList = this.navList;

        this.setLocalStorage("navList", obj);
      });
    },

    setLocalStorage(key, val) {
      localStorage.setItem(key, JSON.stringify(val));
    },

    getLocalStorage(key) {
      let valStr = localStorage.getItem(key);

      return JSON.parse(valStr);
    },

    navFunc(id) {
      if (this.activeId === id) return false;

      if (this.navList.length > 0) {
        if (!this.navList.some(item => item.id === id)) {
          this.navList.push(this.lfNav[id]);
        }
      } else {
        this.navList.push(this.lfNav[id]);
      }

      this.switchFunc(id);
    },

    switchFunc(id) {
      if (this.activeId === id) return false;

      let path = this.navList[id].path;

      this.activeId = id;
      this.$router.push({ path: path }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>

<style lang="less" scope>
.content {
  display: flex;

  .lf {
    width: 200px;
    height: 100vh;
    background: #000000;

    .lf-nav {
      width: 100%;
      height: auto;
      color: #ffffff;
      line-height: 40px;
      text-align: center;
      background: #0000ff;
    }
  }

  .rt {
    width: calc(100vw - 200px);
    height: 100vh;
    overflow: hidden;

    .nav-box {
      width: 100%;
      height: auto;
      display: flex;

      div {
        width: 100px;
        height: auto;
        line-height: 30px;
        text-align: center;
      }
    }
  }

  .active {
    color: #000000;
    background: #ffffff;
  }
}
</style>
