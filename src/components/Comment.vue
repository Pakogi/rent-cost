<template>
  <div class="comments">
    <el-main>
      <div v-for="rent in RentData">
        <p>{{rent.link}}</p>
        <p>{{rent.price}} 元 / 月，{{rent.space_size}} 坪</p>
        <p>心得： {{rent.comment}}</p>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  data: () => ({
    rents: {}
  }),
  computed: {
    RentData () {
      return this.$store.state.Rent.data
    }
  }
}
</script>