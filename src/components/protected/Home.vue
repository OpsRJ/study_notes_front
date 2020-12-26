<template>
    <h6 class="right-align"> Olá  {{ loggedUserName }}!</h6>

    <br/>

    <table class="centered">
        <thead>
          <tr>
              <th>Name</th>
              <th>Nick Name</th>
              <th>IEmail</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.fullName }}</td>
            <td>{{ user.nickName }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
    </table>
</template>

<script>
import Service from '@/modules/service'
import { onMounted, ref } from 'vue';

export default {
    setup() {
        const users = ref();

        async function getUsers() {
            Service.get('/user', (code, data) => {
              if (code == 200) {
                users.value = data;
              }
            });
        }

        onMounted(() => {
            getUsers();
        })

        return {
            users
        };
    }
}
</script>