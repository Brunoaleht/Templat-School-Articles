<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="../../assets/logo.png" width="200" alt="logo" />
      <hr />
      <div class="auth-title">{{ showSignup ? "Cadastro" : "Login" }}</div>
      <input
        type="text"
        v-if="showSignup"
        v-model="user.name"
        placeholder="Nome"
      />
      <input
        type="text"
        v-model="user.email"
        name="email"
        placeholder="E-mail"
      />
      <input
        type="password"
        v-model="user.password"
        name="password"
        placeholder="Senha"
      />
      <input
        type="password"
        v-if="showSignup"
        v-model="user.confirmPassword"
        placeholder="Confirmar Senha"
      />
      <button v-if="showSignup" @click="signup">Registrar</button>
      <button v-else @click="signin">Login</button>
      <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup">Já tem Cadastro?</span>
        <span v-else>Já é Cadastrado?</span>
      </a>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "../../config/fileGlobal";
import axios from "axios";
export default {
  name: "AuthV",
  data() {
    return {
      showSignup: false,
      user: {},
    };
  },
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/signin`, this.user)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
  },
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.auth-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}
.auth-title {
  font-size: 1.3rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}
.auth-modal input {
  width: 100%;
  outline: none;
  border: 1px solid #bbb;
  margin-bottom: 15px;
  padding: 3px 8px;
}
.auth-modal button {
  align-self: center;
  background-color: #2460ae;
  color: #fff;
  padding: 5px 15px;
}
.auth-modal a {
  margin-top: 15px;
}
.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>
