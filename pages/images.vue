<template>
  <div>
    <ul>
      <li
        v-for="(url, index) in images"
        :key="index"
        style="height: 400px;"
      >
        <no-ssr>
          <lazy-component>
            <img
              :src="url"
              width="400"
            >
          </lazy-component>
        </no-ssr>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from '~/plugins/axios';

export default {
  async asyncData() {
    let result;
    try {
      result = await axios.get('/api/images');
    } catch (err) {
      console.log(err);
    }
    return { images: result.data };
  }
};
</script>
