<template>
  <v-app>    
    <v-navigation-drawer width="200px" fixed clipped app class="navigation" v-model="drawer" v-if="activeUser">
      <v-list class="navigation">
        <template v-for="heading in headings">
          <v-layout row>
            <v-flex xs12>
              <v-list-tile :to="heading.to">
                <v-list-tile-content class="main-heading-row">
                  <v-list-tile-title class="main-heading">
                    {{ heading.title }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <template v-for="subHeading in heading.subHeadings">
                <v-divider class="my-2"></v-divider>
                <v-list-tile :to="subHeading.to" :key="subHeading.title" class="sub-heading">
                  <v-list-tile-content class="sub-content">
                    <v-list-tile-title class="sub-heading">
                      {{ subHeading.title }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-flex>
          </v-layout>
        </template>
        <v-divider class="my-2"></v-divider>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app absolute clipped-left>
      <v-toolbar-side-icon v-if="activeUser" @click.native="drawer = !drawer" color="#E1E4E3"></v-toolbar-side-icon>      
      <router-link class="title" to="/">
        <v-toolbar-title class="title ml-3 mr-5">
          <span class="mx-2">[SI]</span>
          <span class="font-weight-light">ScriptIntel</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn flat color="green" @click.prevent="login" v-if="!activeUser"><span class="mr-2">Login</span></v-btn>
      <v-menu v-if="activeUser">
        <v-btn class="profile-btn" fab slot="activator"><v-icon>person</v-icon></v-btn>
        <v-list class="navigation">
          <v-list-tile v-for="item in user_menu" :to="item.to" :key="item.title">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
             </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="$store.getters.isAdmin" to="/admin">
            <v-list-tile-content>
              <v-list-tile-title>Admin</v-list-tile-title>
             </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/">
            <v-list-tile-content v-if="activeUser" color="red" @click.prevent="logout">
              <v-list-tile-title class="logout">Logout</v-list-tile-title>
             </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height class="content">
        <v-layout justify-center align-center>
          <router-view></router-view>
        </v-layout>
      </v-container>      
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      user_menu: [
        { title: "Profile", to: "/profile" },
        { title: "Settings", to: "/settings" }
      ],
      headings: [
        {
          title: "Pharmacy Analytics",
          to: "",
          subHeadings: []
        },
        {
          title: "SI Class Explorer",
          to: "",
          subHeadings: []
        },
        {
          title: "Optimization Plans",
          to: "",
          subHeadings: []
        },                
        {
          title: "Pharmacies",
          to: "",
          subHeadings: [
            {
              title: 'Pharmacy 1',
              to: ""
            },
            {
              title: 'Pharmacy 2',
              to: ""
            },
            {
              title: 'Pharmacy 3',
              to: ""
            },
            {
              title: 'Pharmacy 4',
              to: ""
            },
            {
              title: 'Pharmacy 5',
              to: ""
            }                        
          ]
        }
      ],
      activeUser: null
    }
  },
  async created () {
    await this.refreshActiveUser()
  },
  watch: {
    '$route': 'refreshActiveUser'
  },
  methods: {
    login () {
      this.$auth.loginRedirect()
    },
    async refreshActiveUser () {
      this.activeUser = await this.$auth.getUser()
    },
    async logout () {
      this.$store.replaceState({})
      await this.$auth.logout()
      await this.refreshActiveUser()
      this.$router.push('/')
    }
  }
}
</script>
<style>
.login {
  color: #4caf50;
}
.logout {
  color: red;
}
.navigation-drawer__border {
  display: none;
}
.v-toolbar {
  background-color: #1C2B32!important;
  color: #E1E4E3!important;
}
.profile-btn {
  background-color: #E1E4E3!important;
  width: 50px;
  height: 50px;
}
.navigation {
  color: #E1E4E3!important;
  background-color: #8C8F84!important;
}
.content {
  background-color: #FAFAF0!important;
}
.main-heading {
  font-size: 16px;
  color: #FAFAF0;
}
.sub-heading {
  margin: 0px 20px;  
  font-size: 15px; 
}
.sub-content {
  border-left: solid 3px #1C2B32;
}
.v-list__tile--active .v-list__tile__content {
  color: #1C2B32!important;
}
.title {
  text-decoration: none;
  color: #E1E4E3;
}
</style>