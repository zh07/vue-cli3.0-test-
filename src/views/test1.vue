<template>
  <div>
    <span>test1</span>
    <input type="text" />
  </div>
</template>

<script>
export default {
  destroyed() {
    console.log("已卸载test1");
  }
};
</script>

<style lang="less" scope></style>
