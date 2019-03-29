<template>
  <v-app>    
    <v-navigation-drawer width="225px" fixed clipped app class="navigation" v-model="drawer" v-if="activeUser">
      <v-list class="navigation">
        <template v-for="heading in headings">
          <v-layout row :key="heading.title" class="navigation-row">
            <v-flex xs12>
              <v-list-tile :to="heading.to">
                <v-list-tile-content class="main-heading-row">
                  <v-list-tile-title class="main-heading">
                    {{ heading.title }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>              
              <template v-for="subHeading in heading.subHeadings">
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
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app clipped-left>
      <v-toolbar-side-icon v-if="activeUser" @click.native="drawer = !drawer"><v-icon color="white">menu</v-icon></v-toolbar-side-icon>
        <v-toolbar-title class="title-text">
          <router-link to="/"><span>ScriptIntel</span></router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="success" @click.prevent="login" v-if="!activeUser"><span>Login</span></v-btn>
      <v-menu v-if="activeUser" >        
        <v-btn class="profile-btn" flat fab slot="activator"><v-icon color="white">person</v-icon></v-btn>
        <v-list class="navigation">
          <v-layout column justify-center align-center>
            <v-list-tile class="user-menu-list" v-for="item in user_menu" :to="item.to" :key="item.title">
              <v-list-tile-content>
                <v-list-tile-title class="text-xs-center">{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="user-menu-list" v-if="this.activeUser.isAdmin" to="/admin">
              <v-list-tile-content>
                <v-list-tile-title class="text-xs-center">Admin</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="user-menu-list-logout" to="/">
              <v-list-tile-content v-if="activeUser" @click.prevent="logout">
                <v-list-tile-title class="text-xs-center">Logout</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-layout>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <router-view />
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
          to: "/pharmacyanalytics",
          subHeadings: []
        },
        {
          title: "Pharmacy Comparison",
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
              title: 'Pharmacy #1',
              to: ""
            },
            {
              title: 'Pharmacy #2',
              to: ""
            },
            {
              title: 'Pharmacy #3',
              to: ""
            },
            {
              title: 'Pharmacy #4',
              to: ""
            },
            {
              title: 'Pharmacy #5',
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
.logout {
  color: red;
}
.v-toolbar {
  background-color: #1C2B32!important;
  color: white!important;
}
.profile-btn {
  width: 50px;
  height: 50px;
}
.navigation {
  color: white!important;
  background-color: #1C2B32!important;
  padding: 0px 0px;
  margin: 0px 0px;
}
.navigation-row {
  margin: 10px 10px;
  border-top: solid 1px white;
  border-bottom: solid 1px white;
}
.main-heading {
  font-size: 16px;
}
.sub-heading {
  margin: 0px 0px 0px 10px;
  font-style: italic;
}
.title-text a {
  text-decoration: none;
  color: white;
}
.container {
  padding: 5px 5px;
}
.v-list__tile {
  padding: 0px 0px;
}
.v-list__tile--active .main-heading-row {
  text-decoration: none;
  padding: 0px 15px;
  color: white;
  border-left: solid 5px white;
}
.v-list__tile--active .v-list__tile__title {
  text-decoration: none;
  color: white;
}
.user-menu-list, .user-menu-list-logout {
  width: 100px;  
}
.user-menu-list:hover, .user-menu-list-logout:hover {
  background-color: black;
}
.user-menu-list .v-list__tile--active {
  border-left: solid 5px white;
}
</style>