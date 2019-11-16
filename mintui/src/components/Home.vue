<template>
  <div class="home">
    <mt-header fixed title="一起来翻译">
      <mt-button icon="more" slot="right" @click="showMore"></mt-button>
    </mt-header>
    <div class="container">
      <div class="translate1">
        <div class="selectlanguage">
          <!-- <el-radio v-model="radio" label="en">英语</el-radio>
          <el-radio v-model="radio" label="zh">中文</el-radio>-->
        </div>
        <div class="input">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入待翻译内容"
            v-model="textarea3"
          ></el-input>
        </div>
      </div>
      <div class="line">
        <el-button
          type="primary"
          class="btn1"
          @click="getMsg"
          icon="el-icon-success"
          v-if="textarea3!=''"
        ></el-button>
        <el-button
          type="primary"
          class="btn2"
          @click="clear"
          icon="el-icon-error"
          v-if="textarea3!=''"
        ></el-button>
      </div>
      <div class="translate2">
        <div class="selectlanguage">
          <!-- <el-radio v-model="radio1" label="en">英语</el-radio>
          <el-radio v-model="radio1" label="zh">中文</el-radio>-->
        </div>
        <div class="input">
          <el-input
            class="result"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="结果显示"
            v-model="textarea4"
          ></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import { MessageBox } from "mint-ui";
export default {
  name: "Home",
  data() {
    return {
      radio: "auto", //"zh"
      radio1: "auto", //"en"
      textarea3: "",
      textarea4: "",
      lastSearch: " "
    };
  },
  created() {},
  methods: {
    showMore() {
      MessageBox({
        title: "关于",
        message:
          "vue + cordova + element-ui + mint-ui    简单翻译, 使用百度翻译API能自动识别莫名其妙的语言翻译成中文."
      });
    },
    clear() {
      this.textarea3 = "";
      this.textarea4 = "";
      this.lastSearch = " ";
    },
    query(str, from, to) {
      let appid = "";
      let key = "";
      let salt = new Date().getTime();
      let url;
      // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
      let str1 = appid + str + salt + key;
      let sign = this.$MD5(str1);
      let data = {
        q: str,
        appid: appid,
        salt: String(salt),
        from: from,
        to: to,
        sign: sign
      };
      this.$jquery
        .ajax({
          url: "https://api.fanyi.baidu.com/api/trans/vip/translate",
          type: "get",
          dataType: "jsonp",
          data
        })
        .then(res => {
          this.textarea4 = res.trans_result[0].dst;
          Indicator.close();
        });
    },
    getMsg() {
      let str = this.textarea3.replace(/(^\s*)|(\s*$)/g, "");
      str = str.replace(/\s{2,}/g, " ");
      if (this.lastSearch === str) return;
      Indicator.open({
        spinnerType: "triple-bounce"
      });
      this.lastSearch = str;
      this.query(str, this.radio, this.radio1);
    }
  }
};
</script>

<style scoped>
.mint-header {
  padding: 0px 20px;
}
.el-icon-search {
  position: absolute;
  right: 10%;
}
.selectlanguage {
  height: 10%;
}
.input {
  height: 60%;
}
.el-button {
  position: absolute;
  z-index: 1999;
  background-color: #26a2ff;
  top: 50%;
  padding: 3% 3%;
  border-radius: 50%;
  background-color: #26a2ff;
  border: 0;
  font-weight: bolder;
  font-size: 1em;
}
.btn1 {
  right: 10%;
}
.btn2 {
  right: 23%;
}
.result {
  background-color: #f5f7fa;
}

.el-textarea,
.el-textarea__inner {
  height: 100%;
}
textarea {
  height: 100% !important;
}
.home {
  box-sizing: border-box;
}
.line {
  position: relative;
  width: 100%;
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
}
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.translate1,
.translate2 {
  height: 50%;
  padding: 0 3%;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.translate1 {
  margin-top: 40px;
  background-color: #f5f7fa;
}
</style>
