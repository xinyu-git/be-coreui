<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="4">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                  <input type="text" class="form-control" placeholder="Username" v-model="username" maxlength="11">
                </b-input-group>
                <b-input-group class="mb-4">
                  <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                  <input type="password" class="form-control" placeholder="Password" v-model="password">
                </b-input-group>
                <div v-show="showTishi" class="tishi"> {{tishi}} </div>
                <b-row>
                  <b-col cols="6">
                    <b-button variant="primary" @click="login" class="px-4">Login</b-button>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <b-button variant="link" class="px-0">Forgot password?</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      showLogin:true,
      showTishi:false,
      tishi:'',
      username:'',
      password:''
    }
  },
  components: {},
  mounted(){
    // const token = localStorage.getItem('token');
    // if(token == null){
    //    this.$router.push('/login')
    // }
  },
  methods:{
    async login(){
      let self = this;
      //this.$router.push('/dashboard')
      var regUsername=/^1[3456789][0-9]{9}$/i;
      if(self.username =="" || self.password ==""){
        self.showTishi=true;
        self.tishi='用户名或密码不能为空'
      }else if(regUsername.test(self.username)==false){
        self.showTishi=true;
        self.tishi='用户名格式不对'
      }else{
        let userData={'mobile':self.username,'password':self.password};
        let result = await self.$http.post('/auth/be/user/password',userData);
        if(result.status=='error'){
          self.showTishi=true;
          self.tishi=result.message;
        }else if(result.status=='password_error'){
          self.showTishi=true;
          self.tishi='密码错误';
        }else{
          self.showTishi=true;
          self.tishi='登录成功';
          localStorage.setItem('token_value',result.token)
          self.$router.push('/dashboard')
        }
      }
    }  
  }
}
</script>
<style>
.tishi{text-align:center;margin-bottom: 1.5em;color:#d61d1d;}
</style>
