<template>
  <div class="login-template">
    <header>手麻系统</header>
    <div class="mid-box">
      <div class="mid-bg">
        <div class="mid-banner">
          <div class="mid-img" v-for="(item, index) in imgArr" :key="index">
            <img
              :class="index === activeIndex ? 'active' : ''"
              :src="item"
              alt=""
            />
          </div>

          <button class="prev" @click="switchBanner('prev')"></button>
          <button class="next" @click="switchBanner('next')"></button>
        </div>

        <div class="login-box">
          <div class="nav-box">
            <div class="active">工号&密码</div>
          </div>

          <form class="login" @submit.prevent="jump">
            <div class="login-act">
              <i class="icon">
                <Icon type="md-person" color="#ffffff" size="14" />
              </i>
              <input type="text" placeholder="请输入您的工号" maxlength="16" />
            </div>
            <div class="login-psw">
              <i class="icon">
                <Icon type="md-lock" color="#ffffff" size="14" />
              </i>
              <input
                type="password"
                placeholder="请输入您的密码"
                maxlength="16"
              />
            </div>
            <button type="submit">登录</button>
          </form>
        </div>
      </div>
    </div>
    <footer>
      <span class="addr">
        东莞市聚聘互联网科技有限公司©2014-2015 粤ICP备14099451号
      </span>
      <span class="tel">
        企业服务电话：4007 567 360
      </span>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      imgArr: [
        require("../assets/img1.jpg"),
        require("../assets/img2.jpg"),
        require("../assets/img1.jpg"),
        require("../assets/img2.jpg")
      ],
      activeIndex: 0
    };
  },
  mounted() {
    this.autoSwitch();
  },
  methods: {
    switchBanner(type) {
      clearTimeout(this.timer);

      if (type === "prev") {
        if (this.activeIndex === 0) this.activeIndex = 4;

        this.activeIndex -= 1;
      } else {
        if (this.activeIndex === 3) this.activeIndex = -1;

        this.activeIndex += 1;
      }

      this.autoSwitch();
    },

    autoSwitch() {
      this.timer = setInterval(() => {
        if (this.activeIndex === 3) this.activeIndex = -1;

        this.activeIndex += 1;
      }, 4000);
    },

    jump() {
      this.$router.push({ path: "/helloWorld" });
    }
  }
};
</script>

<style lang="less" scope>
.login-template {
  min-width: 1200px;
  height: auto;

  header {
    width: 1200px;
    height: auto;
    margin: 0 auto;
    font-size: 26px;
    color: #00acf2;
    line-height: 86px;
  }

  .mid-box {
    width: 100%;
    height: 500px;
    overflow: hidden;
    position: relative;

    .mid-bg {
      width: 1920px;
      height: 500px;
      position: absolute;
      top: 0;
      left: calc(50% - 960px);

      .mid-banner {
        width: 100%;
        height: 500px;
        position: relative;

        .mid-img {
          position: absolute;
          top: 0;
          left: 0;

          img {
            opacity: 0;
            display: block;
            transition: opacity 2s linear;
          }

          .active {
            opacity: 1;
          }
        }

        .prev,
        .next {
          border: 0;
          width: 32px;
          height: 32px;
          outline: none;
          opacity: 0.5;

          &:hover {
            opacity: 1;
          }
        }

        .prev {
          background: url("../assets/btn.png") -110px 0 no-repeat;
          position: absolute;
          top: 234px;
          left: 290px;
        }

        .next {
          background: url("../assets/btn.png") 7px 0 no-repeat;
          position: absolute;
          top: 234px;
          right: 290px;
        }
      }

      .login-box {
        width: 348px;
        height: auto;
        position: absolute;
        top: 70px;
        right: 360px;
        z-index: 99;

        .nav-box {
          width: 100%;
          height: auto;
          display: flex;

          div {
            width: 0;
            flex-grow: 1;
            height: auto;
            cursor: pointer;
            font-size: 18px;
            color: #666666;
            line-height: 40px;
            text-align: center;
            background-color: #ffffff;
            border-bottom: 2px solid #cccccc;
          }

          .active {
            color: #00aaee !important;
            border-bottom-color: #00aaee !important;
          }
        }

        .login {
          width: 100%;
          height: 318px;
          padding-top: 5px;
          background-color: rgba(255, 255, 255, 0.6);

          .login-act,
          .login-psw {
            width: 260px;
            height: auto;
            display: flex;
            overflow: hidden;
            border-radius: 3px;
            margin: 15px auto 0;
            justify-content: space-between;
            background-color: rgba(0, 0, 0, 0.3);

            .icon {
              display: block;
              width: 30px;
              height: auto;
              line-height: 30px;
              text-align: center;
            }

            input {
              border: 0;
              width: 230px;
              height: auto;
              outline: none;
              font-size: 14px;
              color: #ffffff;
              line-height: 30px;
              background-color: transparent;
            }
            input:-moz-placeholder {
              color: #ffffff;
            }
            input:-ms-input-placeholder {
              color: #ffffff;
            }
            input::-webkit-input-placeholder {
              color: #ffffff;
            }
          }

          button {
            border: 0;
            width: 260px;
            height: auto;
            outline: none;
            display: block;
            font-size: 14px;
            margin: 60px auto 0;
            color: #ffffff;
            line-height: 36px;
            border-radius: 3px;
            background-color: #00aaee;
          }
        }
      }
    }
  }

  footer {
    width: 1200px;
    height: auto;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    span {
      font-size: 12px;
      color: #9d9d9d;
      line-height: 84px;
    }
  }
}
</style>
