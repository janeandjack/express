<template>
  <div>
    <h2 v-html="emailTemplateData.title" class="text-center mt-4"></h2>
    <p class="text-center pb-3">
      {{ emailTemplateData.updatedAt | moment("YYYY-MM-DD HH:mm:ss") }}
    </p>
    <div v-html="emailTemplateData.content"></div>
  </div>
</template>
<script>
export default {
  name: "AnnouncementDisplay",
  computed: {
    emailTemplateData: function() {
      return this.$store.state.emailTemplateData;
    },
  },
};
</script>
