<template>
  <v-alert
    v-if="errorMessage"
    type="error"
    :text="errorMessage"
    :icon="false"
    class="mb-5"
  >
  </v-alert>

  <form @submit="submit">
  <v-row class="d-flex mb-3">
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">E-mail</v-label>
      <v-text-field
        v-model="email"
        variant="outlined"
        type="email"
        color="primary"
        :hide-details="!errors.email"
        :error-messages="errors.email"
      ></v-text-field>
    </v-col>
    <v-col cols="12" >
      <v-btn
        type="submit"
        color="primary"
        size="large"
        block
        flat
        :loading="isSubmitting"
        :disabled="isSubmitting"
      >Solicitar Token</v-btn>
    </v-col>
  </v-row>
  </form>
</template>

<script setup>
import {ref} from "vue";
import {useAuth} from "@/store/auth";
import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import messages from "@/utils/messages";

const emits = defineEmits(['after-request']);

const errorMessage = ref(null);
const authStore = useAuth();

const schema = yup.object({
  email: yup.string().required().email().label('E-mail')
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema
});

const submit = handleSubmit((value) => {
  errorMessage.value = null
    return authStore.forgotPassword(value.email)
      .then(() =>{
        emits('after-request');
      }).catch((e) => {
    errorMessage.value = messages[e.response.data.error]
  });
})

const { value: email } = useField('email');
</script>
