<template>
  <VContainer>
    Dashboard <br>
    <VBtn v-if="can('edit_post')">Editar post</VBtn>
    <br>
    <VBtn v-if="can('delete_user')">Deletar user</VBtn>
    <pre>{{user}}</pre>

  </VContainer>
</template>

<script setup>
import { useMe} from "@/store/me";

const { user, can } = useMe();
</script>
