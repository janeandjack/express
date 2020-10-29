<template>
  <el-card class="box-card-component" style="margin-left:8px;" >
    <mallki
      class="mb-3"
      class-name="mallki-text"
      text="网站公告/Announcement"
    />
    <div class="c">
      <ul class="card-home">
        <li
        v-for="(item, index) in allEmailTemplate"
        :key="index"
        @click="openAnnouncement(item._id)"
        class="mt-1 ml-1 mr-1"
      >
        <p>
          <span v-if="item.type==='公告'" class="mr-2">[公告] </span>
          <span v-if="item.type==='邮件'" class="mr-2">[邮件] </span>
          <span
            :class="{
              importance: item.importance == '3',
              lessimportance: item.importance == '2',
            }"
            >{{ item.title }}
          </span>
          <span class="float-right mr-3">
            {{ item.updatedAt | moment("timezone", "Asia/Shanghai", "from", "now")}}
          </span>
        </p>
      </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
import Mallki from "@/components/TextEffect";

export default {
  components: { Mallki },
  created() {
    this.$store.dispatch("getEmailTemplate", { page: 0, size: 50 });
  },
  computed: {
    allEmailTemplate: function() {
      return this.$store.state.allEmailTemplate
        // .filter((i) => (i.type === "邮件" || i.type === "公告"))
        .filter((i) => i.type === "公告")
        .sort(this.compare("importance"))
        .reverse();
    },
  },
  methods: {
    openAnnouncement(id) {
      this.$store.dispatch("getAEmailTemplate", id).then(() => {
        this.$router.push(`/dashboard/announcement/${id}`);
      });
    },
    compare(property) {
      return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.c{
  position:relative;
  float:left;
  width:100%;
  height:445px;
  overflow:hidden;
  overflow-y:auto;
}
.card-home{
  position:absolute;
	top:0;
  //animation: scroll 10s linear 1s infinite;
}
@keyframes scroll {
	100% { top: -360px; }  /* top is the number of spans (in this case 8) multiplied by span height (45px as described above)*/
}
.importance {
  color: red;
}
.lessimportance {
  color: orange;
}
.box-card-component {
  .mallki-text {
    font-size: 20px;
    font-weight: bold;
  }

  ul {
    width:100%;
    font-size: 16px;
    border-top: 1px solid #dfe6ec;
    padding-left: 0;
    li {
      height:50px;
      list-style-type: none;
      &:first-child {
        border: none;
      }
      border-top: 1px solid #dfe6ec;
      padding: 8px 0;
      p {
        padding-top:5px;
        margin-bottom: 5px;
      }
      &:hover {
        cursor: pointer;
        background-color: rgb(241, 234, 234);
        transform: scale(1.01, 1.01);
      }
      font-weight: bold;
      span {
        &:first-child {
          color: red;
          font-weight: bold;
        }
        &:last-child {
          font-weight: 400;
        }
      }
    }
  }
}
</style>
