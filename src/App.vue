<template>
  <v-app>    
    <v-navigation-drawer width="225px" fixed clipped app class="navigation" v-model="drawer" v-if="activeUser">
      <v-list class="navigation">
        <template v-for="heading in headings">
          <v-layout row class="navigation-row">
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
    <v-toolbar app absolute clipped-left>
      <v-toolbar-side-icon v-if="activeUser" @click.native="drawer = !drawer" color="#E1E4E3"></v-toolbar-side-icon>
        <v-toolbar-title class="ml-3 mr-5">
          <router-link to="/"><span>ScriptIntel</span></router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="green" @click.prevent="login" v-if="!activeUser"><span class="mr-2">Login</span></v-btn>
      <v-menu v-if="activeUser" >        
        <v-btn class="profile-btn" fab slot="activator"><v-icon>person</v-icon></v-btn>
        <v-list class="navigation">
          <v-layout column justify-center align-center>
            <v-list-tile v-for="item in user_menu" :to="item.to" :key="item.title">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="this.activeUser.isAdmin" to="/admin">
              <v-list-tile-content>
                <v-list-tile-title>Admin</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/">
              <v-list-tile-content v-if="activeUser" color="red" @click.prevent="logout">
                <v-list-tile-title class="logout">Logout</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-layout>
        </v-list>        
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height class="content">
        <v-layout justify-center>
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
          to: "/pharmacyanalytics",
          subHeadings: []
        },
        {
          title: "Pharmacy Comparison",
          to: "/pharmacyanalytics2",
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
.v-menu__content {
  width: 125px !important;
}
.login {
  color: #4CAF50;
}
.logout {
  color: red;
}
.v-toolbar {
  background-color: #1C2B32!important;
  color: #E1E4E3!important;
}
.profile-btn {
  background-color: #E1E4E3!important;
  width: 35.99px;
  height: 35.99px;
}
.navigation {
  color: #E1E4E3!important;
  background-color: #1C2B32!important;
  padding: 0px 0px;
  margin: 0px 0px;
}
.navigation-row {
  margin: 10px 10px;
  border-top: solid 1px #E1E4E3;
  border-bottom: solid 1px #E1E4E3;
}
.content .container, .v-sheet {
  background-color: #FAFAF0!important;
}
.main-heading {
  font-size: 16px;
}
.sub-heading {
  margin: 0px 0px 0px 10px;
  font-style: italic;
}
.v-toolbar-title title, span, a {
  text-decoration: none;
  color: #E1E4E3;
}
.container {
  padding: 5px 5px;
}
.v-list__tile {
  padding: 0px 0px;
}
.v-list__tile.active {
  text-decoration: none!important;
}
</style>