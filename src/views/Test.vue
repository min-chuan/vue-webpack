<template>
  <div>
    <div class="box"></div>
    <img src="@/assets/hmbb.webp" alt="" />
    <img src="@/assets/svg.svg" alt="" />
    <video controls="" autoplay="" name="media">
      <source
        src="@/assets/media.mp4"
        type="video/mp4"
      />
    </video>
    <span class="iconfont icon-home"></span>
  </div>
</template>
<script>
export default {
  name: "Test",
  data() {
    return {
      title: "app",
    };
  },
};
</script>
<style scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: red;
}
</style>
