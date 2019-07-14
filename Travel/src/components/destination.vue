<template>
  <div class="destination">
    <ul class="travel_list">
      <!-- box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); -->
      <div class="shadow">
        <li
          v-for="item in list"
          :key="item._id"
          @click="$router.push('/travelDetail?id='+item._id)"
        >
          <div class="travel">
            <div class="img">
              <img :src="item.cover" alt>
            </div>
            <div class="travel_list">
              <div class="name">{{item.name}}</div>
              <div class="info">{{item.simpleInfo}}</div>
            </div>
          </div>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import request from "@/utils/request";
import { setToken, getToken } from "@/utils/user";
import { fmtDate } from "@/utils/validate";
export default {
  data() {
    return {
      list: [],
      allList: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取列表
    getList() {
      request({
        url: "/getTraveList",
        method: "get"
      })
        .then(res => {
          // console.log(res)
          if (res.data.errno == 0) {
            this.list = res.data.list;
            this.allList = res.data.list;
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss">
.destination {
  background-color: #fcfcfc;
  .travel_list {
    width: 1200px;
    margin: 0 auto;
    list-style: none;
    margin: 0 auto;
    padding: 0;
    .shadow {
      overflow: hidden;

      li {
        width: 23%;
        margin-right: 1%;
        float: left;
        margin-bottom: 20px;
        background-color: #fff;
      }
      .travel {
        .img {
          width: 260px;
          height: 180px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .travel_list {
          .name {
            font-size: 20px;
            margin: 20px 0;
            color: #ff9d00;
          }
          .info{
            width: 260px;
            color: #606266;
          }
        }
      }
    }
  }
  // .travel_list .shadow {
  //
  // }
}

// .travel_list .shadow li {
//   margin-top: 20px;
// }
// .travel_list .shadow li:hover {
//   cursor: pointer;
// }

// .travel_list .travel_list_item {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 20px 0;
//   border: 1px solid #ebeef5;
//   padding: 20px 10px;
//   background-color: #fafbfc;
//   border-radius: 5px;
// }

// .travel_list .travel_list_item > img {
//   width: 700px;
//   height: 336px;
// }

// .travel_list .travel_list_item .travel_list_item_info {
//   width: 500px;
// }

// .travel_list .travel_list_item > .travel_list_item_info h6 {
//   color: #ff9d00;
//   font-size: 30px;
//   margin: 0;
//   margin-bottom: 30px;
// }

// .travel_list .travel_list_item > .travel_list_item_info section {
//   font-size: 20px;
//   line-height: 28px;
//   padding-right: 20px;
// }
</style>
