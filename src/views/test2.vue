<template>
  <div>
    <span>test2</span>
    <input type="text" />
  </div>
</template>

<script>
export default {
  destroyed() {
    console.log("已卸载test2");
  }
};
</script>

<style lang="less" scope></style>
